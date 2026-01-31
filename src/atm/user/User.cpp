#include "User.h"
#include <iostream>

User::User(const std::string& name, Card card, Account* account)
    : name(name), card(card), account(account) {}

bool User::authenticate(int pin) {
    if (card.isBlocked()) {
        std::cout << "Card is blocked due to multiple failed attempts.\n";
        return false;
    }
    return card.validatePin(pin);
}

Account* User::getAccount() const {
    return account;
}
