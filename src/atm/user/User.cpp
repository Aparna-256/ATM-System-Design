#include "User.h"
#include "Card.h"
#include "../account/Account.h"

User::User(const std::string& name, Card card, Account* account)
    : name(name), card(card), account(account) {}

bool User::authenticate(int pin) const {
    return card.validatePin(pin);
}

Account* User::getAccount() const {
    return account;
}
