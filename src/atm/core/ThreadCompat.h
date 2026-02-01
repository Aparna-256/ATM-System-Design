#pragma once
#include <windows.h>
#include <string>

class WinMutex {
private:
    CRITICAL_SECTION cs;
public:
    WinMutex() { InitializeCriticalSection(&cs); }
    ~WinMutex() { DeleteCriticalSection(&cs); }
    void lock() { EnterCriticalSection(&cs); }
    void unlock() { LeaveCriticalSection(&cs); }
};

class WinLockGuard {
private:
    WinMutex& mtx;
public:
    WinLockGuard(WinMutex& m) : mtx(m) { mtx.lock(); }
    ~WinLockGuard() { mtx.unlock(); }
};
