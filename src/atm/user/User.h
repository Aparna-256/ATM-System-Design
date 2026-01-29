#ifndef USER_H
#define USER_H

#include <string>
#include "Card.h"

class Account;

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

#endif
