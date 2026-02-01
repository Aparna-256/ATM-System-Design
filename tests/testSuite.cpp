#include "TestSuite.h"
#include "atm/account/Account.h"
#include "atm/user/User.h"
#include <iostream>

void TestSuite::runAll() {
    std::cout << "\nRunning Tests...\n";

    Account acc(100);
    acc.deposit(50);
    std::cout << (acc.getBalance() == 150 ? "[PASS] Deposit\n" : "[FAIL] Deposit\n");

    acc.withdraw(50);
    std::cout << (acc.getBalance() == 100 ? "[PASS] Withdraw\n" : "[FAIL] Withdraw\n");

    User user(1234);
    user.authenticate(1111);
    user.authenticate(2222);
    user.authenticate(3333);
    std::cout << (user.isLocked() ? "[PASS] PIN Lock\n" : "[FAIL] PIN Lock\n");
}
