#pragma once

#if defined(_WIN32) || defined(__WIN32__) || defined(__MINGW32__)
#include <windows.h>
class WinMutex {
private:
    CRITICAL_SECTION cs;
public:
    WinMutex() { InitializeCriticalSection(&cs); }
    ~WinMutex() { DeleteCriticalSection(&cs); }
    void lock() { EnterCriticalSection(&cs); }
    void unlock() { LeaveCriticalSection(&cs); }
};
#else
#include <mutex>
class WinMutex {
private:
    std::mutex mtx;
public:
    void lock() { mtx.lock(); }
    void unlock() { mtx.unlock(); }
};
#endif

class WinLockGuard {
private:
    WinMutex& mtx;
public:
    WinLockGuard(WinMutex& m) : mtx(m) { mtx.lock(); }
    ~WinLockGuard() { mtx.unlock(); }
};
