#pragma once
#ifndef USER_H
#define USER_H

class User {
private:
    int pin;
    int failedAttempts;
    bool locked;

public:
    User(int pin);

    bool authenticate(int enteredPin);
    bool isLocked() const;
};

#endif
