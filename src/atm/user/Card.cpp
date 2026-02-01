#include "Card.h"
#include <fstream>
#include <functional>

std::string Card::hashPin(int pin) const {
    return std::to_string(std::hash<int>{}(pin));
}

Card::Card(const std::string& number, int pin)
    : cardNumber(number), pinHash(hashPin(pin)),
      failedAttempts(0), locked(false) {
    loadState();
}

bool Card::validatePin(int enteredPin) {
    if (locked) return false;

    if (hashPin(enteredPin) == pinHash) {
        failedAttempts = 0;
        persistState();
        return true;
    }

    failedAttempts++;
    if (failedAttempts >= 3) locked = true;
    persistState();
    return false;
}

bool Card::isLocked() const {
    return locked;
}

void Card::persistState() const {
    std::ofstream out("data/account.txt");
    out << failedAttempts << "\n" << locked;
}

void Card::loadState() {
    std::ifstream in("data/account.txt");
    if (in) in >> failedAttempts >> locked;
}

std::string Card::getCardNumber() const {
    return cardNumber;
}
