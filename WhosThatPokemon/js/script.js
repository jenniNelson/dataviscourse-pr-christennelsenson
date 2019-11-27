

loadData().then(poke_dict => {

    console.log(poke_dict)

    let callbacks = new Callbacks();
    let pokedex = new Pokedex(poke_dict, callbacks);
    let matchupview = new Matchups(poke_dict);
    let mapview = new MapView(poke_dict);

    console.log(pokedex);


});


async function loadData() {
    let raw_pokemon = await loadFile("data/pokemon_data/main_collection.csv");

    let pokemon_dict = {};

    for (let mon of raw_pokemon) {
        pokemon_dict[mon.long_id] = new Pokemon(mon)
    }


//     locs = locs.reduce((accum_obj, item) => {
//         let loc_string = item.locations
//
//         let locs = loc_string.replace(/\]/g,"")
//                 .replace(/\[/g,"")
//                 .replace(/\'/g, "")
//                 .trim()
//                 .split(",");
//         // console.log(locs)
//         item.locations = locs.map( x => {
//             x = x.trim();
//             // console.log(x)
//             if (x.length > 0){
//                 let [game,map,place] = x.split('/')
//                 return {
//                     game: game,
//                     map: map,
//                     place: place,
//                     place_id : place.replace(' ', '_').replace('.', '')
//                 };
//             } else{
//                 return undefined;
//             }
//
// //                                                                []=> ''.split
//         }).filter(x => x !== undefined);
//
//         accum_obj[item.id] = item;
//
//         return accum_obj
//     }, {} );
//     return [pokemon, locs]
    return pokemon_dict
}

async function loadFile(file) {
    let data = await d3.csv(file);
    // .then(d => {
    //     let mapped = d.map(g => {
    //         for (let key in g) {
    //             let numKey = +key;
    //             if (numKey) {
    //                 g[key] = +g[key];
    //             }
    //         }
    //         return g;
    //     });
    //     return mapped;
    // });
    return data;
}

class Callbacks{
    constructor() {
    }

}

class Pokemon{
    constructor(csv_result) {
        this.name = csv_result.name;
        this.long_id = csv_result.long_id;

        this.stat_total = +csv_result.stat_total;  //ints for stats
        this.hp = +csv_result.hp;
        this.attack = +csv_result.attack;
        this.defense = +csv_result.defense;
        this.sp_attack = +csv_result.sp_attack;
        this.sp_defense = +csv_result.sp_defense;
        this.speed = +csv_result.speed;

        this.type1 = csv_result.type1; //strings
        this.type2 = csv_result.type2;

        this.ev_from = csv_result.ev_from; //string (long_id)
        this.ev_to = string_to_list(csv_result.ev_to);  //list (long_ids)(may be empty)
        this.is_base = csv_result.is_base; //booleans
        this.is_full_ev = csv_result.is_full_ev;
        this.evo_family = string_to_list(csv_result.evo_family); //list of long ids

        this.capture_rate = csv_result.capture_rate;
        this.gen_introduced = csv_result.gen_introduced; //number
        this.is_legendary = csv_result.is_legendary; //boolean
        this.height_m = csv_result.height_m;
        this.weight_kg = csv_result.weight_kg;

        let raw_locs = string_to_list(csv_result.locations);

        this.locations = raw_locs.map( loc_string => {
            let [game,map,place] = loc_string.split('/')
                return {
                    game: game,
                    map: map,
                    place: place,
                    place_id : place.replace(' ', '_').replace('.', '')
                };
        }); //list of location strings
    }
}

function string_to_list(str) {

    let elements = str.replace(/[\]\[']/g,"")
            // .replace(/\[/g,"")
            // .replace(/\'/g, "")
            .trim()
            .split(",");



    return elements.map(d => d.trim()).filter(d => d.length !== 0 )
}