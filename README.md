# ATM System Design - OOPS & SOLID

A robust C++ ATM system designed with Object-Oriented Programming (OOPS) and SOLID principles. Features include PIN security, persistent audit trails, and automated unit testing.

## 🚀 Live Demo (One-Click)

You can run this project instantly in your browser without any local setup:

- **[Run on Replit](https://replit.com/github/Aparna-256/ATM-System-Design)** (Best for one-click testing)
- **[Open in GitHub Codespaces](https://github.com/Aparna-256/ATM-System-Design/codespaces)** (Best for developers)

---

## 🛠 Features

- **Security**: PIN authentication with automatic lock after 3 failed attempts (Persistent state).
- **Core Operations**: Deposit, Withdrawal, and Balance Inquiry.
- **Audit Logging**: Signed transaction logs with unique IDs and timestamps (`logs/transactions.log`).
- **Maintenance Mode**: Built-in automated unit test runner for core logic verification.
- **Concurrency**: Thread-safe account operations using a cross-platform compatibility layer.

## 📖 Instructions

### Running in the Browser (Replit)
1. Click the **[Run on Replit](https://replit.com/github/Aparna-256/ATM-System-Design)** link.
2. Click the green **Run** button at the top.
3. Choose `1` for the ATM menu or `2` for Automated Tests.
4. **Test PIN**: `1234`

### Running Locally
1. Clone the repository: `git clone https://github.com/Aparna-256/ATM-System-Design.git`
2. Run the build command:
   ```bash
   make run
   ```
   *(Or manual build: `g++ -Isrc -Itests src/main.cpp src/atm/account/Account.cpp src/atm/core/ATM.cpp src/atm/core/TransactionLogger.cpp src/atm/core/logger.cpp src/atm/user/User.cpp src/atm/user/Card.cpp tests/testRunner.cpp -std=c++17 -Wall -o atm_system`)*

## 📂 Project Structure
- `src/atm/core`: Main ATM logic and logging.
- `src/atm/account`: Concurrent-safe account management.
- `src/atm/user`: User authentication, PIN hashing, and card security.
- `tests`: Automated TestRunner module.
- `data/logs`: Persistent storage for state and transaction history.
