#ifndef CARD_H
#define CARD_H

#include <string>

class Card {
private:
    std::string number;
    int pin;
    int failedAttempts;
    bool blocked;

public:
    Card(const std::string& number, int pin);

    bool validatePin(int enteredPin);
    bool isBlocked() const;

    std::string getCardNumber() const;
};

#endif
