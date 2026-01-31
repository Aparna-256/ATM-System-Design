#include "Card.h"

Card::Card(const std::string& number, int pin)
    : number(number), pin(pin), failedAttempts(0), blocked(false) {}

bool Card::validatePin(int enteredPin) {
    if (blocked) return false;

    if (pin == enteredPin) {
        failedAttempts = 0;
        return true;
    }

    failedAttempts++;
    if (failedAttempts >= 3) {
        blocked = true;
    }
    return false;
}

bool Card::isBlocked() const {
    return blocked;
}

std::string Card::getCardNumber() const {
    return number;
}
