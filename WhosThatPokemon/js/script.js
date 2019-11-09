

loadData().then(pokemon => {

    let callbacks = new Callbacks();
    let pokedex = new Pokedex(pokemon, callbacks);
    let matchupview = new Matchups(pokemon);
    let mapview = new MapView();

    console.log(pokemon);
    console.log(pokedex);

});


async function loadData() {
    let pokemon = await loadFile("data/pokemon_data/pokemon.csv");
    return pokemon
}

async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

class Callbacks{
    constructor() {
    }

}