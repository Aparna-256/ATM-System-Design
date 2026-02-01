#pragma once
#include <mutex>

class Account {
private:
    double balance;
    mutable std::mutex mtx;

public:
    Account(double initial);
    bool deposit(double amount);
    bool withdraw(double amount);
    double getBalance() const;
};
