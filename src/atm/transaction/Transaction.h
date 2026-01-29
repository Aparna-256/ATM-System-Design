#ifndef TRANSACTION_H
#define TRANSACTION_H

class Account;

class Transaction {
public:
    virtual void execute(Account* account) = 0;
    virtual ~Transaction() = default;
};

#endif
