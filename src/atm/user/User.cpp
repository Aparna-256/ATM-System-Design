#include "User.h"

User::User(int pin) : pin(pin), failedAttempts(0), locked(false) {}

bool User::authenticate(int enteredPin) {
    if (locked)
        return false;

    if (enteredPin == pin) {
        failedAttempts = 0;
        return true;
    }

    failedAttempts++;
    if (failedAttempts >= 3)
        locked = true;

    return false;
}

bool User::isLocked() const {
    return locked;
}
