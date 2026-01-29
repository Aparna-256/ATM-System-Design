#ifndef WITHDRAWAL_H
#define WITHDRAWAL_H

#include "Transaction.h"

class Withdrawal : public Transaction {
    double amount;

public:
    Withdrawal(Account* account, double amount);
    void execute() override;
};

#endif
