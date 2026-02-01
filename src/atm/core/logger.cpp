#include "logger.h"
#include <fstream>
#include <iostream>
#include <string>

void Logger::log(const std::string& message) {
    // Note: logs directory should be pre-created or handled at system level 
    // to avoid <filesystem> compatibility issues in some MinGW environments.
    std::ofstream file("logs/transactions.log", std::ios::app);
    if (file.is_open()) {
        file << message << "\n";
        file.close();
    }
}

void Logger::showLogs() {
    std::ifstream file("logs/transactions.log");
    if (!file.is_open()) {
        std::cout << "No transaction logs found.\n";
        return;
    }
    std::string line;
    std::cout << "\n--- Audit Trail / Mini Statement ---\n";
    while (std::getline(file, line)) {
        std::cout << line << "\n";
    }
    std::cout << "------------------------------------\n";
    file.close();
}
