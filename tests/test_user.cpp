#include "../src/atm/user/User.h"
#include <cassert>
#include <iostream>

int main() {
    Card card("1234-5678", 1111);
    Account acc(5000);
    User user("Test", card, &acc);

    user.authenticate(0000);
    user.authenticate(0000);
    user.authenticate(0000);

    assert(user.isLocked() == true);

    std::cout << "✅ User security tests passed\n";
    return 0;
}
