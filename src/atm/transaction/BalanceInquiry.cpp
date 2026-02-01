#include "BalanceInquiry.h"
#include "../account/Account.h"
#include "../core/logger.h"
#include <iostream>
#include <string>

void BalanceInquiry::execute(Account* account) {
    Logger::log("Balance Inquiry: Rs. " + std::to_string(account->getBalance()));
    std::cout << "Current Balance: Rs. " << account->getBalance() << "\n";
}
