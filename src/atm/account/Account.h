#ifndef ACCOUNT_H
#define ACCOUNT_H

#include <vector>
#include <string>

class Account {
private:
    int balance;
    int dailyWithdrawn;
    const int DAILY_LIMIT = 20000;
    std::vector<std::string> history;

public:
    Account(int initialBalance);

    int getBalance() const;

    void deposit(int amount);
    void withdraw(int amount);

    void showHistory() const;
};

#endif
