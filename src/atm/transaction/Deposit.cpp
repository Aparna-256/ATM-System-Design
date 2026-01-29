#include "Deposit.h"
#include <iostream>
#include "../account/Account.h"

void Deposit::execute(Account* account) {
    double amount;
    std::cout << "Enter deposit amount: ";
    std::cin >> amount;

    account->deposit(amount);
    std::cout << "Deposit successful!" << std::endl;
}
