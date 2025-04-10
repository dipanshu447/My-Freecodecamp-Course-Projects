var intToRoman = function (num) {
    const intToRomanMap = [
        { intVal: 1000, romanVal: 'M' },
        { intVal: 900, romanVal: 'CM' },
        { intVal: 500, romanVal: 'D' },
        { intVal: 400, romanVal: 'CD' },
        { intVal: 100, romanVal: 'C' },
        { intVal: 90, romanVal: 'XC' },
        { intVal: 50, romanVal: 'L' },
        { intVal: 40, romanVal: 'XL' },
        { intVal: 10, romanVal: 'X' },
        { intVal: 9, romanVal: 'IX' },
        { intVal: 5, romanVal: 'V' },
        { intVal: 4, romanVal: 'IV' },
        { intVal: 1, romanVal: 'I' }
    ];

    var res = '';
    for (const { intVal, romanVal } of intToRomanMap) {
        while (num >= intVal) {
            res += romanVal;
            num -= intVal;
        }
    }
    return res;
};
let input = document.querySelector('input');
let result = document.querySelector('#output');
let checkBtn = document.querySelector('button');
let err = document.querySelector('.error');

checkBtn.addEventListener('click', () => {
    let userinput = parseInt(input.value);
    if(userinput <= 0){
        result.classList.add('error');
        result.textContent = "Please enter a number greater than or equal to 1.";
        result.classList.remove('hidden');
        result.classList.remove('result');
    }
    else if (userinput > 0 && userinput <= 3999) {
        result.classList.add('result');
        result.textContent = intToRoman(userinput);
        result.classList.remove('hidden');
    }else if(userinput > 3999){
        result.classList.add('error');
        result.textContent = "Please enter a number less than or equal to 3999.";
        result.classList.remove('hidden');
        result.classList.remove('result');
    }else if(isNaN(userinput)){
        result.classList.add('error');
        result.textContent = "Please enter a valid number.";
        result.classList.remove('hidden');
        result.classList.remove('result');
    }
})