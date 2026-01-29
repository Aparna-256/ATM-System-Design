#ifndef BALANCE_INQUIRY_H
#define BALANCE_INQUIRY_H

#include "Transaction.h"

class BalanceInquiry : public Transaction {
public:
    void execute(Account* account) override;
};

#endif
