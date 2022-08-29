'use strict';


let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
let allStores = [];

let TableHeader = function() {
  let storeTable = document.getElementById('store-table');

  let thead = document.createElement('thead');
  storeTable.appendChild(thead);

  let tr = document.createElement('tr');
  thead.appendChild(tr);

  let th = document.createElement('th');
  th.textContent = 'Store Hours';
  tr.appendChild(th);

  for (let i=0; i < hours.length; i++) {
    let td = document.createElement('td');
    td.textContent = hours[i];
    tr.appendChild(td);
  }
  let td = document.createElement('td');
  td.textContent = 'Daily Store Total';
  tr.appendChild(td);
};

let TableFooter = function() {
  let storeTable = document.getElementById('store-table');

  let tfoot = document.createElement('tfoot');
  storeTable.appendChild(tfoot);

  let tr = document.createElement('tr');
  tfoot.appendChild(tr);

  let th = document.createElement('th');
  th.textContent = 'Hourly Grand Totals';
  tr.appendChild(th);

  for (let i=0; i < hours.length; i++) {
    let td = document.createElement('td');
    td.textContent = '#';
    tr.appendChild(td);
  }
  let td = document.createElement('td');
  td.textContent = '#';
  tr.appendChild(td);
};

function Store (name, minHourlyCustomer, maxHourlyCustomer, avgCookiesSoldPerCustomer) {
  this.name = name;
  this.minHourlyCustomer = minHourlyCustomer;
  this.maxHourlyCustomer = maxHourlyCustomer;
  this.avgCookiesSoldPerCustomer = avgCookiesSoldPerCustomer;
  this.cookiesSoldHourlyArray = [];
  this.dailyStoreTotal = 0;
  allStores.push(this);
}

let seattleStore = new Store ('Seattle', 27, 55, 6.8);
let tokyoStore = new Store ('Tokyo', 5, 22, 1.4);
let dubaiStore = new Store ('Dubai', 9, 32, 3.4);
let parisStore = new Store ('Paris', 16, 36, 2.3);
let limaStore = new Store ('Lima', 4, 18, 3.2);

Store.prototype.randomCustomersHourly = function () {
  return Math.floor(Math.random() * (this.maxHourlyCustomer - this.minHourlyCustomer + 1) + this.minHourlyCustomer);
};

Store.prototype.calcCookiesSoldEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    let currentHourCustomers = this.randomCustomersHourly();
    let cookiesSoldCurrentHour = Math.ceil(currentHourCustomers * this.avgCookiesSoldPerCustomer);
    this.cookiesSoldHourlyArray.push(cookiesSoldCurrentHour);
    this.dailyStoreTotal += cookiesSoldCurrentHour;
  }
};

Store.prototype.render = function () {
  this.calcCookiesSoldEachHour();

  let storeTable = document.getElementById('store-table');

  let tbody = document.createElement('tbody');
  storeTable.appendChild(tbody);

  let tr = document.createElement('tr');
  tbody.appendChild(tr);

  let th = document.createElement('th');
  th.textContent = this.name;
  tr.appendChild(th);

  for (let i=0; i < hours.length; i++) {
    let td = document.createElement('td');
    td.textContent = this.cookiesSoldHourlyArray[i];
    tr.appendChild(td);
  }
  let td = document.createElement('td');
  td.textContent = this.dailyStoreTotal;
  tr.appendChild(td);
};

TableHeader();
TableFooter();

seattleStore.render();
tokyoStore.render();
dubaiStore.render();
parisStore.render();
limaStore.render();