#pragma once
#include "atm/core/ThreadCompat.h"

class Account {
private:
    double balance;
    mutable WinMutex mtx;

public:
    Account(double initial);
    bool deposit(double amount);
    bool withdraw(double amount);
    double getBalance() const;
};
