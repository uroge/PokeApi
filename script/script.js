const pokeContainer = document.querySelector('.poke-container'); 
const pokeName = document.getElementById('poke-name');
const pokeId = document.getElementById('poke-id');
const pokeHeight = document.getElementById('poke-height');
const pokeWeight = document.getElementById('poke-weight');
const pokeAbilities = document.getElementById('poke-abilities');


// const pokemons = [];

const pokemons_number = 150;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	// pokemons.push(pokemon);
	console.log(pokemon);
    renderImages(pokemon);
};


const renderImages = (pokemon) => {
    const pokeImage = document.createElement('div');
    pokeImage.classList.add('img-placeholder');
    pokeImage.classList.add('my-2');

    pokeImage.innerHTML = `<a href="#" id="poke"><img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon}" class="img"/></a>`;

    const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	// const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];

    pokeImage.style.backgroundColor = color;
    pokeContainer.append(pokeImage);
		
    pokeImage.addEventListener('click', () => {
		pokeName.textContent = pokemon.name;
		pokeId.textContent = pokemon.id;
		pokeHeight.textContent = pokemon.height;
		pokeWeight.textContent = pokemon.weight;

		try {
			if(pokemon.abilities.length < 3) {
				pokeAbilities.innerHTML = `${pokemon.abilities[0].ability.name}, ${pokemon.abilities[1].ability.name}`;
			}else {
				pokeAbilities.innerHTML = `${pokemon.abilities[0].ability.name}, ${pokemon.abilities[1].ability.name}, ${pokemon.abilities[2].ability.name}`;
			}
		}catch(error) {
			throw new Error('This pokemon does not have ability');
		}
		
		const img = document.querySelector('.img-ph');
		img.innerHTML =  `<img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon}" class="img"/>`;
	});
}

fetchPokemons();