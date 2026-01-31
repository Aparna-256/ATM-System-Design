bool User::authenticate(int pin) const {
    if (card.isBlocked()) {
        std::cout << "Card is blocked due to multiple failed attempts.\n";
        return false;
    }
    return card.validatePin(pin);
}
