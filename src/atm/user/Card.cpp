#include "Card.h"
#include <string>

Card::Card(const std::string& number, int pin)
    : number(number), pin(pin) {}

bool Card::validatePin(int enteredPin) const {
    return pin == enteredPin;
}

std::string Card::getCardNumber() const {
    return number;
}
