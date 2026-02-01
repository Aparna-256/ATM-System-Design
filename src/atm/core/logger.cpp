#include "Logger.h"
#include <fstream>

void Logger::log(const std::string& message) {
    std::ofstream file("logs/transactions.log", std::ios::app);
    file << message << "\n";
    file.close();
}
