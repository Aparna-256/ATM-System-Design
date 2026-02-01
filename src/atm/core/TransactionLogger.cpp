#include "TransactionLogger.h"
#include <fstream>
#include <ctime>
#include <sstream>
#include <iomanip>

int TransactionLogger::counter = 0;

std::string TransactionLogger::getTimestamp() {
    std::time_t now = std::time(nullptr);
    std::tm* local = std::localtime(&now);

    std::ostringstream oss;
    oss << std::put_time(local, "%Y-%m-%d %H:%M:%S");
    return oss.str();
}

void TransactionLogger::log(const std::string& type, double amount) {
    counter++;

    std::ofstream file("logs/transactions.log", std::ios::app);
    file << "[TXN" << std::setw(4) << std::setfill('0') << counter
         << "] [" << getTimestamp() << "] "
         << type << ": Rs. " << amount << "\n";
    file.close();
}
