

loadData().then(data => {
    let [pokemon, locs] = data;

    console.log(pokemon);
    console.log(locs);
    let callbacks = new Callbacks();
    let pokedex = new Pokedex(pokemon, callbacks);
    let matchupview = new Matchups(pokemon);
    let mapview = new MapView(locs);

    console.log(pokedex);

});


async function loadData() {
    let pokemon = await loadFile("data/pokemon_data/pokemon.csv");
    let locs = await loadFile("data/pokemon_data/locations.csv")

    locs = locs.reduce((accum_obj, item) => {
        let loc_string = item.locations

        let locs = loc_string.replace(/\]/g,"")
                .replace(/\[/g,"")
                .replace(/\'/g, "")
                .trim()
                .split(",");
        // console.log(locs)
        item.locations = locs.map( x => {
            x = x.trim();
            // console.log(x)
            if (x.length > 0){
                let [game,map,place] = x.split('/')
                return {
                    game: game,
                    map: map,
                    place: place,
                    place_id : place.replace(' ', '_').replace('.', '')
                };
            } else{
                return undefined;
            }


        }).filter(x => x !== undefined);

        accum_obj[item.id] = item;

        return accum_obj
    }, {} );
    return [pokemon, locs]
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