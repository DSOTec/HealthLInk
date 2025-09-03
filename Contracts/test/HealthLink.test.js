import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("HealthLink", function () {
  let healthLink;
  let mockStablecoin;
  let owner;
  let doctor;
  let patient;
  let otherAccount;

  beforeEach(async function () {
    [owner, doctor, patient, otherAccount] = await ethers.getSigners();

    // Deploy MockStablecoin
    const MockStablecoin = await ethers.getContractFactory("MockStablecoin");
    mockStablecoin = await MockStablecoin.deploy(
      "HealthLink USD",
      "HLUSD",
      6,
      1000000
    );

    // Deploy HealthLink
    const HealthLink = await ethers.getContractFactory("HealthLink");
    healthLink = await HealthLink.deploy(mockStablecoin.target);

    // Mint tokens to patient for testing
    await mockStablecoin.mint(patient.address, ethers.parseUnits("10000", 6));
  });

  describe("Doctor Registration", function () {
    it("Should register a doctor successfully", async function () {
      await healthLink.connect(doctor).registerDoctor("Dr. Smith", "Cardiology");
      
      const doctorInfo = await healthLink.getDoctorInfo(doctor.address);
      expect(doctorInfo.name).to.equal("Dr. Smith");
      expect(doctorInfo.specialty).to.equal("Cardiology");
      expect(doctorInfo.isRegistered).to.be.true;
    });

    it("Should emit DoctorRegistered event", async function () {
      await expect(healthLink.connect(doctor).registerDoctor("Dr. Smith", "Cardiology"))
        .to.emit(healthLink, "DoctorRegistered")
        .withArgs(doctor.address, "Dr. Smith", "Cardiology");
    });

    it("Should not allow empty name or specialty", async function () {
      await expect(healthLink.connect(doctor).registerDoctor("", "Cardiology"))
        .to.be.revertedWith("Name cannot be empty");
      
      await expect(healthLink.connect(doctor).registerDoctor("Dr. Smith", ""))
        .to.be.revertedWith("Specialty cannot be empty");
    });

    it("Should not allow duplicate registration", async function () {
      await healthLink.connect(doctor).registerDoctor("Dr. Smith", "Cardiology");
      
      await expect(healthLink.connect(doctor).registerDoctor("Dr. Smith", "Neurology"))
        .to.be.revertedWith("Doctor already registered");
    });
  });

  describe("Consultation Requests", function () {
    beforeEach(async function () {
      // Register doctor
      await healthLink.connect(doctor).registerDoctor("Dr. Smith", "Cardiology");
      
      // Approve tokens for patient
      await mockStablecoin.connect(patient).approve(healthLink.target, ethers.parseUnits("1000", 6));
    });

    it("Should create consultation request successfully", async function () {
      const amount = ethers.parseUnits("100", 6);
      
      await expect(healthLink.connect(patient).requestConsultation(doctor.address, amount))
        .to.emit(healthLink, "ConsultationRequested")
        .withArgs(1, patient.address, doctor.address, amount);
      
      const consultation = await healthLink.getConsultationDetails(1);
      expect(consultation.patient).to.equal(patient.address);
      expect(consultation.doctor).to.equal(doctor.address);
      expect(consultation.amount).to.equal(amount);
      expect(consultation.isCompleted).to.be.false;
      expect(consultation.isCancelled).to.be.false;
    });

    it("Should not allow consultation with unregistered doctor", async function () {
      const amount = ethers.parseUnits("100", 6);
      
      await expect(healthLink.connect(patient).requestConsultation(otherAccount.address, amount))
        .to.be.revertedWith("Doctor is not registered");
    });

    it("Should not allow zero amount", async function () {
      await expect(healthLink.connect(patient).requestConsultation(doctor.address, 0))
        .to.be.revertedWith("Amount must be greater than zero");
    });

    it("Should not allow patient to be same as doctor", async function () {
      const amount = ethers.parseUnits("100", 6);
      
      await expect(healthLink.connect(doctor).requestConsultation(doctor.address, amount))
        .to.be.revertedWith("Patient cannot be the same as doctor");
    });
  });

  describe("Consultation Completion", function () {
    beforeEach(async function () {
      // Register doctor and create consultation
      await healthLink.connect(doctor).registerDoctor("Dr. Smith", "Cardiology");
      await mockStablecoin.connect(patient).approve(healthLink.target, ethers.parseUnits("1000", 6));
      await healthLink.connect(patient).requestConsultation(doctor.address, ethers.parseUnits("100", 6));
    });

    it("Should complete consultation and pay doctor", async function () {
      const initialDoctorBalance = await mockStablecoin.balanceOf(doctor.address);
      const amount = ethers.parseUnits("100", 6);
      
      await expect(healthLink.connect(patient).completeConsultation(1))
        .to.emit(healthLink, "ConsultationCompleted")
        .withArgs(1, patient.address, doctor.address);
      
      const consultation = await healthLink.getConsultationDetails(1);
      expect(consultation.isCompleted).to.be.true;
      
      const finalDoctorBalance = await mockStablecoin.balanceOf(doctor.address);
      expect(finalDoctorBalance - initialDoctorBalance).to.equal(amount);
    });

    it("Should not allow non-patient to complete consultation", async function () {
      await expect(healthLink.connect(doctor).completeConsultation(1))
        .to.be.revertedWith("Only the patient can perform this action");
    });

    it("Should not allow completing already completed consultation", async function () {
      await healthLink.connect(patient).completeConsultation(1);
      
      await expect(healthLink.connect(patient).completeConsultation(1))
        .to.be.revertedWith("Consultation already completed");
    });
  });

  describe("Consultation Cancellation", function () {
    beforeEach(async function () {
      // Register doctor and create consultation
      await healthLink.connect(doctor).registerDoctor("Dr. Smith", "Cardiology");
      await mockStablecoin.connect(patient).approve(healthLink.target, ethers.parseUnits("1000", 6));
      await healthLink.connect(patient).requestConsultation(doctor.address, ethers.parseUnits("100", 6));
    });

    it("Should cancel consultation and refund patient", async function () {
      const initialPatientBalance = await mockStablecoin.balanceOf(patient.address);
      const amount = ethers.parseUnits("100", 6);
      
      await expect(healthLink.connect(patient).cancelConsultation(1))
        .to.emit(healthLink, "ConsultationCancelled")
        .withArgs(1, patient.address, doctor.address);
      
      const consultation = await healthLink.getConsultationDetails(1);
      expect(consultation.isCancelled).to.be.true;
      
      const finalPatientBalance = await mockStablecoin.balanceOf(patient.address);
      expect(finalPatientBalance - initialPatientBalance).to.equal(amount);
    });

    it("Should allow doctor to cancel consultation", async function () {
      await expect(healthLink.connect(doctor).cancelConsultation(1))
        .to.emit(healthLink, "ConsultationCancelled")
        .withArgs(1, patient.address, doctor.address);
    });

    it("Should not allow unauthorized cancellation", async function () {
      await expect(healthLink.connect(otherAccount).cancelConsultation(1))
        .to.be.revertedWith("Only patient or doctor can cancel consultation");
    });
  });

  describe("Doctor Rating System", function () {
    beforeEach(async function () {
      // Register doctor, create and complete consultation
      await healthLink.connect(doctor).registerDoctor("Dr. Smith", "Cardiology");
      await mockStablecoin.connect(patient).approve(healthLink.target, ethers.parseUnits("1000", 6));
      await healthLink.connect(patient).requestConsultation(doctor.address, ethers.parseUnits("100", 6));
      await healthLink.connect(patient).completeConsultation(1);
    });

    it("Should rate doctor successfully", async function () {
      await expect(healthLink.connect(patient).rateDoctor(1, 5))
        .to.emit(healthLink, "DoctorRated")
        .withArgs(doctor.address, 5, 500); // 5 * 100 for precision
      
      const doctorInfo = await healthLink.getDoctorInfo(doctor.address);
      expect(doctorInfo.totalRatings).to.equal(1);
      expect(doctorInfo.averageRating).to.equal(500); // 5.00 * 100
    });

    it("Should calculate average rating correctly", async function () {
      // Create and complete second consultation
      await mockStablecoin.connect(patient).approve(healthLink.target, ethers.parseUnits("1000", 6));
      await healthLink.connect(patient).requestConsultation(doctor.address, ethers.parseUnits("100", 6));
      await healthLink.connect(patient).completeConsultation(2);
      
      // Rate both consultations
      await healthLink.connect(patient).rateDoctor(1, 5);
      await healthLink.connect(patient).rateDoctor(2, 3);
      
      const doctorInfo = await healthLink.getDoctorInfo(doctor.address);
      expect(doctorInfo.totalRatings).to.equal(2);
      expect(doctorInfo.averageRating).to.equal(400); // (5+3)/2 * 100 = 4.00 * 100
    });

    it("Should not allow rating incomplete consultation", async function () {
      // Create new consultation but don't complete
      await mockStablecoin.connect(patient).approve(healthLink.target, ethers.parseUnits("1000", 6));
      await healthLink.connect(patient).requestConsultation(doctor.address, ethers.parseUnits("100", 6));
      
      await expect(healthLink.connect(patient).rateDoctor(2, 5))
        .to.be.revertedWith("Consultation must be completed before rating");
    });

    it("Should not allow rating twice", async function () {
      await healthLink.connect(patient).rateDoctor(1, 5);
      
      await expect(healthLink.connect(patient).rateDoctor(1, 4))
        .to.be.revertedWith("Consultation already rated");
    });

    it("Should not allow invalid ratings", async function () {
      await expect(healthLink.connect(patient).rateDoctor(1, 0))
        .to.be.revertedWith("Rating must be between 1 and 5");
      
      await expect(healthLink.connect(patient).rateDoctor(1, 6))
        .to.be.revertedWith("Rating must be between 1 and 5");
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await healthLink.connect(doctor).registerDoctor("Dr. Smith", "Cardiology");
      await mockStablecoin.connect(patient).approve(healthLink.target, ethers.parseUnits("1000", 6));
      await healthLink.connect(patient).requestConsultation(doctor.address, ethers.parseUnits("100", 6));
    });

    it("Should return patient consultations", async function () {
      const consultations = await healthLink.getPatientConsultations(patient.address);
      expect(consultations.length).to.equal(1);
      expect(consultations[0]).to.equal(1);
    });

    it("Should return doctor consultations", async function () {
      const consultations = await healthLink.getDoctorConsultations(doctor.address);
      expect(consultations.length).to.equal(1);
      expect(consultations[0]).to.equal(1);
    });

    it("Should return contract balance", async function () {
      const balance = await healthLink.getContractBalance();
      expect(balance).to.equal(ethers.parseUnits("100", 6));
    });
  });
});
