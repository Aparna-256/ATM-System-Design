#include <iostream>
#include <thread>

int main() {
#ifdef __MINGW32__
    std::cout << "MinGW detected\n";
#endif
#if defined(_GLIBCXX_HAS_GTHREADS) || defined(_GLIBCXX_HAS_GTHREADS_POSIX) || defined(_GLIBCXX_HAS_GTHREADS_WIN32)
    std::cout << "Threads likely supported\n";
#else
    std::cout << "Threads might NOT be supported\n";
#endif
    try {
        std::thread t([]() { std::cout << "Thread running!\n"; });
        t.join();
        std::cout << "Thread test passed!\n";
    } catch (...) {
        std::cout << "Thread test FAILED!\n";
    }
    return 0;
}
