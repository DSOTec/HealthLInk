// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HealthLink
 * @dev Decentralized telemedicine platform with doctor registry and escrow payments
 */
contract HealthLink is ReentrancyGuard, Ownable {
    // State variables
    IERC20 public stablecoin;
    uint256 public consultationCounter;
    
    // Structs
    struct Doctor {
        string name;
        string specialty;
        address walletAddress;
        bool isRegistered;
        uint256 totalRatings;
        uint256 ratingSum;
        uint256 averageRating; // Stored as rating * 100 for precision
    }
    
    struct Consultation {
        uint256 id;
        address patient;
        address doctor;
        uint256 amount;
        bool isCompleted;
        bool isCancelled;
        bool isRated;
        uint256 timestamp;
    }
    
    // Mappings
    mapping(address => Doctor) public doctors;
    mapping(uint256 => Consultation) public consultations;
    mapping(address => uint256[]) public patientConsultations;
    mapping(address => uint256[]) public doctorConsultations;
    
    // Events
    event DoctorRegistered(address indexed doctor, string name, string specialty);
    event ConsultationRequested(uint256 indexed consultationId, address indexed patient, address indexed doctor, uint256 amount);
    event ConsultationCompleted(uint256 indexed consultationId, address indexed patient, address indexed doctor);
    event ConsultationCancelled(uint256 indexed consultationId, address indexed patient, address indexed doctor);
    event DoctorRated(address indexed doctor, uint256 rating, uint256 newAverageRating);
    
    // Modifiers
    modifier onlyRegisteredDoctor() {
        require(doctors[msg.sender].isRegistered, "Only registered doctors can perform this action");
        _;
    }
    
    modifier onlyPatient(uint256 _consultationId) {
        require(consultations[_consultationId].patient == msg.sender, "Only the patient can perform this action");
        _;
    }
    
    modifier onlyDoctor(uint256 _consultationId) {
        require(consultations[_consultationId].doctor == msg.sender, "Only the assigned doctor can perform this action");
        _;
    }
    
    modifier consultationExists(uint256 _consultationId) {
        require(consultations[_consultationId].patient != address(0), "Consultation does not exist");
        _;
    }
    
    modifier consultationActive(uint256 _consultationId) {
        require(!consultations[_consultationId].isCompleted, "Consultation already completed");
        require(!consultations[_consultationId].isCancelled, "Consultation already cancelled");
        _;
    }
    
    /**
     * @dev Constructor to initialize the contract with stablecoin address
     * @param _stablecoin Address of the ERC20 stablecoin contract
     */
    constructor(address _stablecoin) {
        require(_stablecoin != address(0), "Invalid stablecoin address");
        stablecoin = IERC20(_stablecoin);
        consultationCounter = 0;
    }
    
    /**
     * @dev Register a new doctor
     * @param _name Doctor's name
     * @param _specialty Doctor's specialty
     */
    function registerDoctor(string memory _name, string memory _specialty) external {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_specialty).length > 0, "Specialty cannot be empty");
        require(!doctors[msg.sender].isRegistered, "Doctor already registered");
        
        doctors[msg.sender] = Doctor({
            name: _name,
            specialty: _specialty,
            walletAddress: msg.sender,
            isRegistered: true,
            totalRatings: 0,
            ratingSum: 0,
            averageRating: 0
        });
        
        emit DoctorRegistered(msg.sender, _name, _specialty);
    }
    
    /**
     * @dev Request a consultation with a registered doctor
     * @param _doctor Address of the doctor
     * @param _amount Amount to be escrowed for the consultation
     */
    function requestConsultation(address _doctor, uint256 _amount) external nonReentrant {
        require(_doctor != address(0), "Invalid doctor address");
        require(doctors[_doctor].isRegistered, "Doctor is not registered");
        require(_amount > 0, "Amount must be greater than zero");
        require(msg.sender != _doctor, "Patient cannot be the same as doctor");
        
        // Transfer stablecoins to contract for escrow
        require(stablecoin.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        
        consultationCounter++;
        
        consultations[consultationCounter] = Consultation({
            id: consultationCounter,
            patient: msg.sender,
            doctor: _doctor,
            amount: _amount,
            isCompleted: false,
            isCancelled: false,
            isRated: false,
            timestamp: block.timestamp
        });
        
        patientConsultations[msg.sender].push(consultationCounter);
        doctorConsultations[_doctor].push(consultationCounter);
        
        emit ConsultationRequested(consultationCounter, msg.sender, _doctor, _amount);
    }
    
    /**
     * @dev Complete a consultation and release payment to doctor
     * @param _consultationId ID of the consultation
     */
    function completeConsultation(uint256 _consultationId) 
        external 
        nonReentrant 
        consultationExists(_consultationId) 
        consultationActive(_consultationId) 
        onlyPatient(_consultationId) 
    {
        Consultation storage consultation = consultations[_consultationId];
        consultation.isCompleted = true;
        
        // Transfer payment to doctor
        require(stablecoin.transfer(consultation.doctor, consultation.amount), "Payment transfer failed");
        
        emit ConsultationCompleted(_consultationId, consultation.patient, consultation.doctor);
    }
    
    /**
     * @dev Cancel a consultation and refund patient
     * @param _consultationId ID of the consultation
     */
    function cancelConsultation(uint256 _consultationId) 
        external 
        nonReentrant 
        consultationExists(_consultationId) 
        consultationActive(_consultationId) 
    {
        Consultation storage consultation = consultations[_consultationId];
        
        // Only patient or doctor can cancel
        require(
            msg.sender == consultation.patient || msg.sender == consultation.doctor,
            "Only patient or doctor can cancel consultation"
        );
        
        consultation.isCancelled = true;
        
        // Refund patient
        require(stablecoin.transfer(consultation.patient, consultation.amount), "Refund transfer failed");
        
        emit ConsultationCancelled(_consultationId, consultation.patient, consultation.doctor);
    }
    
    /**
     * @dev Rate a doctor after completed consultation
     * @param _consultationId ID of the consultation
     * @param _rating Rating from 1 to 5
     */
    function rateDoctor(uint256 _consultationId, uint256 _rating) 
        external 
        consultationExists(_consultationId) 
        onlyPatient(_consultationId) 
    {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        
        Consultation storage consultation = consultations[_consultationId];
        require(consultation.isCompleted, "Consultation must be completed before rating");
        require(!consultation.isRated, "Consultation already rated");
        
        consultation.isRated = true;
        
        Doctor storage doctor = doctors[consultation.doctor];
        doctor.totalRatings++;
        doctor.ratingSum += _rating;
        doctor.averageRating = (doctor.ratingSum * 100) / doctor.totalRatings; // Multiply by 100 for precision
        
        emit DoctorRated(consultation.doctor, _rating, doctor.averageRating);
    }
    
    /**
     * @dev Get doctor information
     * @param _doctor Address of the doctor
     */
    function getDoctorInfo(address _doctor) 
        external 
        view 
        returns (
            string memory name,
            string memory specialty,
            bool isRegistered,
            uint256 totalRatings,
            uint256 averageRating
        ) 
    {
        Doctor memory doctor = doctors[_doctor];
        return (
            doctor.name,
            doctor.specialty,
            doctor.isRegistered,
            doctor.totalRatings,
            doctor.averageRating
        );
    }
    
    /**
     * @dev Get consultation details
     * @param _consultationId ID of the consultation
     */
    function getConsultationDetails(uint256 _consultationId) 
        external 
        view 
        consultationExists(_consultationId) 
        returns (
            address patient,
            address doctor,
            uint256 amount,
            bool isCompleted,
            bool isCancelled,
            bool isRated,
            uint256 timestamp
        ) 
    {
        Consultation memory consultation = consultations[_consultationId];
        return (
            consultation.patient,
            consultation.doctor,
            consultation.amount,
            consultation.isCompleted,
            consultation.isCancelled,
            consultation.isRated,
            consultation.timestamp
        );
    }
    
    /**
     * @dev Get patient's consultation history
     * @param _patient Address of the patient
     */
    function getPatientConsultations(address _patient) external view returns (uint256[] memory) {
        return patientConsultations[_patient];
    }
    
    /**
     * @dev Get doctor's consultation history
     * @param _doctor Address of the doctor
     */
    function getDoctorConsultations(address _doctor) external view returns (uint256[] memory) {
        return doctorConsultations[_doctor];
    }
    
    /**
     * @dev Emergency function to update stablecoin address (only owner)
     * @param _newStablecoin New stablecoin contract address
     */
    function updateStablecoin(address _newStablecoin) external onlyOwner {
        require(_newStablecoin != address(0), "Invalid stablecoin address");
        stablecoin = IERC20(_newStablecoin);
    }
    
    /**
     * @dev Get contract balance of stablecoin
     */
    function getContractBalance() external view returns (uint256) {
        return stablecoin.balanceOf(address(this));
    }
}
