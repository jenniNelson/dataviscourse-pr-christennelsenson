// class DefaultDict {
//   constructor(defaultVal) {
//     return new Proxy({}, {
//       get: (target, name) => name in target ? target[name] : defaultVal
//     })
//   }
// }


function long_id_from_id(id){
    let long_id = "000" + id;
    return long_id.substr(long_id.length - 3);
}

class DataLoader {

    constructor(poke_dict, card_manager) {
        let that = this;
        let uploader = document.getElementById("file_selector")
            .addEventListener("change", ev => this.read_new_log(ev.target.files[0]));
        this.poke_dict = poke_dict;
        this.card_manager = card_manager;

    }

    read_new_log(file) {
        console.log("###########I'm Here!#############");
        console.log(file);

        // this.poke_dict["002"].attack = 200;

        this.parse_log(file);

        console.log(this.poke_dict);

    }

    parse_log(file) {
        let that = this;
        var reader = new FileReader();
        reader.onload = function(progressEvent){

            let stats_re = /(?<id>\d{1,3})\|\s*?(?<name>[A-Z]*?)\s*?\|\s*?(?<type1>[A-Z]*?)(?:\s*?\/\s*?(?<type2>[A-Z]*?))?\s*?\|\s*?(?<hp>\d*?)\s*?\|\s*?(?<atk>\d*?)\s*?\|\s*?(?<def>\d*?)\s*?\|\s*?(?<spe>\d*?)\s*?\|\s*?(?<satk>\d*?)\s*?\|\s*?(?<sdef>\d*?)\s*?\|\s*?(?<ability1>.*?)\s*?\|\s*?(?<ability2>.*?)\s*?\|\s*?(?<item>.*?)\n/;
            let evolves_re = /(?<from>[A-Z]*?) now evolves into (?<togroup>[A-Z, \d:]*)(?:and (?<lastto>[A-Z, \d:]*))?/;

            let soulsilver_locs = 'Route \d\d?|New Bark Town|Cherrygrove City|Violet City|Sprout Tower|Ruins of Alph|Union Cave|SLOWPOKE|Ilex Forest|National Park|Ecruteak City|Burned Tower|Bell Tower|Olivine City|Whirl Islands|Cianwood City|Mt\. Mortar|Ice Path|Blackthorn City|Dragon’s Den|Dark Cave|Seafoam Islands|Mt\. Silver Cave|Cliff Edge Gat|Cliff Cave|Bell Tower|Mt\. Silver|Safari Zone|Pallet Town|Viridian City|Cerulean City|Vermilion City|Celadon City|Fuchsia City|Cinnabar Island|Mt\. Moon|Rock Tunnel|Victory Road|Tohjo Falls|DIGLETT’s Cave|Victory Road|Viridian Forest|Cerulean Cave|Bug Catching Contest'

            let loc_strings = [soulsilver_locs];
            let all_locs = loc_strings.map((loc_str) => `(?:${loc_str})`).join('|');
            let loc_re = new RegExp("Set #(?<num>\d{1,3}) - (?<place>"+ all_locs + ") (?<method>.*?) \(rate=(?<rate>\d\d?)\) - (?<allmon>.*)");

            let mode = "blankspace";
            let lines = this.result.split(/\r?\n/);
            for(let i = 0; i < lines.length; i++){
                let line = lines[i];
                // console.log(line == "--Pokemon Base Stats & Types--" || line =="--Pokemon Base Stats & Types--\n");
                if (line === "--Pokemon Base Stats & Types--") {
                    mode = "stats";
                    continue;
                }
                else if (line === "--Randomized Evolutions--") {
                    mode = "evolutions";
                    continue;
                }
                else if (line === "--Wild Pokemon--") {
                    mode = "locations";
                    continue;
                }
                // else if (line === "Move Data: Unchanged."){
                //     moves = None
                // }
                // else if (line === "Pokemon Movesets: Unchanged."){}
                else if (line === "") {
                    mode = "blankspace";
                    continue;
                }


                if (mode === "blankspace"){
                    continue;
                }

                else if (mode === "stats") {
                    console.log(line);
                    let match = stats_re.exec(line);
                    if (match) {
                        let pokemon = that.add_rando_stats_to_pokemon_from_match(match);
                        // pokedex[pokemon.name] = pokemon;
                    }
                }

                else if (mode === "evolutions"){
                    let match = evolves_re.exec(line);
                    if (match){
                        let links = that.make_evolution_links_from_re_match(match);
                        // for (let link in links){
                        //     evolutions[link[0]].append(link[1]);
                        // }
                    }
                }

                // else if (mode === "locations"){
                //     let match = loc_re.exec(line);
                //     if (match){
                //         location = get_location_from_match(match);
                //         locations[location.name].append(location);
                //     }
                // }


            }
        };
        reader.readAsText(file);

    }


    add_rando_stats_to_pokemon_from_match(match) {
        let poke = this.poke_dict[long_id_from_id(match.groups.id)];
        console.log(long_id_from_id(match.groups.id), poke);

        poke.rand_type1 = match.groups['type1'];
        poke.rand_type2 = match.groups['type2'];
        poke.rand_hp = parseInt(match.groups['hp']);
        poke.rand_attack = parseInt(match.groups['atk']);
        poke.rand_defense = parseInt(match.groups['def']);
        poke.rand_special = parseInt(match.groups['spe']);
        poke.rand_sp_attack = parseInt(match.groups['satk']);
        poke.rand_sp_defense = parseInt(match.groups['sdef']);
        poke.rand_ability1 = match.groups['ability1'];
        poke.rand_ability2 = match.groups['ability2'];
        poke.rand_item = match.groups['item'];

        poke.rand_ev_froms = [];
        poke.is_randomized = true;

        if (poke.rand_ability2 === " -") {
            poke.rand_ability2 = null;
        }
        if (poke.rand_item === "") {
            poke.rand_item = null;
        }
    }

    make_evolution_links_from_re_match(match) {
        let start = match.groups['from'];
        let group1 = match.groups['togroup'];
        let lastto = match.groups['lastto'];
        let to = group1.split(',').map(x => x.trim());
        if (lastto) {
            to.append(lastto);
        }
        let to_ids = to.map(t => Object.values(this.poke_dict).find(x => x.name.toLowerCase() === t.toLowerCase()).long_id);


        let start_mon = Object.values(this.poke_dict).find(x => x.name.toLowerCase() === start.toLowerCase());
        start_mon.rand_ev_to = to_ids;
        for (let to_id of to_ids) {
            if (this.poke_dict[to_id].rand_ev_froms) {
                this.poke_dict[to_id].rand_ev_froms.push(start_mon.long_id);
            } else {
                this.poke_dict[to_id].rand_ev_froms = [start_mon.long_id];
            }
        }
    }





}

