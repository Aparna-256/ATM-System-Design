#include "../src/atm/account/Account.h"
#include <cassert>
#include <iostream>

int main() {
    Account acc(5000);

    acc.deposit(2000);
    assert(acc.getBalance() == 7000);

    acc.withdraw(3000);
    assert(acc.getBalance() == 4000);

    std::cout << "✅ Account tests passed\n";
    return 0;
}
