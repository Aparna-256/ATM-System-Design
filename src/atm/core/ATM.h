#ifndef ATM_H
#define ATM_H

#include "../account/Account.h"
#include "../user/User.h"

class ATM {
private:
    Account account;
    User user;

public:
    ATM();
    void start();
};

#endif
