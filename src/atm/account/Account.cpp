#include "Account.h"

Account::Account(double initialBalance) {
    balance = initialBalance;
}

void Account::deposit(double amount) {
    balance += amount;
}

bool Account::withdraw(double amount) {
    if (amount > balance)
        return false;

    balance -= amount;
    return true;
}

double Account::getBalance() const {
    return balance;
}
