#include "Withdrawal.h"
#include "../account/Account.h"
#include "../core/logger.h"
#include <iostream>
#include <string>

void Withdrawal::execute(Account* account) {
    double amount;
    std::cout << "Enter withdrawal amount: ";
    std::cin >> amount;

    if (account->withdraw(amount)) {
        Logger::log("Withdrawal: Rs. " + std::to_string(amount));
        std::cout << "Withdrawal successful!\n";
    } else {
        std::cout << "Insufficient balance!\n";
    }
}
