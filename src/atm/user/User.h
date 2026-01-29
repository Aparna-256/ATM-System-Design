#pragma once
#include <string>
#include "Card.h"

class Account;   // ⭐ THIS LINE IS REQUIRED

class User {
private:
    std::string name;
    Card card;
    Account* account;

public:
    User(const std::string& name, Card card, Account* account);
    bool authenticate(int pin) const;
    Account* getAccount() const;
};
