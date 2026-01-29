#ifndef TRANSACTION_H
#define TRANSACTION_H

class Account;

class Transaction {
protected:
    Account* account;

public:
    explicit Transaction(Account* account);
    virtual void execute() = 0;
    virtual ~Transaction() = default;
};

#endif
