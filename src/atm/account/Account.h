#ifndef ACCOUNT_H
#define ACCOUNT_H

class Account {
private:
    double balance;

public:
    Account(double initialBalance);
    double getBalance() const;
    void deposit(double amount);
    bool withdraw(double amount);
};

#endif
