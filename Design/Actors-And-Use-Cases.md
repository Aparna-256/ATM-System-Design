# ATM System – Actors & Use Cases

## 🎀 Overview
This document identifies the key actors interacting with the ATM system
and outlines the primary use cases supported by the system.

---

## 🎀 Actors

### 1. Customer (Cardholder)
A bank customer who uses the ATM to perform banking operations.

**Responsibilities:**
- Insert ATM card
- Authenticate using PIN
- Perform transactions such as withdrawal, deposit, and balance inquiry
- Collect cash, receipt, and card

---

### 2. ATM Machine
The physical machine that serves as the interface between the customer
and the banking system.

**Responsibilities:**
- Read ATM card
- Accept PIN input
- Display menus and messages
- Dispense cash
- Print receipts

---

### 3. Bank Server
The backend system responsible for validating and processing transactions.

**Responsibilities:**
- Authenticate card and PIN
- Maintain account balance
- Approve or reject transactions
- Log transaction history

---

## 🎀 Use Cases

### 1. Authenticate User
**Actor:** Customer, Bank Server  
**Description:**  
The customer inserts the card and enters the PIN. The bank server validates
the credentials before allowing access.

---

### 2. Balance Inquiry
**Actor:** Customer, Bank Server  
**Description:**  
The customer requests account balance information, which is fetched
from the bank server and displayed on the ATM screen.

---

### 3. Cash Withdrawal
**Actor:** Customer, ATM Machine, Bank Server  
**Description:**  
The customer withdraws cash after the bank server verifies sufficient balance.

---

### 4. Cash Deposit
**Actor:** Customer, ATM Machine, Bank Server  
**Description:**  
The customer deposits cash, and the bank server updates the account balance.

---

### 5. Mini Statement
**Actor:** Customer, Bank Server  
**Description:**  
The customer requests a recent transaction summary.

---

## 🎀 Notes
This document will be used as the foundation for:
- Class design
- Sequence diagrams
- OOPS implementation
