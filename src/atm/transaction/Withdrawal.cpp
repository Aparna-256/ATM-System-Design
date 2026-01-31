#include "Withdrawal.h"
#include <iostream>
#include "../account/Account.h"

void Withdrawal::execute(Account* account) {
    double amount;
    std::cout << "Enter withdrawal amount: ";
    std::cin >> amount;

    if (amount <= 0) {
        std::cout << "Invalid withdrawal amount.\n";
        return;
    }

    if (account->withdraw(amount)) {
        account->addTransaction("Withdrawal", amount);
        std::cout << "Withdrawal successful!\n";
    } else {
        std::cout << "Insufficient balance.\n";
    }
}
