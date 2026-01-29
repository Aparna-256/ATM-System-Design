#ifndef CARD_H
#define CARD_H

#include <string>

class Card {
private:
    std::string number;
    int pin;

public:
    Card(const std::string& number, int pin);
    bool validatePin(int enteredPin) const;
    std::string getCardNumber() const;
};

#endif
