# 💖 ATM System Design (C++ | OOPS)

> A menu-driven **ATM System** built using **C++ and Object-Oriented Programming**, designed to simulate real-world ATM operations with clean architecture and scalable design.

🌸 Built for learning  
🌸 Designed for interviews  
🌸 Styled with soft pink girly vibes — but still on point

---

## ✨ Features

🎀 **ATM Operations**
- Balance Inquiry  
- Deposit  
- Withdrawal  
- Exit Session  

🎀 **User & Card System**
- Card abstraction
- PIN validation support (extendable)

🎀 **Clean & Modular Design**
- Separated responsibilities
- Easy to extend with new features
- Real-world inspired system flow

---

## ✨ Project Structure

src/
│── main.cpp

│
└── atm/

├── account/

│ ├── Account.h

│ └── Account.cpp

│

├── core/

│ ├── ATM.h

│ └── ATM.cpp

│

├── transaction/

│ ├── Transaction.h

│ ├── BalanceInquiry.h / .cpp

│ ├── Deposit.h / .cpp

│ └── Withdrawal.h / .cpp

│

└── user/

├── Card.h / .cpp

└── User.h / .cpp


✨ Structured to reflect real system design.

---

## ✨ How to Build & Run

### 💖 Requirements
- C++17 compatible compiler  
- MinGW / g++  
- Windows / Linux / macOS  

### 💖 Compile

g++ -Isrc src/main.cpp src/atm/account/*.cpp src/atm/core/*.cpp src/atm/transaction/*.cpp src/atm/user/*.cpp -std=c++17 -Wall -o atm_system

### 💖 Run

./atm_system.exe

## ✨ **OOPS Concepts Used**

💗 **Encapsulation – Account balance and PIN are protected within classes**  

💗 **Abstraction – Transaction interface hides implementation details**  

💗 **Inheritance – Deposit, Withdrawal, BalanceInquiry inherit from `Transaction`**  

💗 **Polymorphism – ATM executes different transactions dynamically**  

💗 **Modular Design – Each component has a clear responsibility**

## ✨ Sample Output
ATM System - Initialized

1. Balance Inquiry
2. Deposit
3. Withdraw
4. Exit
Choose option:

## ✨ Future Enhancements

🎀 Transaction history tracking

🎀 PIN retry limit and card blocking

🎀 File-based persistence

🎀 UML diagrams and documentation

## ✨ Why This Project?

🎀 **Practice real-world OOPS design principles** 

🎀 **Develop system-level thinking like real software systems** 

🎀 **Build a strong, interview-ready project for resume & LinkedIn** 

🎀 **Learn GitHub workflows hands-on (issues, branches, PRs)**  

💌 Author

Aparna Jha

❤️ Aspiring Software Engineer

❤️ Learning by building

❤️ Pink vibes, strong logic 

✨ Built with patience, persistence, and a lot of debugging ✨
