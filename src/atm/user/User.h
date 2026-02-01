#ifndef USER_H
#define USER_H

#include <string>
#include "Card.h"
#include "../account/Account.h"

class User {
private:
    std::string name;
    Card card;
    Account* account;
    int failedAttempts;
    const int MAX_ATTEMPTS = 3;
    bool locked;

public:
    User(const std::string& name, Card card, Account* account);

    bool authenticate(int pin);
    bool isLocked() const;

    Account* getAccount() const;
};

#endif
