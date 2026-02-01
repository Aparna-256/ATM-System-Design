#include <iostream>
#include "atm/core/ATM.h"
#include "atm/account/Account.h"
#include "atm/user/Card.h"
#include "atm/user/User.h"

int main() {
    Account account;
    account.loadFromFile("data/account.txt");

    Card card("1234-5678", 1234);
    User user("Aparna", card, &account);

    ATM atm;
    atm.start(user);

    account.saveToFile("data/account.txt");
    return 0;
}
