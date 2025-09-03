# HealthLink - Decentralized Telemedicine Platform

A Solidity smart contract system for decentralized telemedicine consultations with doctor registry, escrow payments, and reputation system.

## 🏥 Features

- **Doctor Registry**: Secure doctor registration with name, specialty, and wallet verification
- **Escrow Payment System**: Safe payment handling with funds locked until consultation completion
- **Reputation System**: Patient rating system (1-5 stars) for doctor reputation tracking
- **Security**: ReentrancyGuard protection and comprehensive access control modifiers
- **Event Logging**: Complete audit trail with events for all major actions

## 📋 Smart Contracts

### HealthLink.sol
Main contract handling:
- Doctor registration and verification
- Consultation request creation
- Escrow payment management
- Consultation completion/cancellation
- Doctor rating system

### MockStablecoin.sol
ERC20 token for testing:
- Hackathon-ready mock stablecoin (HLUSD)
- Faucet function for easy testing
- Standard ERC20 functionality

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
npm install
```

### Compilation
```bash
npm run compile
```

### Testing
```bash
npm test
```

### Deployment
```bash
# Deploy to local network
npx hardhat node
npm run deploy
```

## 📖 Usage Guide

### 1. Doctor Registration
```solidity
// Register as a doctor
healthLink.registerDoctor("Dr. Smith", "Cardiology");
```

### 2. Request Consultation
```solidity
// Patient requests consultation (requires token approval first)
mockStablecoin.approve(healthLinkAddress, amount);
healthLink.requestConsultation(doctorAddress, amount);
```

### 3. Complete Consultation
```solidity
// Patient marks consultation as completed (releases payment to doctor)
healthLink.completeConsultation(consultationId);
```

### 4. Cancel Consultation
```solidity
// Either patient or doctor can cancel (refunds patient)
healthLink.cancelConsultation(consultationId);
```

### 5. Rate Doctor
```solidity
// Patient rates doctor after completed consultation
healthLink.rateDoctor(consultationId, rating); // rating: 1-5
```

## 🔧 Contract Functions

### Doctor Functions
- `registerDoctor(string name, string specialty)` - Register as a doctor
- `getDoctorInfo(address doctor)` - Get doctor details and ratings

### Patient Functions
- `requestConsultation(address doctor, uint256 amount)` - Create consultation request
- `completeConsultation(uint256 consultationId)` - Complete and pay for consultation
- `cancelConsultation(uint256 consultationId)` - Cancel consultation and get refund
- `rateDoctor(uint256 consultationId, uint256 rating)` - Rate doctor (1-5)

### View Functions
- `getConsultationDetails(uint256 consultationId)` - Get consultation information
- `getPatientConsultations(address patient)` - Get patient's consultation history
- `getDoctorConsultations(address doctor)` - Get doctor's consultation history
- `getContractBalance()` - Get contract's token balance

## 📊 Events

```solidity
event DoctorRegistered(address indexed doctor, string name, string specialty);
event ConsultationRequested(uint256 indexed consultationId, address indexed patient, address indexed doctor, uint256 amount);
event ConsultationCompleted(uint256 indexed consultationId, address indexed patient, address indexed doctor);
event ConsultationCancelled(uint256 indexed consultationId, address indexed patient, address indexed doctor);
event DoctorRated(address indexed doctor, uint256 rating, uint256 newAverageRating);
```

## 🔒 Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Access Control**: Function-specific modifiers for authorization
- **Input Validation**: Comprehensive parameter validation
- **Safe Transfers**: Proper ERC20 transfer handling with return value checks

## 🧪 Testing

The project includes comprehensive tests covering:
- Doctor registration and validation
- Consultation lifecycle (request → complete/cancel)
- Payment escrow functionality
- Rating system accuracy
- Security and access control
- Edge cases and error conditions

Run tests with:
```bash
npm test
```

## 🌐 Network Compatibility

- **Ethereum Mainnet/Testnets**
- **Polygon (Matic)**
- **Any EVM-compatible network**

## 📁 Project Structure

```
contracts/
├── HealthLink.sol          # Main telemedicine contract
├── MockStablecoin.sol      # Mock ERC20 for testing
scripts/
├── deploy.ts               # Deployment script
test/
├── HealthLink.test.js      # Comprehensive test suite
```

## 🎯 Hackathon Features

- **Ready-to-deploy**: Complete setup with mock stablecoin
- **Comprehensive testing**: 22 test cases covering all functionality
- **Gas optimized**: Efficient contract design
- **Event-driven**: Perfect for frontend integration
- **Modular design**: Easy to extend and customize

## 🔮 Future Enhancements

- Multi-token payment support
- Time-locked consultations
- Dispute resolution mechanism
- Integration with decentralized identity (DID)
- IPFS integration for medical records
- Oracle integration for real-world data

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For questions and support, please open an issue in the repository.

---

**Built for hackathons, ready for production** 🚀
