#include <iostream>

#include "atm/user/Card.h"
#include "atm/user/User.h"
#include "atm/account/Account.h"
#include "atm/core/ATM.h"

int main() {
    std::cout << "ATM System - Initialized" << std::endl;

    Account account(5000);
    Card card("1111-2222", 1234);
    User user("Aparna", card, &account);

    ATM atm;
    atm.start(user);

    return 0;
}
