#include "BalanceInquiry.h"
#include "../account/Account.h"
#include <iostream>

BalanceInquiry::BalanceInquiry(Account* account)
    : Transaction(account) {}

void BalanceInquiry::execute() {
    std::cout << "Current Balance: " << account->getBalance() << "\n";
}
