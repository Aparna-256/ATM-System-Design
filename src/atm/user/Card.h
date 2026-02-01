#pragma once
#include <string>

class Card {
private:
    std::string cardNumber;
    std::string pinHash;
    int failedAttempts;
    bool locked;

    std::string hashPin(int pin) const;

public:
    Card(const std::string& number, int pin);

    bool validatePin(int enteredPin);
    bool isLocked() const;
    void persistState() const;
    void loadState();

    std::string getCardNumber() const;
};
