#include "logger.h"
#include <fstream>
#include <ctime>
#include <functional>

static std::string sign(const std::string& data) {
    return std::to_string(std::hash<std::string>{}(data));
}

void Logger::log(const std::string& entry) {
    std::ofstream out("logs/transactions.log", std::ios::app);
    std::time_t now = std::time(nullptr);

    std::string record = std::string(std::ctime(&now)) + " | " + entry;
    out << record << " | SIG=" << sign(record) << "\n";
}
