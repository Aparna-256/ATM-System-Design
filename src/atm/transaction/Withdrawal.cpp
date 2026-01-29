#include "Withdrawal.h"
#include <iostream>
#include "../account/Account.h"

void Withdrawal::execute(Account* account) {
    double amount;
    std::cout << "Enter withdrawal amount: ";
    std::cin >> amount;

    if (account->withdraw(amount)) {
        std::cout << "Please collect your cash." << std::endl;
    } else {
        std::cout << "Insufficient balance!" << std::endl;
    }
}
