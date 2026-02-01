#include "TestRunner.h"
#include "../atm/account/Account.h"
#include "../atm/user/Card.h"
#include <iostream>
#include <thread>

static int passed = 0, failed = 0;

#define TEST(name, expr) \
    if (expr) { std::cout << "[PASS] " << name << "\n"; passed++; } \
    else { std::cout << "[FAIL] " << name << "\n"; failed++; }

void runAllTests() {
    Account acc(1000);
    TEST("Negative Withdraw", !acc.withdraw(2000));
    TEST("Deposit Overflow", acc.deposit(1e9));

    Card card("123", 1111);
    card.validatePin(0000);
    card.validatePin(0000);
    card.validatePin(0000);
    TEST("PIN Lock", card.isLocked());

    // Concurrency (design-level)
    Account acc2(1000);
    std::thread t1([&](){ acc2.deposit(500); });
    std::thread t2([&](){ acc2.withdraw(200); });
    t1.join(); t2.join();
    TEST("Concurrent Access", acc2.getBalance() == 1300);

    std::cout << "\nSUMMARY: " << passed << " passed, "
              << failed << " failed\n";
}
