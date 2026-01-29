#include "ATM.h"
#include "../transaction/BalanceInquiry.h"
#include "../transaction/Deposit.h"
#include "../transaction/Withdrawal.h"
#include <iostream>

void ATM::start(User& user) {
    int choice;

    do {
        std::cout << "\n1. Balance Inquiry\n";
        std::cout << "2. Deposit\n";
        std::cout << "3. Withdraw\n";
        std::cout << "4. Exit\n";
        std::cout << "Choose option: ";
        std::cin >> choice;

        Transaction* transaction = nullptr;

        switch (choice) {
            case 1:
                transaction = new BalanceInquiry();
                break;
            case 2:
                transaction = new Deposit();
                break;
            case 3:
                transaction = new Withdrawal();
                break;
            case 4:
                std::cout << "Thank you for using ATM!\n";
                break;
            default:
                std::cout << "Invalid option!\n";
        }

        if (transaction) {
            transaction->execute(user.getAccount());
            delete transaction;
        }

    } while (choice != 4);
}
