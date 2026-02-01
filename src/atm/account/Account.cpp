#include "Account.h"
#include <fstream>

Account::Account(double balance) : balance(balance) {}

void Account::deposit(double amount) {
    balance += amount;
}

bool Account::withdraw(double amount) {
    if (amount > balance) return false;
    balance -= amount;
    return true;
}

double Account::getBalance() const {
    return balance;
}

void Account::loadFromFile(const std::string& filename) {
    std::ifstream file(filename);
    if (file.is_open()) {
        file >> balance;
        file.close();
    }
}

void Account::saveToFile(const std::string& filename) {
    std::ofstream file(filename);
    file << balance;
    file.close();
}
