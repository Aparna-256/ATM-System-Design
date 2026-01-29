#ifndef WITHDRAWAL_H
#define WITHDRAWAL_H

#include "Transaction.h"

class Withdrawal : public Transaction {
public:
    void execute(Account* account) override;
};

#endif
