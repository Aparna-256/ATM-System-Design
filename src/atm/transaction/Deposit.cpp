#include "Deposit.h"
#include "../core/Logger.h"
#include <iostream>

void Deposit::execute(Account* account) {
    double amount;
    std::cout << "Enter deposit amount: ";
    std::cin >> amount;

    account->deposit(amount);

    Logger::log("Deposit: Rs. " + std::to_string(amount));

    std::cout << "Deposit successful!\n";
}
