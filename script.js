'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500.32, 250, -300.92, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatTransactionDate = function(date, locale){
  const getDaysBetween2Dates = (date1, date2) =>
  Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if (daysPassed === 0)return `Сегодня`;
  if (daysPassed === 1)return `Вчера`;
  if (daysPassed <= 7)return `${daysPassed} дней назад`;
  else {
  // const day = `${date.getDate()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = date.getFullYear();
      
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
  };
}

const formatCurrency = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = '';

  const transacs = sort ? account.transactions.slice().sort((x, y) => x - y) : account.transactions

  transacs.forEach(function (trans, index){
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);

    const formattedTrans = formatCurrency(trans, account.locale, account.currency);

    const transactionRow = `
      <div class="transactions__row">
        <div class="transactions__type transactions__type--${transType}">
          ${index + 1} ${transType}
        </div>
        <div class="transactions__date">${transDate}</div>
        <div class="transactions__value">${formattedTrans}</div>
      </div>
    `
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

const createNicknames = function(accs) {
  accs.forEach(function(acc) {
    acc.nickName = acc.userName
    .toLocaleLowerCase()
    .split(' ')
    .map(word => word[0])
    .join('')  
  });
};
createNicknames(accounts)

// const userName = 'Oliver Avilia'
// const nickName = userName
//   .toLocaleLowerCase()
//   .split(' ')
//   .map(word => word[0])
//   .join('')

const displayBalance = function(account) {
  const balance = account.transactions.reduce((acc, tranc) => acc + tranc, 0);
  account.balance = balance;

  labelBalance.textContent = formatCurrency(balance, account.locale, account.currency);
}

const displayTotal = function(account){
  const depositesTotal = account.transactions
  .filter(trans => trans > 0)
  .reduce((acc, trans) => acc + trans, 0)
  labelSumIn.textContent = formatCurrency(
    depositesTotal,
    account.locale,
    account.currency
  );

  const withdrawalsTotal = account.transactions
  .filter(trans => trans < 0)
  .reduce((acc, trans) => acc + trans, 0)
  labelSumOut.textContent = formatCurrency(
    withdrawalsTotal,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
  .filter(trans => trans > 0)
  .map(dep => (dep * account.interest) /100)
  .filter(interest => interest >= 5)
  .reduce((acc, interest) => acc + interest, 0)
  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
}

const updateUI = function(account) {
  // display transactions
  displayTransactions(account);

  // display balance
  displayBalance(account);

  // display total
  displayTotal(account);
}

let currentAccount, currentLogOutTimer;

// // always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const startLogoutTimer = function() {
  const logoutTimerCallback = function() {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    //показывать оставшееся время в UI
    labelTimer.textContent = `${minutes}:${seconds}`;
    //выйти из приложения
    if (time === 0) {
      clearInterval(logoutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт!';
    }
    time--;
  };
  //установить время выхода чрез 5 минут
  let time = 300;
  logoutTimerCallback();
  //вызов таймера каждую секунду
  const logoutTimer = setInterval(logoutTimerCallback, 1000);

  return logoutTimer;
};

btnLogin.addEventListener('click', function(e) {
  e.preventDefault();
  currentAccount = accounts.find(account => account.nickName == inputLoginUsername.value);

  if(currentAccount?.pin === +(inputLoginPin.value)){
    // display ui and welcome message
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Рады, что вы снова с нами, ${currentAccount.userName.split(' ')[0]}!`;
        
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // labelDate.textContent = `${day}/${month}/${year}`;
    
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //long = text
      year: 'numeric',
      weekday: 'long',
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now); 

    // clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();//перемещение курсора
    
    // check if the timer exist
    if (currentLogOutTimer) clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();

    updateUI(currentAccount);
  };
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const transferAmount = +(inputTransferAmount.value);
  const recipientNickname = inputTransferTo.value;
  const recirientAccount = accounts.find(account => account.nickName == recipientNickname);

  inputTransferTo.value = '';
  inputTransferAmount.value = '';

  if(
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount && recirientAccount && 
    currentAccount.nickName !== recirientAccount.nickName
  ) {
    currentAccount.transactions.push(-transferAmount);
    recirientAccount.transactions.push(transferAmount);

    //transaction date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recirientAccount.transactionsDates.push(new Date().toISOString());

    updateUI(currentAccount);
    
    //reset the timer
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
  };
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.nickName &&currentAccount.pin === +(inputClosePin.value)){
    const currentAccountIndex = accounts.findIndex(account => account.nickName === currentAccount.nickName);

    accounts.splice(currentAccountIndex, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Войдите в свой аккаунт!';
  };

  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);

  if (loanAmount > 0 && currentAccount.transactions.some(trans => trans >= loanAmount * 10 / 100)){
    setTimeout(function() {
    currentAccount.transactions.push(loanAmount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    }, 5000)
  };
  inputLoanAmount.value = '';
  //reset the timer
  clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
});

let transactionsSorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});

const logoImage = document.querySelector('.Logo');
logoImage.addEventListener('click', function() {
  const transactionsUI = document.querySelectorAll('.transactions__value');
  const transactionsUIArray = Array.from(transactionsUI, elem => Number(elem.textContent));

  [...document.querySelectorAll('.transactions__row')].forEach (function(row, i) {
    if(i % 2 === 0) {
      row.style.backgroundColor = 'grey';
    }
  });
});

