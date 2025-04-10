function checkPalindrome(text) {
    let pure = text.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    return pure.split('').reverse().join('') === pure;
}
let input = document.querySelector('input');
let checkBtn = document.querySelector('button');
let result = document.querySelector('#result');

checkBtn.addEventListener('click', () => {
    if (input.value === '') {
        alert('Please input a value');
        return;
    }
    if (checkPalindrome(input.value)) {
        result.textContent = `${input.value} is a palindrome.`
        result.classList.remove('hidden');
        input.value = "";
    } else {
        result.textContent = `${input.value} is not a palindrome.`
        result.classList.remove('hidden');
        input.value = "";
    }
})