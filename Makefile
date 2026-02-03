CXX = g++
CXXFLAGS = -std=c++17 -Wall -Isrc -Itests -pthread

SRC_DIR = src
TESTS_DIR = tests
OBJ_DIR = obj

# Find all .cpp files
SOURCES = $(SRC_DIR)/main.cpp \
          $(SRC_DIR)/atm/account/Account.cpp \
          $(SRC_DIR)/atm/core/ATM.cpp \
          $(SRC_DIR)/atm/core/TransactionLogger.cpp \
          $(SRC_DIR)/atm/core/logger.cpp \
          $(SRC_DIR)/atm/user/User.cpp \
          $(SRC_DIR)/atm/user/Card.cpp \
          $(TESTS_DIR)/testRunner.cpp

# Define binary
TARGET = atm_system

all: $(TARGET)

$(TARGET): $(SOURCES)
	@mkdir -p logs data
	$(CXX) $(CXXFLAGS) $(SOURCES) -o $(TARGET)

clean:
	rm -f $(TARGET)
	rm -rf logs data

run: all
	./$(TARGET)
