#include "Deposit.h"
#include <iostream>
#include "../account/Account.h"

void Deposit::execute(Account* account) {
    int amount;
    std::cout << "Enter deposit amount: ";
    if (!(std::cin >> amount)) {
        std::cin.clear();
        std::cin.ignore(10000, '\n');
        std::cout << "Invalid input.\n";
        return;
    }

    account->deposit(amount);
    std::cout << "Deposit successful!\n";
}
