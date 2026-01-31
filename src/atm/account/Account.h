#include <vector>
#include "../transaction/TransactionRecord.h"

class Account {
private:
    double balance;
    std::vector<TransactionRecord> history;

public:
    Account(double balance);

    void deposit(double amount);
    bool withdraw(double amount);

    double getBalance() const;
    void addTransaction(const std::string& type, double amount);
    void showHistory() const;
};
