#ifndef ATM_EXCEPTION_H
#define ATM_EXCEPTION_H

#include <exception>
#include <string>

class ATMException : public std::exception {
protected:
    std::string message;

public:
    ATMException(const std::string& msg) : message(msg) {}
    const char* what() const noexcept override {
        return message.c_str();
    }
};

class InvalidAmountException : public ATMException {
public:
    InvalidAmountException() : ATMException("Invalid amount entered!") {}
};

class InsufficientBalanceException : public ATMException {
public:
    InsufficientBalanceException() : ATMException("Insufficient balance!") {}
};

class DailyLimitExceededException : public ATMException {
public:
    DailyLimitExceededException() : ATMException("Daily withdrawal limit exceeded!") {}
};

#endif
