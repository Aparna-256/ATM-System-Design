#include "Withdrawal.h"
#include "../account/Account.h"
#include <iostream>

Withdrawal::Withdrawal(Account* account, double amount)
    : Transaction(account), amount(amount) {}

void Withdrawal::execute() {
    if (account->withdraw(amount)) {
        std::cout << "Withdrawal successful: " << amount << "\n";
    } else {
        std::cout << "Insufficient balance\n";
    }
}
