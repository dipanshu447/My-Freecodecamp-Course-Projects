let price = 3.26;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];
let cash = document.querySelector('input');
const purchaseBtn = document.querySelector('.customer-purcase button');
let CashregisterPrice = document.querySelector('.top-display p');
let changeDueResult = document.querySelector('#change-due');
let drawerChangeArr = Array.from(document.querySelectorAll('.draw-changes'));

function updateCid(cid) {
    let updateUiCid = [
        ['PENNY', 'Pennies'],
        ['NICKEL', 'Nickels'],
        ['DIME', 'Dimes'],
        ['QUARTER', 'Quarters'],
        ['ONE', 'Ones'],
        ['FIVE', 'Fives'],
        ['TEN', 'Tens'],
        ['TWENTY', 'Twenties'],
        ['ONE HUNDRED', 'Hundreds']
    ];
    let i = 0;
    for (const p of drawerChangeArr) {
        if (updateUiCid[i][0] == cid[i][0]) {
            p.innerHTML = `${updateUiCid[i][1]}: $${cid[i][1]}`;
            i++;
        }
    }
}

function getChange(price, cash, cid) {
    const totalCid = parseFloat((cid.reduce((sum, curr) => sum + curr[1], 0)).toFixed(2));
    let changeDue = parseFloat((cash - price).toFixed(2));

    if (totalCid < changeDue) {
        return {
            status: "INSUFFICIENT_FUNDS",
            change: [],
            newCid: cid
        };
    }

    if (totalCid == changeDue) {
        return {
            status: "CLOSED",
            change: cid.filter(([_, amount]) => amount > 0).reverse(),
            newCid: cid.map(([unit, _]) => [unit, 0])
        };
    }

    const currencyUnit = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    };
    let reversecid = [...cid].reverse();
    let changeArray = [];
    let amoundUpdateCid = [...cid].reverse().map(arr => [...arr]);

    for (let i = 0; i < reversecid.length; i++) {
        let [unit, totalAmount] = reversecid[i];
        let unitValue = currencyUnit[unit];
        let amountToreturn = 0;

        while (changeDue >= unitValue && totalAmount >= unitValue) {
            changeDue = parseFloat((changeDue - unitValue).toFixed(2));
            totalAmount = parseFloat((totalAmount - unitValue).toFixed(2));
            amountToreturn = parseFloat((amountToreturn + unitValue).toFixed(2));
        }

        if (amountToreturn > 0) {
            changeArray.push([unit, amountToreturn]);
            amoundUpdateCid[i][1] = totalAmount;
        }
    }

    if (changeDue > 0) {
        return {
            status: "INSUFFICIENT_FUNDS",
            change: [],
            newCid: cid
        };
    }   
    let finalCid = amoundUpdateCid.slice().reverse();

    return {
        status: "OPEN",
        change: changeArray,
        newCid: finalCid
    }
}

function UpdatechangeDueResult(status,currentarr) {
    changeDueResult.innerHTML = '';
    changeDueResult.insertAdjacentHTML("afterbegin",`<p>Status: ${status}<p>`);
    for (const changearr of currentarr) {
        console.log(changearr);
        let p = document.createElement('p');
        p.innerText = `${changearr[0]}: $${changearr[1]}`;
        changeDueResult.appendChild(p);
    }
    changeDueResult.setAttribute('style','margin-bottom:10px;');
}

CashregisterPrice.textContent = `Total: $${price}`;

purchaseBtn.addEventListener('click', () => {
    let usercash = parseFloat(cash.value);
    cash.value = '';
    if (usercash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (usercash == price) {
        changeDueResult.innerHTML = '';
        let p = document.createElement('p');
        p.innerText = 'No change due - customer paid with exact cash';
        changeDueResult.appendChild(p);
    } else {
        let resultchange = getChange(price, usercash, cid);
        cid = resultchange.newCid;
        updateCid(resultchange.newCid);
        UpdatechangeDueResult(resultchange.status,resultchange.change);
    }
})  