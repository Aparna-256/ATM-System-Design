#ifndef DEPOSIT_H
#define DEPOSIT_H

#include "Transaction.h"

class Deposit : public Transaction {
    double amount;

public:
    Deposit(Account* account, double amount);
    void execute() override;
};

#endif
