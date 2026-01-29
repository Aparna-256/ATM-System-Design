#ifndef BALANCE_INQUIRY_H
#define BALANCE_INQUIRY_H

#include "Transaction.h"

class BalanceInquiry : public Transaction {
public:
    explicit BalanceInquiry(Account* account);
    void execute() override;
};

#endif
