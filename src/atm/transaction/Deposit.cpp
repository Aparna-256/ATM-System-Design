#include "Deposit.h"
#include "../account/Account.h"
#include "../core/logger.h"
#include <iostream>
#include <string>

void Deposit::execute(Account* account) {
    double amount;
    std::cout << "Enter deposit amount: ";
    std::cin >> amount;

    account->deposit(amount);

    Logger::log("Deposit: Rs. " + std::to_string(amount));

    std::cout << "Deposit successful!\n";
}
