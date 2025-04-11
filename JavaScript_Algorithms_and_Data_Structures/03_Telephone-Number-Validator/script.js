let res = document.querySelector('#results-div');
let clear = document.querySelector('#clear-btn');
let userInput = document.querySelector('input');
let check = document.querySelector('#check-btn');

function result(status,number) {
    let result_text = document.createElement('p');
    result_text.className = 'result-text';
    if(status) {    
        result_text.textContent = `Valid US number: ${number}`;
        result_text.style = 'color:rgb(0, 71, 27)';
        res.appendChild(result_text);
    }else {
        result_text.textContent = `Invalid US number: ${number}`;
        result_text.style = 'color:rgb(77, 56, 0)';
        res.appendChild(result_text);
    }
}

clear.addEventListener('click', () => res.innerHTML = '');

check.addEventListener('click', () => {
    if(userInput.value == ''){
        alert('Please provide a phone number');
        return;
    }else {
        result(checkUSNum(userInput.value),userInput.value);
        userInput.value = '';
    }
})

function checkUSNum(num) {
    let pattern = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    return pattern.test(num);
}