#include "BalanceInquiry.h"
#include "../core/Logger.h"
#include <iostream>

void BalanceInquiry::execute(Account* account) {
    Logger::log("Balance Inquiry: Rs. " + std::to_string(account->getBalance()));
    std::cout << "Current Balance: Rs. " << account->getBalance() << "\n";
}
