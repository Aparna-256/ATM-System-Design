/* ==========================================================================
   ATM SYSTEM DESIGN - INTERACTIVE FRONTEND ENGINE (app.js)
   Realistic ATM State Machine, Audio Synthesizer, Hardware Keypad,
   Card Slot Animations, Cash Dispenser, Receipt Printer & Audit Logger
   ========================================================================== */

(function () {
  'use strict';

  // --- ATM STATE MODEL ---
  const state = {
    balance: 150.00,        // Matches ATM.cpp default
    pin: "1234",            // Matches ATM.cpp default
    failedAttempts: 0,
    maxAttempts: 3,
    isLocked: false,
    isCardInserted: false,
    cardNumber: "4532 •••• •••• 8824",
    cardHolder: "APARNA JHA",
    currentScreen: 'welcome',
    pinBuffer: "",
    amountBuffer: "",
    changePinStep: 'current', // 'current' | 'new' | 'confirm'
    newPinCandidate: "",
    activeDispensedNotes: [],
    lastTransaction: null,
    inactivitySeconds: 30,
    inactivityTimerId: null,
    audioEnabled: true,
    isServerConnected: false,
    serverUrl: "http://localhost:5000",
    transactionLogs: [
      "[TXN0001] [2026-02-01 16:30:26] Balance Inquiry: Rs. 150.00",
      "[TXN0002] [2026-02-01 16:30:26] Deposit: Rs. 50.00",
      "[TXN0003] [2026-02-01 16:30:26] Withdrawal: Rs. 30.00",
      "[TXN0004] [2026-02-01 17:21:45] Balance Inquiry: Rs. 150.00"
    ]
  };

  // --- AUDIO SYNTHESIZER (Pure Web Audio API - Zero External Dependencies) ---
  const AudioEngine = {
    ctx: null,
    init() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      } catch (e) {
        console.warn("Web Audio not supported", e);
      }
    },
    play(fn) {
      if (!state.audioEnabled) return;
      if (!this.ctx) this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      try {
        if (this.ctx) fn(this.ctx);
      } catch (e) {
        console.error("Audio error", e);
      }
    },
    keyClick() {
      this.play(ctx => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      });
    },
    beep() {
      this.play(ctx => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      });
    },
    success() {
      this.play(ctx => {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.09 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.09);
          osc.stop(ctx.currentTime + idx * 0.09 + 0.2);
        });
      });
    },
    error() {
      this.play(ctx => {
        [220, 180].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.12 + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + idx * 0.12 + 0.15);
        });
      });
    },
    cashDispense() {
      this.play(ctx => {
        // Motor whirr
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.6);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      });
    },
    paperPrint() {
      this.play(ctx => {
        for (let i = 0; i < 5; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(600 + (i % 2) * 150, ctx.currentTime + i * 0.12);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.12);
          osc.stop(ctx.currentTime + i * 0.12 + 0.09);
        }
      });
    }
  };

  // --- DOM ELEMENTS REFERENCE ---
  const el = {
    clock: document.getElementById('screen-clock'),
    kiosk: document.getElementById('atm-kiosk'),
    debitCard: document.getElementById('debit-card-visual'),
    cardActionBtn: document.getElementById('btn-card-action'),
    cardSlotMouth: document.getElementById('card-slot-mouth'),
    screens: {
      welcome: document.getElementById('screen-welcome'),
      pin: document.getElementById('screen-pin'),
      menu: document.getElementById('screen-menu'),
      balance: document.getElementById('screen-balance'),
      withdraw: document.getElementById('screen-withdraw'),
      deposit: document.getElementById('screen-deposit'),
      statement: document.getElementById('screen-statement'),
      changepin: document.getElementById('screen-changepin'),
      processing: document.getElementById('screen-processing'),
      success: document.getElementById('screen-success'),
      locked: document.getElementById('screen-locked')
    },
    pinDots: [
      document.getElementById('pdot-0'),
      document.getElementById('pdot-1'),
      document.getElementById('pdot-2'),
      document.getElementById('pdot-3')
    ],
    pinAttemptsBadge: document.getElementById('pin-attempts-badge'),
    pinAlert: document.getElementById('pin-alert'),
    balanceDisplay: document.getElementById('balance-display'),
    withdrawInput: document.getElementById('withdraw-amount-input'),
    withdrawAlert: document.getElementById('withdraw-alert'),
    depositInput: document.getElementById('deposit-amount-input'),
    depositAlert: document.getElementById('deposit-alert'),
    statementList: document.getElementById('statement-list'),
    changePinPrompt: document.getElementById('changepin-prompt'),
    changePinAlert: document.getElementById('changepin-alert'),
    processingText: document.getElementById('processing-text'),
    successSummary: document.getElementById('success-summary'),
    inactivityProgress: document.getElementById('inactivity-progress'),
    // Slots & Outputs
    dispenserShutter: document.getElementById('dispenser-shutter'),
    cashTray: document.getElementById('dispensed-cash-tray'),
    notesList: document.getElementById('dispensed-notes-list'),
    collectCashBtn: document.getElementById('btn-collect-cash'),
    receiptPaper: document.getElementById('receipt-paper-out'),
    // Dev Drawer & Modals
    devDrawer: document.getElementById('dev-drawer'),
    drawerToggleBtn: document.getElementById('btn-toggle-drawer'),
    drawerCloseBtn: document.getElementById('btn-close-drawer'),
    auditStream: document.getElementById('audit-stream'),
    stateBalance: document.getElementById('state-balance'),
    stateAttempts: document.getElementById('state-attempts'),
    stateCard: document.getElementById('state-card'),
    stateTimer: document.getElementById('state-timer'),
    apiPill: document.getElementById('api-status-pill'),
    receiptModal: document.getElementById('receipt-modal'),
    modalReceiptBody: document.getElementById('modal-receipt-body'),
    themeToggleBtn: document.getElementById('btn-theme-toggle'),
    audioToggleBtn: document.getElementById('btn-audio-toggle')
  };

  // --- INITIALIZATION ---
  function init() {
    loadLocalState();
    startClock();
    setupEventListeners();
    setupKeypad();
    setupBezelButtons();
    checkBackendConnection();
    updateUI();
  }

  // --- REALTIME CLOCK ---
  function startClock() {
    const update = () => {
      const now = new Date();
      if (el.clock) {
        el.clock.textContent = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString();
      }
    };
    update();
    setInterval(update, 1000);
  }

  // --- PERSISTENCE & LOCAL STORAGE ---
  function saveLocalState() {
    try {
      localStorage.setItem('atm_design_state', JSON.stringify({
        balance: state.balance,
        pin: state.pin,
        failedAttempts: state.failedAttempts,
        isLocked: state.isLocked,
        transactionLogs: state.transactionLogs
      }));
    } catch (e) {
      console.warn("LocalStorage save error", e);
    }
  }

  function loadLocalState() {
    try {
      const saved = localStorage.getItem('atm_design_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.balance === 'number') state.balance = parsed.balance;
        if (parsed.pin) state.pin = parsed.pin;
        if (typeof parsed.failedAttempts === 'number') state.failedAttempts = parsed.failedAttempts;
        if (typeof parsed.isLocked === 'boolean') state.isLocked = parsed.isLocked;
        if (Array.isArray(parsed.transactionLogs)) state.transactionLogs = parsed.transactionLogs;
      }
    } catch (e) {
      console.warn("LocalStorage load error", e);
    }
  }

  // --- BACKEND API CONNECTION (OPTIONAL ZERO-CONFIG SYNC) ---
  async function checkBackendConnection() {
    try {
      const res = await fetch(`${state.serverUrl}/api/account`, { method: 'GET', signal: AbortSignal.timeout(1200) });
      if (res.ok) {
        const data = await res.json();
        state.isServerConnected = true;
        if (typeof data.balance === 'number') state.balance = data.balance;
        if (typeof data.failedAttempts === 'number') state.failedAttempts = data.failedAttempts;
        if (typeof data.isLocked === 'boolean') state.isLocked = data.isLocked;
        if (Array.isArray(data.logs)) state.transactionLogs = data.logs;
        el.apiPill.classList.remove('offline');
        el.apiPill.innerHTML = `<span class="api-dot"></span> Backend Live (Port 5000)`;
        updateUI();
        return;
      }
    } catch (e) {
      // Backend not running; fallback to Standalone Client Mode
    }
    state.isServerConnected = false;
    el.apiPill.classList.add('offline');
    el.apiPill.innerHTML = `<span class="api-dot"></span> Standalone Mode`;
  }

  async function syncTransactionWithBackend(type, amount) {
    if (!state.isServerConnected) return;
    try {
      await fetch(`${state.serverUrl}/api/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, amount, balance: state.balance })
      });
    } catch (e) {
      console.warn("Failed to sync transaction with server", e);
    }
  }

  // --- AUDIT TRAIL LOGGER (Matches TransactionLogger.cpp) ---
  function logTransaction(type, amount) {
    const pad = (num, size) => {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };
    const now = new Date();
    const timestamp = now.getFullYear() + "-" +
      pad(now.getMonth() + 1, 2) + "-" +
      pad(now.getDate(), 2) + " " +
      pad(now.getHours(), 2) + ":" +
      pad(now.getMinutes(), 2) + ":" +
      pad(now.getSeconds(), 2);

    const txnId = "TXN" + pad(state.transactionLogs.length + 1, 4);
    const entry = `[${txnId}] [${timestamp}] ${type}: Rs. ${amount.toFixed(2)}`;
    
    state.transactionLogs.push(entry);
    saveLocalState();
    renderAuditStream();
    syncTransactionWithBackend(type, amount);

    state.lastTransaction = {
      id: txnId,
      time: timestamp,
      type: type,
      amount: amount,
      balance: state.balance
    };
  }

  function renderAuditStream() {
    if (!el.auditStream) return;
    el.auditStream.innerHTML = '';
    state.transactionLogs.slice(-25).forEach(line => {
      const div = document.createElement('div');
      div.className = 'log-entry';
      // Syntax highlight TXN ID and timestamp
      div.innerHTML = line
        .replace(/(\[TXN\d+\])/g, '<span class="log-id">$1</span>')
        .replace(/(\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\])/g, '<span class="log-time">$1</span>');
      el.auditStream.appendChild(div);
    });
    el.auditStream.scrollTop = el.auditStream.scrollHeight;
  }

  // --- SCREEN ROUTER ---
  function showScreen(screenId) {
    Object.keys(el.screens).forEach(key => {
      if (el.screens[key]) {
        el.screens[key].classList.toggle('active', key === screenId);
      }
    });
    state.currentScreen = screenId;
    resetInactivityTimer();

    // Specific screen entry logic
    if (screenId === 'welcome') {
      state.pinBuffer = "";
      state.amountBuffer = "";
      stopInactivityTimer();
    } else if (screenId === 'pin') {
      state.pinBuffer = "";
      renderPinDots();
      hideAlert(el.pinAlert);
      updateAttemptsDisplay();
    } else if (screenId === 'balance') {
      if (el.balanceDisplay) {
        el.balanceDisplay.textContent = `Rs. ${state.balance.toFixed(2)}`;
      }
      logTransaction("Balance Inquiry", state.balance);
    } else if (screenId === 'withdraw') {
      state.amountBuffer = "";
      if (el.withdrawInput) el.withdrawInput.value = "";
      hideAlert(el.withdrawAlert);
    } else if (screenId === 'deposit') {
      state.amountBuffer = "";
      if (el.depositInput) el.depositInput.value = "";
      hideAlert(el.depositAlert);
    } else if (screenId === 'statement') {
      renderStatement();
      logTransaction("Statement Viewed", 0);
    } else if (screenId === 'changepin') {
      state.changePinStep = 'current';
      state.pinBuffer = "";
      if (el.changePinPrompt) el.changePinPrompt.textContent = "Enter CURRENT 4-digit PIN:";
      hideAlert(el.changePinAlert);
    }

    updateUI();
  }

  // --- INACTIVITY TIMER (Simulates ATM.cpp session timeout) ---
  function resetInactivityTimer() {
    stopInactivityTimer();
    if (state.currentScreen === 'welcome' || state.currentScreen === 'locked') return;

    state.inactivitySeconds = 30;
    updateInactivityUI();

    state.inactivityTimerId = setInterval(() => {
      state.inactivitySeconds--;
      updateInactivityUI();
      if (state.inactivitySeconds <= 0) {
        stopInactivityTimer();
        AudioEngine.error();
        alert("Session expired due to inactivity. Card ejected for safety.");
        ejectCard();
      }
    }, 1000);
  }

  function stopInactivityTimer() {
    if (state.inactivityTimerId) {
      clearInterval(state.inactivityTimerId);
      state.inactivityTimerId = null;
    }
  }

  function updateInactivityUI() {
    if (el.inactivityProgress) {
      const pct = (state.inactivitySeconds / 30) * 100;
      el.inactivityProgress.style.width = `${pct}%`;
    }
    if (el.stateTimer) {
      el.stateTimer.textContent = `${state.inactivitySeconds}s`;
    }
  }

  // --- CARD READER ACTIONS ---
  function insertCard() {
    if (state.isLocked) {
      AudioEngine.error();
      showScreen('locked');
      return;
    }
    if (state.isCardInserted) return;

    AudioEngine.beep();
    state.isCardInserted = true;
    el.debitCard.classList.add('inserted');
    el.cardActionBtn.textContent = "⏏️ Eject Debit Card";
    el.cardSlotMouth.classList.add('glowing');

    showScreen('pin');
  }

  function ejectCard() {
    AudioEngine.beep();
    state.isCardInserted = false;
    el.debitCard.classList.remove('inserted');
    el.cardActionBtn.textContent = "💳 Insert Debit Card";
    el.cardSlotMouth.classList.remove('glowing');

    showScreen('welcome');
    updateUI();
  }

  // --- PIN VALIDATION & ATTEMPTS ---
  function renderPinDots() {
    for (let i = 0; i < 4; i++) {
      if (el.pinDots[i]) {
        el.pinDots[i].classList.toggle('filled', i < state.pinBuffer.length);
      }
    }
  }

  function updateAttemptsDisplay() {
    const remaining = state.maxAttempts - state.failedAttempts;
    if (el.pinAttemptsBadge) {
      el.pinAttemptsBadge.textContent = `Attempts remaining: ${remaining} / ${state.maxAttempts}`;
      el.pinAttemptsBadge.style.display = state.failedAttempts > 0 ? 'inline-block' : 'none';
    }
  }

  function handlePinInput(digit) {
    if (state.pinBuffer.length < 4) {
      state.pinBuffer += digit;
      AudioEngine.keyClick();
      renderPinDots();

      if (state.pinBuffer.length === 4) {
        setTimeout(verifyEnteredPin, 200);
      }
    }
  }

  function verifyEnteredPin() {
    if (state.isLocked) {
      showScreen('locked');
      return;
    }

    if (state.pinBuffer === state.pin) {
      // Success! Reset attempts
      state.failedAttempts = 0;
      saveLocalState();
      AudioEngine.success();
      showScreen('menu');
    } else {
      // Failed PIN
      state.failedAttempts++;
      saveLocalState();
      AudioEngine.error();
      state.pinBuffer = "";
      renderPinDots();

      if (state.failedAttempts >= state.maxAttempts) {
        state.isLocked = true;
        saveLocalState();
        showScreen('locked');
      } else {
        showAlert(el.pinAlert, `Incorrect PIN! You have ${state.maxAttempts - state.failedAttempts} attempt(s) left.`, 'error');
        updateAttemptsDisplay();
      }
    }
    updateUI();
  }

  // --- CHANGE PIN FLOW ---
  function handleChangePinFlow(digit) {
    if (digit === 'ENTER') {
      if (state.pinBuffer.length !== 4) {
        showAlert(el.changePinAlert, "PIN must be exactly 4 digits!", 'error');
        return;
      }
      if (state.changePinStep === 'current') {
        if (state.pinBuffer !== state.pin) {
          AudioEngine.error();
          showAlert(el.changePinAlert, "Current PIN is incorrect!", 'error');
          state.pinBuffer = "";
          return;
        }
        // Correct current PIN, move to enter new PIN
        AudioEngine.beep();
        state.changePinStep = 'new';
        state.pinBuffer = "";
        el.changePinPrompt.textContent = "Enter NEW 4-digit PIN:";
        hideAlert(el.changePinAlert);
      } else if (state.changePinStep === 'new') {
        state.newPinCandidate = state.pinBuffer;
        state.changePinStep = 'confirm';
        state.pinBuffer = "";
        AudioEngine.beep();
        el.changePinPrompt.textContent = "CONFIRM NEW 4-digit PIN:";
        hideAlert(el.changePinAlert);
      } else if (state.changePinStep === 'confirm') {
        if (state.pinBuffer !== state.newPinCandidate) {
          AudioEngine.error();
          showAlert(el.changePinAlert, "PINs do not match! Try again.", 'error');
          state.changePinStep = 'new';
          state.pinBuffer = "";
          el.changePinPrompt.textContent = "Enter NEW 4-digit PIN:";
          return;
        }
        // Success
        state.pin = state.pinBuffer;
        saveLocalState();
        AudioEngine.success();
        logTransaction("PIN Changed", 0);
        alert("PIN changed successfully!");
        showScreen('menu');
      }
      return;
    }

    if (state.pinBuffer.length < 4) {
      state.pinBuffer += digit;
      AudioEngine.keyClick();
    }
  }

  // --- WITHDRAWAL EXECUTION ---
  function executeWithdrawal(amount) {
    if (isNaN(amount) || amount <= 0) {
      AudioEngine.error();
      showAlert(el.withdrawAlert, "Please enter a valid amount greater than Rs. 0", 'error');
      return;
    }
    if (amount > state.balance) {
      AudioEngine.error();
      showAlert(el.withdrawAlert, `Insufficient balance! Available: Rs. ${state.balance.toFixed(2)}`, 'error');
      return;
    }
    if (amount % 100 !== 0) {
      AudioEngine.error();
      showAlert(el.withdrawAlert, "Withdrawals must be in multiples of Rs. 100", 'error');
      return;
    }

    // Process Withdrawal
    showScreen('processing');
    el.processingText.textContent = "Verifying notes & dispensing cash...";
    AudioEngine.cashDispense();

    setTimeout(() => {
      state.balance -= amount;
      saveLocalState();
      logTransaction("Withdrawal", amount);
      AudioEngine.success();

      // Trigger Physical Dispenser Animation
      dispenseCashNotes(amount);

      el.successSummary.innerHTML = `
        <div style="font-size: 1.1rem; font-weight: 700; color: #34d399; margin-bottom: 8px;">
          Rs. ${amount.toFixed(2)} Dispensed Successfully!
        </div>
        <div style="font-size: 0.85rem; color: #cbd5e1;">
          Updated Balance: <strong>Rs. ${state.balance.toFixed(2)}</strong><br>
          Please collect your cash from the slot below.
        </div>
      `;
      showScreen('success');
    }, 1200);
  }

  // --- DEPOSIT EXECUTION ---
  function executeDeposit(amount) {
    if (isNaN(amount) || amount <= 0) {
      AudioEngine.error();
      showAlert(el.depositAlert, "Please enter a valid amount greater than Rs. 0", 'error');
      return;
    }
    if (amount > 1e8) {
      AudioEngine.error();
      showAlert(el.depositAlert, "Amount exceeds single deposit limit of Rs. 100,000,000", 'error');
      return;
    }

    showScreen('processing');
    el.processingText.textContent = "Counting & validating deposited currency notes...";
    AudioEngine.cashDispense();

    setTimeout(() => {
      state.balance += amount;
      saveLocalState();
      logTransaction("Deposit", amount);
      AudioEngine.success();

      el.successSummary.innerHTML = `
        <div style="font-size: 1.1rem; font-weight: 700; color: #34d399; margin-bottom: 8px;">
          Rs. ${amount.toFixed(2)} Deposited Successfully!
        </div>
        <div style="font-size: 0.85rem; color: #cbd5e1;">
          Updated Balance: <strong>Rs. ${state.balance.toFixed(2)}</strong><br>
          Transaction recorded in audit log.
        </div>
      `;
      showScreen('success');
    }, 1100);
  }

  // --- CASH DISPENSER HARDWARE ANIMATION ---
  function dispenseCashNotes(amount) {
    if (!el.dispenserShutter || !el.cashTray || !el.notesList) return;

    el.dispenserShutter.classList.add('open');
    el.cashTray.classList.add('active');
    el.notesList.innerHTML = '';

    // Break down amount into representative notes
    let rem = amount;
    const notes = [];
    const denoms = [2000, 500, 200, 100];

    for (const d of denoms) {
      const count = Math.floor(rem / d);
      if (count > 0) {
        for (let i = 0; i < Math.min(count, 3); i++) {
          notes.push(d);
        }
        rem %= d;
      }
    }
    if (notes.length === 0) notes.push(100);

    notes.forEach((val, idx) => {
      const note = document.createElement('div');
      note.className = `banknote note-${val}`;
      note.style.transform = `rotate(${(idx - 1) * 3}deg)`;
      note.innerHTML = `
        <div>
          <span class="note-val">₹${val}</span><br>
          <span class="note-tag">Reserve Bank</span>
        </div>
        <div style="text-align: right; font-size: 0.65rem;">
          SPECIMEN<br>₹${val}
        </div>
      `;
      el.notesList.appendChild(note);
    });

    el.collectCashBtn.textContent = `Collect Cash (Rs. ${amount})`;
  }

  function collectCash() {
    AudioEngine.keyClick();
    if (el.dispenserShutter) el.dispenserShutter.classList.remove('open');
    if (el.cashTray) el.cashTray.classList.remove('active');
    alert("Cash collected! Remember to collect your card and receipt.");
  }

  // --- RECEIPT PRINTER EMISSION ---
  function printReceipt() {
    AudioEngine.paperPrint();
    if (!el.receiptPaper) return;

    const txn = state.lastTransaction || {
      id: "TXN" + String(state.transactionLogs.length).padStart(4, '0'),
      time: new Date().toLocaleString(),
      type: "Balance Inquiry",
      amount: state.balance,
      balance: state.balance
    };

    el.receiptPaper.innerHTML = `
      <div style="text-align: center; font-weight: bold; font-size: 0.72rem;">🎀 APARNA STATE BANK 🎀</div>
      <div style="text-align: center; font-size: 0.6rem; color: #555;">24/7 ATM TERMINAL #042</div>
      <div style="border-bottom: 1px dashed #777; margin: 3px 0;"></div>
      <div>TXN ID: ${txn.id}</div>
      <div>DATE  : ${txn.time}</div>
      <div>CARD  : ${state.cardNumber}</div>
      <div>TYPE  : ${txn.type}</div>
      <div>AMOUNT: Rs. ${txn.amount.toFixed(2)}</div>
      <div style="border-bottom: 1px dashed #777; margin: 3px 0;"></div>
      <div style="font-weight: bold;">AVAIL BAL: Rs. ${state.balance.toFixed(2)}</div>
      <div style="text-align: center; margin-top: 4px; font-size: 0.55rem; color: #666;">* CLICK TO ENLARGE *</div>
    `;

    el.receiptPaper.classList.remove('printing');
    void el.receiptPaper.offsetWidth; // trigger reflow
    el.receiptPaper.classList.add('printing');
  }

  function openReceiptModal() {
    const txn = state.lastTransaction || {
      id: "TXN0001",
      time: new Date().toLocaleString(),
      type: "Transaction Record",
      amount: state.balance,
      balance: state.balance
    };

    el.modalReceiptBody.innerHTML = `
      <div class="receipt-row"><span>TERMINAL:</span><span>#ATM-ND-088</span></div>
      <div class="receipt-row"><span>TRANSACTION ID:</span><span>${txn.id}</span></div>
      <div class="receipt-row"><span>TIMESTAMP:</span><span>${txn.time}</span></div>
      <div class="receipt-row"><span>CARD NUMBER:</span><span>${state.cardNumber}</span></div>
      <div class="receipt-row"><span>CARDHOLDER:</span><span>${state.cardHolder}</span></div>
      <div class="receipt-divider"></div>
      <div class="receipt-row"><span>TRANSACTION TYPE:</span><span>${txn.type}</span></div>
      <div class="receipt-row"><span>AMOUNT:</span><span>Rs. ${txn.amount.toFixed(2)}</span></div>
      <div class="receipt-divider"></div>
      <div class="receipt-row" style="font-weight: bold; font-size: 0.95rem;">
        <span>AVAILABLE BALANCE:</span><span>Rs. ${state.balance.toFixed(2)}</span>
      </div>
      <div class="receipt-divider"></div>
      <div style="text-align: center; font-size: 0.7rem; color: #64748b; margin-top: 6px;">
        Thank you for banking with Aparna State Bank.<br>
        System designed with C++ OOP & SOLID Principles.
      </div>
    `;
    el.receiptModal.classList.add('active');
  }

  // --- MINI STATEMENT RENDERING ---
  function renderStatement() {
    if (!el.statementList) return;
    el.statementList.innerHTML = '';

    const recent = state.transactionLogs.slice(-10).reverse();
    recent.forEach(log => {
      const row = document.createElement('div');
      let typeClass = 'inquiry';
      if (log.includes('Deposit')) typeClass = 'credit';
      if (log.includes('Withdrawal')) typeClass = 'debit';
      row.className = `statement-row ${typeClass}`;

      // Clean string
      row.textContent = log;
      el.statementList.appendChild(row);
    });
  }

  // --- HARDWARE BEZEL BUTTONS (F1-F8) BINDINGS ---
  function setupBezelButtons() {
    const triggerF = (btnId) => {
      AudioEngine.beep();
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 120);
      }
      handleBezelAction(btnId);
    };

    for (let i = 1; i <= 8; i++) {
      const btn = document.getElementById(`btn-f${i}`);
      if (btn) {
        btn.addEventListener('click', () => triggerF(`btn-f${i}`));
      }
    }
  }

  function handleBezelAction(btnId) {
    const s = state.currentScreen;

    if (s === 'menu') {
      if (btnId === 'btn-f1') showScreen('balance');
      else if (btnId === 'btn-f2') showScreen('withdraw');
      else if (btnId === 'btn-f3') showScreen('statement');
      else if (btnId === 'btn-f5') showScreen('deposit');
      else if (btnId === 'btn-f6') showScreen('changepin');
      else if (btnId === 'btn-f8') ejectCard();
    } else if (s === 'balance') {
      if (btnId === 'btn-f4') printReceipt();
      else if (btnId === 'btn-f8') showScreen('menu');
    } else if (s === 'withdraw') {
      if (btnId === 'btn-f1') executeWithdrawal(100);
      else if (btnId === 'btn-f2') executeWithdrawal(200);
      else if (btnId === 'btn-f3') executeWithdrawal(500);
      else if (btnId === 'btn-f5') executeWithdrawal(1000);
      else if (btnId === 'btn-f6') executeWithdrawal(2000);
      else if (btnId === 'btn-f7') {
        const val = parseFloat(el.withdrawInput.value);
        executeWithdrawal(val);
      } else if (btnId === 'btn-f8') showScreen('menu');
    } else if (s === 'deposit') {
      if (btnId === 'btn-f1') executeDeposit(100);
      else if (btnId === 'btn-f2') executeDeposit(500);
      else if (btnId === 'btn-f3') executeDeposit(1000);
      else if (btnId === 'btn-f7') {
        const val = parseFloat(el.depositInput.value);
        executeDeposit(val);
      } else if (btnId === 'btn-f8') showScreen('menu');
    } else if (s === 'statement') {
      if (btnId === 'btn-f4') printReceipt();
      else if (btnId === 'btn-f8') showScreen('menu');
    } else if (s === 'changepin') {
      if (btnId === 'btn-f7') handleChangePinFlow('ENTER');
      else if (btnId === 'btn-f8') showScreen('menu');
    } else if (s === 'success') {
      if (btnId === 'btn-f4') printReceipt();
      else if (btnId === 'btn-f8') showScreen('menu');
    } else if (s === 'locked') {
      if (btnId === 'btn-f8') ejectCard();
    }
  }

  // --- HARDWARE KEYPAD LOGIC & KEYBOARD SHORTCUTS ---
  function setupKeypad() {
    // Numeric and func buttons
    document.querySelectorAll('.key').forEach(key => {
      key.addEventListener('click', () => {
        const keyVal = key.dataset.key;
        handleKeypress(keyVal);
        key.classList.add('pressed');
        setTimeout(() => key.classList.remove('pressed'), 100);
      });
    });

    // Physical Keyboard listener
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in regular input (unless on ATM screen)
      if (e.key >= '0' && e.key <= '9') {
        handleKeypress(e.key);
      } else if (e.key === 'Enter') {
        handleKeypress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeypress('BACK');
      } else if (e.key === 'Escape') {
        handleKeypress('CANCEL');
      }
    });
  }

  function handleKeypress(val) {
    const s = state.currentScreen;

    if (val === 'CANCEL') {
      AudioEngine.beep();
      if (s === 'welcome') return;
      if (s === 'menu' || s === 'locked') {
        ejectCard();
      } else {
        showScreen('menu');
      }
      return;
    }

    if (val === 'CLEAR') {
      AudioEngine.keyClick();
      if (s === 'pin' || s === 'changepin') {
        state.pinBuffer = "";
        renderPinDots();
      } else if (s === 'withdraw' && el.withdrawInput) {
        el.withdrawInput.value = "";
      } else if (s === 'deposit' && el.depositInput) {
        el.depositInput.value = "";
      }
      return;
    }

    if (val === 'BACK') {
      AudioEngine.keyClick();
      if (s === 'pin' || s === 'changepin') {
        state.pinBuffer = state.pinBuffer.slice(0, -1);
        renderPinDots();
      } else if (s === 'withdraw' && el.withdrawInput) {
        el.withdrawInput.value = el.withdrawInput.value.slice(0, -1);
      } else if (s === 'deposit' && el.depositInput) {
        el.depositInput.value = el.depositInput.value.slice(0, -1);
      }
      return;
    }

    if (s === 'pin') {
      if (val === 'ENTER') {
        verifyEnteredPin();
      } else if (val >= '0' && val <= '9') {
        handlePinInput(val);
      }
    } else if (s === 'changepin') {
      handleChangePinFlow(val);
    } else if (s === 'withdraw') {
      if (val === 'ENTER') {
        executeWithdrawal(parseFloat(el.withdrawInput.value));
      } else if ((val >= '0' && val <= '9') || val === '00') {
        AudioEngine.keyClick();
        el.withdrawInput.value += val;
      }
    } else if (s === 'deposit') {
      if (val === 'ENTER') {
        executeDeposit(parseFloat(el.depositInput.value));
      } else if ((val >= '0' && val <= '9') || val === '00') {
        AudioEngine.keyClick();
        el.depositInput.value += val;
      }
    }
  }

  // --- GENERAL EVENT LISTENERS ---
  function setupEventListeners() {
    // Card insert / eject clicks
    if (el.debitCard) {
      el.debitCard.addEventListener('click', () => {
        if (!state.isCardInserted) insertCard();
        else ejectCard();
      });
    }
    if (el.cardActionBtn) {
      el.cardActionBtn.addEventListener('click', () => {
        if (!state.isCardInserted) insertCard();
        else ejectCard();
      });
    }

    // Touchscreen / on-screen menu clicks
    document.querySelectorAll('[data-action]').forEach(item => {
      item.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        AudioEngine.beep();
        if (action === 'balance') showScreen('balance');
        else if (action === 'withdraw') showScreen('withdraw');
        else if (action === 'deposit') showScreen('deposit');
        else if (action === 'statement') showScreen('statement');
        else if (action === 'changepin') showScreen('changepin');
        else if (action === 'eject') ejectCard();
        else if (action === 'menu') showScreen('menu');
        else if (action === 'receipt') printReceipt();
      });
    });

    // Preset amount buttons
    document.querySelectorAll('[data-amount]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const amt = parseFloat(e.currentTarget.dataset.amount);
        AudioEngine.keyClick();
        if (state.currentScreen === 'withdraw') {
          el.withdrawInput.value = amt;
          executeWithdrawal(amt);
        } else if (state.currentScreen === 'deposit') {
          el.depositInput.value = amt;
          executeDeposit(amt);
        }
      });
    });

    // Collect cash button
    if (el.collectCashBtn) {
      el.collectCashBtn.addEventListener('click', collectCash);
    }
    if (el.cashTray) {
      el.cashTray.addEventListener('click', collectCash);
    }

    // Receipt Paper click -> opens modal
    if (el.receiptPaper) {
      el.receiptPaper.addEventListener('click', openReceiptModal);
    }

    // Receipt Modal Close
    if (el.receiptModal) {
      el.receiptModal.addEventListener('click', (e) => {
        if (e.target === el.receiptModal) el.receiptModal.classList.remove('active');
      });
      document.getElementById('btn-close-receipt-modal')?.addEventListener('click', () => {
        el.receiptModal.classList.remove('active');
      });
      document.getElementById('btn-print-receipt-modal')?.addEventListener('click', () => {
        window.print();
      });
    }

    // Theme Switcher Toggle (Pink Edition 🎀 <-> Midnight Edition 🏦)
    if (el.themeToggleBtn) {
      el.themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('theme-midnight');
        const isMidnight = document.body.classList.contains('theme-midnight');
        el.themeToggleBtn.innerHTML = isMidnight ? '🏦 Midnight Mode' : '🎀 Pink Mode';
        AudioEngine.keyClick();
      });
    }

    // Audio Mute Toggle
    if (el.audioToggleBtn) {
      el.audioToggleBtn.addEventListener('click', () => {
        state.audioEnabled = !state.audioEnabled;
        el.audioToggleBtn.innerHTML = state.audioEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
      });
    }

    // Dev Drawer Toggle
    if (el.drawerToggleBtn) {
      el.drawerToggleBtn.addEventListener('click', () => {
        el.devDrawer.classList.toggle('open');
      });
    }
    if (el.drawerCloseBtn) {
      el.drawerCloseBtn.addEventListener('click', () => {
        el.devDrawer.classList.remove('open');
      });
    }

    // Test Quick Scenarios in Dev Drawer
    document.getElementById('btn-test-wrong-pin')?.addEventListener('click', () => {
      AudioEngine.beep();
      state.isCardInserted = true;
      el.debitCard.classList.add('inserted');
      state.failedAttempts = 3;
      state.isLocked = true;
      saveLocalState();
      showScreen('locked');
      updateUI();
    });

    document.getElementById('btn-test-overdraft')?.addEventListener('click', () => {
      if (!state.isCardInserted) insertCard();
      showScreen('withdraw');
      el.withdrawInput.value = "20000";
      executeWithdrawal(20000);
    });

    document.getElementById('btn-test-deposit-500')?.addEventListener('click', () => {
      if (!state.isCardInserted) insertCard();
      executeDeposit(500);
    });

    document.getElementById('btn-test-reset-all')?.addEventListener('click', () => {
      if (confirm("Reset account to default Rs. 150.00 and PIN: 1234?")) {
        state.balance = 150.00;
        state.pin = "1234";
        state.failedAttempts = 0;
        state.isLocked = false;
        saveLocalState();
        ejectCard();
        updateUI();
        alert("Account reset to default state!");
      }
    });

    document.getElementById('btn-export-logs')?.addEventListener('click', () => {
      const blob = new Blob([state.transactionLogs.join('\n')], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `atm_transactions_${Date.now()}.log`;
      a.click();
    });
  }

  // --- UI REFRESH HELPER ---
  function updateUI() {
    if (el.stateBalance) el.stateBalance.textContent = `Rs. ${state.balance.toFixed(2)}`;
    if (el.stateAttempts) {
      el.stateAttempts.textContent = `${state.failedAttempts} / ${state.maxAttempts}`;
      el.stateAttempts.className = `state-val ${state.failedAttempts > 0 ? 'danger' : ''}`;
    }
    if (el.stateCard) {
      if (state.isLocked) {
        el.stateCard.textContent = "🔒 LOCKED";
        el.stateCard.className = "state-val danger";
      } else if (state.isCardInserted) {
        el.stateCard.textContent = "💳 Inserted";
        el.stateCard.className = "state-val highlight";
      } else {
        el.stateCard.textContent = "Ejected";
        el.stateCard.className = "state-val";
      }
    }
    renderAuditStream();
  }

  function showAlert(alertEl, msg, type) {
    if (!alertEl) return;
    alertEl.textContent = msg;
    alertEl.className = `screen-alert ${type}`;
    alertEl.style.display = 'block';
  }

  function hideAlert(alertEl) {
    if (alertEl) alertEl.style.display = 'none';
  }

  // Start on window load
  window.addEventListener('DOMContentLoaded', init);
})();

