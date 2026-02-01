#include "Withdrawal.h"
#include <iostream>
#include "../account/Account.h"

void Withdrawal::execute(Account* account) {
    int amount;
    std::cout << "Enter withdrawal amount: ";
    if (!(std::cin >> amount)) {
        std::cin.clear();
        std::cin.ignore(10000, '\n');
        std::cout << "Invalid input.\n";
        return;
    }

    account->withdraw(amount);
    std::cout << "Withdrawal successful!\n";
}
