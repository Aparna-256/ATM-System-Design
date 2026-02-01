#include "atm/core/ATM.h"
#include "TestSuite.h"
#include <iostream>

int main() {
    int mode;
    std::cout << "1. Run ATM\n2. Run Tests\nChoose: ";
    std::cin >> mode;

    if (mode == 2) {
        TestSuite::runAll();
        return 0;
    }

    ATM atm;
    atm.start();
    return 0;
}
