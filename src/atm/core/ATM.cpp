#include "ATM.h"
#include <iostream>
#include "../account/Account.h"
#include "../transaction/Deposit.h"
#include "../transaction/Withdrawal.h"
#include "../transaction/BalanceInquiry.h"
#include "ATMException.h"

void ATM::start(User& user) {
    int pin;
    bool authenticated = false;

    while (!authenticated && !user.isLocked()) {
        std::cout << "Enter PIN: ";
        if (!(std::cin >> pin)) {
            std::cin.clear();
            std::cin.ignore(10000, '\n');
            continue;
        }
        authenticated = user.authenticate(pin);
    }

    if (!authenticated) {
        return;
    }

    std::cout << "\nATM System - Initialized\n";

    int choice;
    do {
        std::cout << "\n1. Balance Inquiry\n";
        std::cout << "2. Deposit\n";
        std::cout << "3. Withdraw\n";
        std::cout << "4. Mini Statement\n";
        std::cout << "5. Exit\n";
        std::cout << "Choose option: ";

        if (!(std::cin >> choice)) {
            std::cin.clear();
            std::cin.ignore(10000, '\n');
            continue;
        }

        try {
            switch (choice) {
                case 1: {
                    BalanceInquiry bi;
                    bi.execute(user.getAccount());
                    break;
                }
                case 2: {
                    Deposit d;
                    d.execute(user.getAccount());
                    break;
                }
                case 3: {
                    Withdrawal w;
                    w.execute(user.getAccount());
                    break;
                }
                case 4: {
                    user.getAccount()->showHistory();
                    break;
                }
                case 5:
                    std::cout << "Thank you for using ATM!\n";
                    break;
                default:
                    std::cout << "Invalid option!\n";
            }
        } catch (const ATMException& e) {
            std::cout << "❌ Error: " << e.what() << "\n";
        }

    } while (choice != 5);
}
