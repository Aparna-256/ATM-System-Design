# 🎀 ATM SYSTEM DESIGN (C++ | OOPS | SOLID)

A **production-style ATM simulation** built in **C++** using **Object-Oriented Programming** and **SOLID principles**, focused on **clean architecture, security, logging, and testability** — complete with an **Interactive Web Frontend Kiosk**!

This project reflects **real-world system design**, making it a **strong resume, interview, and DRDO-ready project**.

---

## ✨ Features

### 🎀 Interactive Web Frontend Kiosk (NEW!)
- **Physical ATM Cabinet Simulation**: High-fidelity ATM kiosk with realistic bezel, illumination header, security CCTV camera, and live status LEDs.
- **Interactive 3D Debit Card**: Card insertion/ejection animation with customizable cardholder details and EMV chip.
- **Hardware Bezel Buttons (F1 – F8)**: 8 physical side buttons flanking the LCD display, seamlessly mapped to on-screen banking operations.
- **Tactile Numeric Keypad (EPP)**: Stainless steel keypad with colored action keys (**CANCEL**, **CLEAR**, **ENTER**) + physical keyboard typing support.
- **Motorized Cash Dispenser**: Realistic shutter opening animation dispensing Indian Rupee currency notes (₹100, ₹200, ₹500, ₹2000) with cash collect interaction.
- **Thermal Receipt Printer**: Animated receipt roll-out with authentic receipt formatting, modal viewer, and printable slip.
- **Pure Web Audio Synthesizer**: Realistic tactile key clicks, card chimes, dispenser motor sounds, and error buzzers (zero external audio files).
- **Dual Aesthetic Themes**: Toggle between **🎀 Pink-Powered Edition** and **🏦 Classic Midnight Titanium Banking Edition**.
- **Live Dev & Audit Panel**: Real-time state inspector, inactivity countdown timer, quick test triggers (lock card, test overdraft), and live `logs/transactions.log` synchronization!

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
```
ATM-System-Design/
│
├── frontend/                     # Interactive Web Frontend Kiosk
│   ├── index.html                # ATM Kiosk layout & touchscreen screens
│   ├── style.css                 # Realistic hardware styling & dual themes
│   └── app.js                    # State machine, audio synthesizer, animations
│
├── server.py                     # Zero-dependency Python server & REST API
├── start_frontend.bat            # Double-click launcher for Windows
│
├── src/
│   └── atm/
│       ├── account/              # Account & balance logic
│       ├── core/                 # ATM engine & transaction logger
│       ├── transaction/          # Deposit, Withdraw, Balance Inquiry
│       └── user/                 # User & Card authentication
│
├── logs/
│   └── transactions.log          # Persistent audit trail
│
├── tests/
│   └── testRunner.cpp            # Unit test suite
│
├── src/main.cpp
├── Makefile
├── README.md
└── LICENSE
```

---

## ✨ How to Run the Interactive Frontend

### 🔹 Option 1: One-Click Windows Launcher
Double-click **`start_frontend.bat`** in the repository root. It launches the local server and opens your browser automatically!

### 🔹 Option 2: Python Server (With Live File Sync)
```bash
python server.py
# or:
make frontend
```
Visit **`http://localhost:5000`** in any browser. Transactions are synchronized with `logs/transactions.log` and `data/account.txt` in real time.

### 🔹 Option 3: Direct Browser Mode (Zero Setup)
Simply double-click or open **`frontend/index.html`** directly in Chrome, Edge, Firefox, or Safari! Works 100% offline with zero dependencies.

---

## ✨ How to Build & Run C++ CLI (Local)

### 🔹 Compile
```bash
g++ -Isrc -Itests \
src/main.cpp \
src/atm/account/*.cpp \
src/atm/core/*.cpp \
src/atm/transaction/*.cpp \
src/atm/user/*.cpp \
tests/testRunner.cpp \
-std=c++17 -Wall -o atm_system
```

### 🔹 Run
```bash
./atm_system
```

---

## ✨ Run in the Browser (No Setup Required)

This project is fully automated for cloud execution. Click below to start:

🎀 **[Run on Replit (One-Click)](https://replit.com/github/Aparna-256/ATM-System-Design)**  
*(Best for quick testing)*

🎀 **[Open in GitHub Codespaces](https://github.com/Aparna-256/ATM-System-Design/codespaces)**  
*(Best for deep code exploration)*

### ✨ Steps

🎀 Click Create codespace on main  
🎀 Wait for the environment to load (1–2 minutes)  
🎀 In the terminal, run: `./atm_system`  
🎀 Choose:  
1 → Run ATM  
2 → Run Tests  

💖 No compiler setup  
💖 No dependency issues  
💖 Fully reproducible environment  

---

## ✨ Running Tests

When prompted:
1. Run ATM
2. Run Tests

Select 2 to execute all unit tests.

### ✨ Example Output
```
[PASS] Negative Withdraw
[PASS] Deposit Overflow
[PASS] PIN Lock

SUMMARY: 3 passed, 0 failed
```

---

## 🎯 Interview-Level Explanation (IMPORTANT)

If asked “How can I run your project?”, answer:

> “I’ve designed both a modular C++ engine adhering to SOLID principles and a hyper-realistic interactive frontend kiosk. The system supports full CLI execution, containerized GitHub Codespaces, and an interactive web layout with live audit trail persistence.”

🔥 This signals system design maturity, full-stack empathy, and attention to detail.

---

## ✨ Why This Project?

🎀 Practice real-world OOPS & system design  
🎀 Learn secure authentication flows  
🎀 Implement persistent logging & audit trails  
🎀 Demonstrate testing mindset  
🎀 Build a strong interview-ready project  

---

## ✨ Author

**Aparna Jha**  
🎀 Aspiring Software Engineer | System Design & OOPS Enthusiast  

---

## 🌸 Final Note

This project prioritizes clarity, correctness, extensibility, and security — exactly what interviewers and research organizations like DRDO look for.

Pink-powered. System-designed. Interview-ready. 🎀✨
