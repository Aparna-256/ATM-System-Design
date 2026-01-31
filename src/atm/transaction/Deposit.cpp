#include "Deposit.h"
#include <iostream>

void Deposit::execute(Account* account) {
    double amount;
    std::cout << "Enter deposit amount: ";
    std::cin >> amount;

    if (amount <= 0) {
        std::cout << "Invalid deposit amount.\n";
        return;
    }

    account->deposit(amount);
    account->addTransaction("Deposit", amount);

    std::cout << "Deposit successful!\n";
}
