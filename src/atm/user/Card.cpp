#include "Card.h"

Card::Card(const std::string& number, int pin)
    : cardNumber(number), pin(pin) {}

bool Card::validatePin(int enteredPin) const {
    return pin == enteredPin;
}

std::string Card::getCardNumber() const {
    return cardNumber;
}
