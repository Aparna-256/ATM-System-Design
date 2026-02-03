# 🎀 ATM SYSTEM DESIGN (C++ | OOPS | SOLID)

A **production-style ATM simulation** built in **C++** using **Object-Oriented Programming** and **SOLID principles**, focused on **clean architecture, security, logging, and testability**.

This project reflects **real-world system design**, making it a **strong resume, interview, and DRDO-ready project**.

---

## ✨ Features

### 🎀 Secure PIN Authentication
- PIN verification before access  
- Card locks after **3 failed attempts**

### 🎀 Core ATM Operations
- Balance Inquiry  
- Deposit  
- Withdraw  

### 🎀 Audit Trail / Mini Statement
- Persistent transaction logging  
- Timestamped entries  
- Stored in `logs/transactions.log`

### 🎀 Transaction Logger
- Unique transaction IDs  
- Date & time stamping  
- File-based persistence

### 🎀 Built-in Unit Tests
- Deposit validation  
- Negative withdrawal protection  
- PIN lock security test  
- Tests runnable directly from the executable

### 🎀 Clean & Modular Architecture
- Loosely coupled components  
- Easy to extend and maintain  
- Clear separation of concerns

---

## ✨ OOPS Concepts Used

💗 **Encapsulation**  
Sensitive data like balance and PIN are protected within classes.

💗 **Abstraction**  
Transaction interfaces hide internal implementation details.

💗 **Inheritance**  
`Deposit`, `Withdraw`, `BalanceInquiry` inherit from `Transaction`.

💗 **Polymorphism**  
ATM dynamically executes different transaction types.

💗 **Single Responsibility Principle**  
Each class handles one responsibility only.

---

## ✨ Project Structure
ATM-System-Design/

│

├── src/

│ └── atm/

│ ├── account/ # Account & balance logic

│ ├── core/ # ATM engine & transaction logger

│ ├── transaction/ # Deposit, Withdraw, Balance Inquiry

│ └── user/ # User & Card authentication

│

├── logs/

│ └── transactions.log # Persistent audit trail

│

├── tests/

│ └── testRunner.cpp # Unit test suite

│

├── src/main.cpp

├── README.md

├── LICENSE



---

## ✨ How to Build & Run (Local)

### 🔹 Compile

g++ -Isrc -Itests \
src/main.cpp \
src/atm/account/*.cpp \
src/atm/core/*.cpp \
src/atm/transaction/*.cpp \
src/atm/user/*.cpp \
tests/testRunner.cpp \
-std=c++17 -Wall -o atm_system


🔹 Run
./atm_system

✨ Run in the Browser (No Setup Required)

This project is fully automated for cloud execution. Click below to start:

🎀 **[Run on Replit (One-Click)](https://replit.com/github/Aparna-256/ATM-System-Design)**  
*(Best for quick testing)*

🎀 **[Open in GitHub Codespaces](https://github.com/Aparna-256/ATM-System-Design/codespaces)**  
*(Best for deep code exploration)*

✨ Steps

🎀 Click Create codespace on main

🎀Wait for the environment to load (1–2 minutes)

🎀 In the terminal, run: ./atm_system

🎀 Choose:

1 → Run ATM

2 → Run Tests

💖 No compiler setup
💖 No dependency issues
💖 Fully reproducible environment

✨ Running Tests

When prompted:

1. Run ATM
2. Run Tests


Select 2 to execute all unit tests.

✨ Example Output
[PASS] Negative Withdraw
[PASS] Deposit Overflow
[PASS] PIN Lock

SUMMARY: 3 passed, 0 failed

🎯 Interview-Level Explanation (IMPORTANT)

If asked “How can I run your project?”, answer:

“I’ve containerized the development environment using GitHub Codespaces. Anyone can open the repository, launch a codespace, and run the ATM system using a single make run command — no local dependencies required.”

🔥 This signals system design maturity, not just coding.

✨ Why This Project?

🎀 Practice real-world OOPS & system design
🎀 Learn secure authentication flows
🎀 Implement persistent logging & audit trails
🎀 Demonstrate testing mindset
🎀 Build a strong interview-ready project

✨ Future Enhancements

🎀 Multi-user support
🎀 Database-backed persistence
🎀 Admin mode & analytics
🎀 Encryption for PIN storage
🎀 CI pipeline for automated tests

✨ UML Class Diagram

The UML class diagram below represents the core architecture of the ATM system and demonstrates inheritance, abstraction, polymorphism, and separation of concerns.

📌 atm-uml-class-diagram

✨ Author

Aparna Jha
🎀 Aspiring Software Engineer | System Design & OOPS Enthusiast

🌸 Final Note

This project prioritizes clarity, correctness, extensibility, and security — exactly what interviewers and research organizations like DRDO look for.

Pink-powered. System-designed. Interview-ready. 🎀✨
