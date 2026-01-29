#ifndef DEPOSIT_H
#define DEPOSIT_H

#include "Transaction.h"

class Deposit : public Transaction {
public:
    void execute(Account* account) override;
};

#endif
