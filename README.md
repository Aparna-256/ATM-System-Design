**🎀 ATM SYSTEM DESIGN (C++ | OOPS | SOLID)**

A production-style ATM simulation built in C++ using Object-Oriented Programming and SOLID principles, focused on clean architecture, security, logging, and testability.

This project is designed to reflect real-world system design, making it a strong resume + interview + DRDO-ready project.
_______________________________________________________

✨ Features

🎀 Secure PIN Authentication

PIN verification before access

Card locks after 3 failed attempts


🎀 Core ATM Operations

Balance Inquiry

Deposit

Withdraw


🎀 Audit Trail / Mini Statement


Persistent transaction logging

Timestamped entries

Stored in logs/transactions.log


🎀 Transaction Logger


Unique transaction IDs

Date & time stamping

File-based persistence


🎀 Built-in Unit Tests


Deposit validation

Negative withdrawal protection

PIN lock security test

Run tests directly from the executable


🎀 Clean & Modular Architecture


Loosely coupled components

Easy to extend and maintain

_______________________________________________________


✨ OOPS Concepts Used

💗 Encapsulation
Sensitive data like balance and PIN are protected within classes

💗 Abstraction
Transaction interfaces hide internal implementation details

💗 Inheritance
Deposit, Withdrawal, BalanceInquiry inherit from Transaction

💗 Polymorphism
ATM dynamically executes different transaction types

💗 Single Responsibility Principle
Each class handles only one responsibility

_______________________________________________________

✨ Project Structure

ATM-System-Design/
│

├── src/

│   └── atm/

│       ├── account/        # Account & balance logic

│       ├── core/           # ATM engine & transaction logger

│       ├── transaction/    # Deposit, Withdraw, Balance Inquiry

│       └── user/           # User & Card authentication

│

├── logs/

│   └── transactions.log   # Persistent audit trail

│
├── tests/

│   └── testRunner.cpp     # Unit test suite

│

├── src/main.cpp

├── README.md

_______________________________________________________

✨ How to Build & Run

🔹 Compile
g++ -Isrc -Itests src/main.cpp \
src/atm/account/*.cpp \
src/atm/core/*.cpp \
src/atm/transaction/*.cpp \
src/atm/user/*.cpp \
tests/testRunner.cpp \
-std=c++17 -Wall -o atm_system

🔹 Run
./atm_system.exe

_______________________________________________________

✨ Running Tests

When prompted:

1. Run ATM
2. Run Tests


Select 2 to execute all unit tests.

_______________________________________________________

✨ Example output:

[PASS] Negative Withdraw

[PASS] Deposit Overflow

[PASS] PIN Lock

SUMMARY: 3 passed, 0 failed

_______________________________________________________

✨ Why This Project?

🎀 Practice real-world OOPS & system design

🎀 Learn secure authentication flows

🎀 Implement persistent logging & audit trails

🎀 Demonstrate testing mindset

🎀 Build a strong interview-ready project

_______________________________________________________

✨ Future Enhancements

🎀 Multi-user support

🎀 Database-backed persistence

🎀 Admin mode & analytics

🎀 Encryption for PIN storage

🎀 CI pipeline for automated tests

_______________________________________________________

✨ Author

Aparna Jha

🎀 Aspiring Software Engineer | System Design Enthusiast

🌸 Final Note

This project prioritizes clarity, correctness, and extensibility — exactly what interviewers and research organizations like DRDO look for.

Pink-powered. System-designed. Interview-ready. 🎀✨
