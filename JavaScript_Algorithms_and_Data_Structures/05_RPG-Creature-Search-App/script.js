const userinput = document.querySelector('input');
const search = document.querySelector('button');
const hp = document.querySelector('#hp');
const attack = document.querySelector('#attack');
const defense = document.querySelector('#defense');
const specialattack = document.querySelector('#special-attack');
const specialdefense = document.querySelector('#special-defense');
const speed = document.querySelector('#speed');
const creaturename = document.querySelector('#creature-name');
const creatureid = document.querySelector('#creature-id');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const types = document.querySelector('#types');
const specialname = document.querySelector('#specialname');
const specialdescription = document.querySelector('#specialdescription');

async function getCreature(userInput) {
    let url = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${userInput}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        creaturename.innerHTML = data.name;
    creatureid.innerHTML = data.id;
    weight.innerHTML = `Weight: ${data.weight}`;
    height.innerHTML = `Height: ${data.height}`;
    specialname.innerHTML = data.special.name;
    specialdescription.innerHTML = data.special.description;
    hp.innerHTML = data.stats[0].base_stat;
    attack.innerHTML = data.stats[1].base_stat;
    defense.innerHTML = data.stats[2].base_stat;
    specialattack.innerHTML = data.stats[3].base_stat;
    specialdefense.innerHTML = data.stats[4].base_stat;
    speed.innerHTML = data.stats[5].base_stat;

    types.innerHTML = `Types: ${data.types.map(obj => `<span class="type ${obj.name}">${obj.name}</span>`).join(', ')}`;
    } catch (error) {
        alert("Creature not found");
        resetUi();
        console.log(error);
    }
}

const resetUi = () => {
    creaturename.innerHTML = '';
    creatureid.innerHTML = '';
    weight.innerHTML = '';
    height.innerHTML = '';
    types.innerHTML = '';
    specialname.innerHTML = '';
    specialdescription.innerHTML = '';
    hp.innerHTML = '';
    attack.innerHTML = '';
    defense.innerHTML = '';
    specialattack.innerHTML = '';
    specialdefense.innerHTML = '';
    speed.innerHTML = '';
}

search.addEventListener('click', () => {
    getCreature(userinput.value);
    userinput.value = '';
})