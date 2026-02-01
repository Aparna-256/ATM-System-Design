#ifndef ACCOUNT_H
#define ACCOUNT_H

#include <string>

class Account {
private:
    double balance;

public:
    Account(double balance = 0);

    void deposit(double amount);
    bool withdraw(double amount);
    double getBalance() const;

    void loadFromFile(const std::string& filename);
    void saveToFile(const std::string& filename);
};

#endif
