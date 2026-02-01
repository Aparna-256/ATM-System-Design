#include "ATM.h"
#include "TransactionLogger.h"
#include <iostream>
#include <fstream>
#include <string>

ATM::ATM() : account(150), user(1234) {}

void ATM::start() {
    int pin;
    std::cout << "Enter PIN: ";
    std::cin >> pin;

    if (!user.authenticate(pin)) {
        std::cout << "Invalid PIN or Account Locked!\n";
        return;
    }

    std::cout << "\nATM System - Initialized\n";

    int choice;
    int inactivity = 0;

    while (true) {
        if (inactivity >= 3) {
            std::cout << "Session expired due to inactivity.\n";
            break;
        }

        std::cout << "\n1. Balance Inquiry\n2. Deposit\n3. Withdraw\n4. Mini Statement\n5. Exit\nChoose option: ";
        std::cin >> choice;

        if (!std::cin) {
            std::cin.clear();
            std::cin.ignore(1000, '\n');
            inactivity++;
            continue;
        }

        inactivity = 0;

        if (choice == 1) {
            double bal = account.getBalance();
            std::cout << "Current Balance: Rs. " << bal << "\n";
            TransactionLogger::log("Balance Inquiry", bal);
        }
        else if (choice == 2) {
            double amt;
            std::cout << "Enter deposit amount: ";
            std::cin >> amt;
            account.deposit(amt);
            TransactionLogger::log("Deposit", amt);
            std::cout << "Deposit successful!\n";
        }
        else if (choice == 3) {
            double amt;
            std::cout << "Enter withdrawal amount: ";
            std::cin >> amt;
            if (account.withdraw(amt)) {
                TransactionLogger::log("Withdrawal", amt);
                std::cout << "Withdrawal successful!\n";
            } else {
                std::cout << "Insufficient balance!\n";
            }
        }
        else if (choice == 4) {
            std::ifstream file("logs/transactions.log");
            std::string line;
            std::cout << "\n--- Audit Trail / Mini Statement ---\n";
            while (getline(file, line))
                std::cout << line << "\n";
            std::cout << "------------------------------------\n";
            file.close();
        }
        else if (choice == 5) {
            std::cout << "Thank you for using ATM!\n";
            break;
        }
        else {
            std::cout << "Invalid option!\n";
            inactivity++;
        }
    }
}
