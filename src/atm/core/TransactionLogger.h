#ifndef TRANSACTION_LOGGER_H
#define TRANSACTION_LOGGER_H

#include <string>

class TransactionLogger {
private:
    static int counter;
    static std::string getTimestamp();

public:
    static void log(const std::string& type, double amount);
};

#endif
