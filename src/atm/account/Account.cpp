#include "Account.h"

Account::Account(double initial) : balance(initial) {}

bool Account::deposit(double amount) {
    if (amount <= 0 || amount > 1e8) return false;
    WinLockGuard lock(mtx);
    balance += amount;
    return true;
}

bool Account::withdraw(double amount) {
    WinLockGuard lock(mtx);
    if (amount <= 0 || amount > balance) return false;
    balance -= amount;
    return true;
}

double Account::getBalance() const {
    return balance;
}
