#include <iostream>
#include "atm/core/ATM.h"
#include "tests/TestRunner.h"

int main() {
    int choice;
    std::cout << "1. Run ATM\n2. Run Tests\nChoose: ";
    std::cin >> choice;

    if (choice == 2) {
        runAllTests();
        return 0;
    }

    ATM atm;
    atm.start();
}
