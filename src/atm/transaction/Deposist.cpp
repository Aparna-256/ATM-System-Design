#include "Deposit.h"
#include "../account/Account.h"
#include <iostream>

Deposit::Deposit(Account* account, double amount)
    : Transaction(account), amount(amount) {}

void Deposit::execute() {
    account->deposit(amount);
    std::cout << "Deposited: " << amount << "\n";
}
