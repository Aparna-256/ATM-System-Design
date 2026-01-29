#include "BalanceInquiry.h"
#include <iostream>
#include "../account/Account.h"

void BalanceInquiry::execute(Account* account) {
    std::cout << "Current Balance: ₹" 
              << account->getBalance() << std::endl;
}
