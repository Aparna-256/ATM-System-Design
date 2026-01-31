#include "Account.h"
#include "../core/ATMException.h"
#include <iostream>

Account::Account(int initialBalance)
    : balance(initialBalance), dailyWithdrawn(0) {}

int Account::getBalance() const {
    return balance;
}

void Account::deposit(int amount) {
    if (amount <= 0)
        throw InvalidAmountException();

    balance += amount;
    history.push_back("Deposit: Rs. " + std::to_string(amount));
}

void Account::withdraw(int amount) {
    if (amount <= 0)
        throw InvalidAmountException();

    if (amount > balance)
        throw InsufficientBalanceException();

    if (dailyWithdrawn + amount > DAILY_LIMIT)
        throw DailyLimitExceededException();

    balance -= amount;
    dailyWithdrawn += amount;
    history.push_back("Withdrawal: Rs. " + std::to_string(amount));
}

void Account::showHistory() const {
    std::cout << "\n--- Mini Statement ---\n";
    for (const auto& h : history)
        std::cout << h << "\n";
    std::cout << "----------------------\n";
}
