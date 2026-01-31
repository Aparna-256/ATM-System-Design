#include "ATM.h"
#include "ATMException.h"
#include <iostream>

#include "../transaction/Deposit.h"
#include "../transaction/Withdrawal.h"
#include "../transaction/BalanceInquiry.h"

void ATM::start(User& user) {
    int pin;
    std::cout << "Enter PIN: ";
    std::cin >> pin;

    if (!user.authenticate(pin)) {
        std::cout << "Authentication failed.\n";
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

        std::cin >> choice;

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
                case 4:
                    user.getAccount()->showHistory();
                    break;
                case 5:
                    std::cout << "Thank you for using ATM!\n";
                    break;
                default:
                    std::cout << "Invalid option!\n";
            }
        }
        catch (const ATMException& e) {
            std::cout << "❌ Error: " << e.what() << "\n";
        }

    } while (choice != 5);
}
