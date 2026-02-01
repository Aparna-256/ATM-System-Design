#include "User.h"
#include <iostream>

User::User(const std::string& name, Card card, Account* account)
    : name(name), card(card), account(account),
      failedAttempts(0), locked(false) {}

bool User::authenticate(int pin) {
    if (locked) {
        std::cout << "❌ Card is locked due to multiple failed attempts.\n";
        return false;
    }

    if (card.validatePin(pin)) {
        failedAttempts = 0;
        return true;
    }

    failedAttempts++;
    std::cout << "❌ Incorrect PIN. Attempts left: "
              << (MAX_ATTEMPTS - failedAttempts) << "\n";

    if (failedAttempts >= MAX_ATTEMPTS) {
        locked = true;
        std::cout << "🚫 Card locked for security reasons.\n";
    }

    return false;
}

bool User::isLocked() const {
    return locked;
}

Account* User::getAccount() const {
    return account;
}
