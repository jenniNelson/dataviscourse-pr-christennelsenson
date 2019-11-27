type_colors = {
            "fire" : ["#ff4f4a","#9b1414"],
            "water" : ["#6765ff","#3b3e9b"],
            "grass" : ["#3cd41d","#359b21"],
            "bug" : ["#23ff10","#4fb525"],
            "ground" : ["#ffae35","#9b772f"],
            "rock" : ["#ff6f40","#9b6145"],
            "steel" : ["#c0b4b6","#726a6a"],
            "fairy" : ["#ff6090","#9b1e44"],
            "dark" : ["#686766","#3e3b39"],
            "psychic" : ["#ff89c7","#9b4e90"],
            "ghost" : ["#e486ff","#8d689b"],
            "poison" : ["#bf68bb","#755671"],
            "dragon" : ["#9782ff","#71669b"],
            "ice" : ["#88fff2","#647c9b"],
            "flying" : ["#aaa5ff","#668d9b"],
            "normal" : ["#f2ffb8","#9b996d"],
            "fighting" : ["#ff9a78","#9b532f"],
            "electric" : ["#ffff56","#c8c24a"],
            "missing" : ["#242424", "#0c0c0c"]
        };

game_to_acro = {
                    "Pokémon Red" : [{game:"Pokémon Red", text: "R", id: "red"}],
                    "Pokémon Blue" : [{game:"Pokémon Blue", text: "B", id: "blue"}],
                    "Pokémon Yellow" : [{game:"Pokémon Yellow", text: "Y", id: "yellow"}],
                    "Pokémon Red (Intl.)" : [{game:"Pokémon Red (Intl.)", text: "R", id: "red"}],
                    "Pokémon Blue (Intl.)" : [{game:"Pokémon Blue (Intl.)", text: "B", id: "blue"}],
                    "Pokémon Yellow (Intl.)" : [{game:"Pokémon Yellow (Intl.)", text: "Y", id: "yellow"}],
                    "Pokémon Red (Jp.)" : [{game:"Pokémon Red (Jp.)", text: "R(j)", id: "red_jp"}],
                    "Pokémon Blue (Jp.)" : [{game:"Pokémon Blue (Jp.)", text: "B(j)", id: "blue_jp"}],
                    "Pokémon Green (Jp.)" : [{game:"Pokémon Green (Jp.)", text: "G(j)", id: "green_jp"}],
                    "Pokémon Pikachu (Jp.)" : [{game:"Pokémon Pikachu (Jp.)", text: "Pk(j)", id: "pikachu_jp"}],
                    "Pokémon Gold" : [{game:"Pokémon Gold", text: "G", id: "gold"}],
                    "Pokémon Silver" : [{game:"Pokémon Silver", text: "S", id: "silver"}],
                    "Pokémon Crystal" : [{game:"Pokémon Crystal", text: "C", id: "crystal"}],
                    "SoulSilver" : [{game:"SoulSilver", text: "SS", id: "soul_silver"}],
                    "HeartGold" : [{game:"HeartGold", text: "HG", id: "heart_gold"}],
                    "Ruby" : [{game:"Ruby", text: "Rby", id: "ruby"}],
                    "Sapphire" : [{game:"Sapphire", text: "Sph", id: "sapphire"}],
                    "Emerald" : [{game:"Emerald", text: "E", id: "emerald"}],
                    "FireRed" : [{game:"FireRed", text: "FR", id: "fire_red"}],
                    "LeafGreen" : [{game:"LeafGreen", text: "LG", id: "leaf_green"}],
                    "Diamond" : [{game:"Diamond", text: "D", id: "diamond"}],
                    "Pearl" : [{game:"Pearl", text: "P", id: "pearl"}],
                    "Platinum" : [{game:"Platinum", text: "Pl", id: "platinum"}],
                    "Black" : [{game:"Black", text: "B", id: "black"}],
                    "White" : [{game:"White", text: "W", id: "white"}],
                    "Black 2" : [{game:"Black 2", text: "B2", id: "black_2"}],
                    "White 2" : [{game:"White 2", text: "W2", id: "white_2"}],
                    "X" : [{game:"X", text: "X", id: "y"}],
                    "Y" : [{game:"Y", text: "Y", id: "x"}],
                    "Omega Ruby" : [{game:"Omega Ruby", text: "OR", id: "omega_ruby"}],
                    "Alpha Sapphire" : [{game:"Alpha Sapphire", text: "AS", id: "alpha_sapphire"}],
                    "Sun" : [{game:"Sun", text: "Sun", id: "sun"}],
                    "Moon" : [{game:"Moon", text: "Moon", id: "moon"}],
                    "Ultra Sun" : [{game:"Ultra Sun", text: "USun", id: "ultra_sun"}],
                    "Ultra Moon" :[{game:"Ultra Moon", text: "UMoon", id: "ultra_moon"}],
                    "Pokémon Green (Jp.) | Pokémon Blue (Intl.)" : [{game:"Pokémon Green (Jp.)", text: "G(j)", id: "green_jp"},{game: "Pokémon Blue (Jp.)", text: "B", id: "blue"}]
                };

function location_sort(a,b) {
    if (a.place.startsWith("Route") && b.place.startsWith("Route")) {
        return +a.place.split(' ')[1] - +b.place.split(' ')[1]
    } else if (a.place.startsWith("Route")) {
        return 1;
    } else if (b.place.startsWith("Route")) {
        return -1;
    } else {
        if (a.place < b.place) return -1;
        if (a.place > b.place) return 1;
        else return 0;
    }
}

class MapView {
    constructor(loc_data){

        this.loc_data = loc_data;
        this.opened_map = undefined;

        this.initialize_maps_and_tabs()

        this.update_pokemon({
            0: "001",
            1: "321",
            2: null,
            3: "022",
            4: null,
            5: "026",
            queue: [5,1,0,3]
        })
    }

    initialize_maps_and_tabs(){
        let gen_list = {
            kanto: {
                tab_id: "kanto_button",
                map_id: "kanto",
                text: "Kanto",
                image: "data/map_data/Kanto_annotated.svg",
                map: "#kanto_map"
            }
            ,
            johto: {
                tab_id: "johto_button",
                map_id: "johto",
                text: "Johto",
                image: "data/map_data/Johto_annotated.svg"
            }
            // ,
            // hoenn: {
            //     tab_id: "hoenn_button",
            //     map_id: "hoenn",
            //     text: "Hoenn",
            //     image: "data/map_data/Hoenn.png"
            // },
            // sinnoh: {
            //     tab_id: "sinnoh_button",
            //     map_id: "sinnoh",
            //     text: "Sinnoh",
            //     image: "data/map_data/Sinnoh.png"
            // },
            // unova: {
            //     tab_id: "unova_button",
            //     map_id: "unova",
            //     text: "Unova",
            //     image: "data/map_data/Unova_2.png"
            // },
            // kalos: {
            //     tab_id: "kalos_button",
            //     map_id: "kalos",
            //     text: "Kalos",
            //     image: "data/map_data/Kalos.png"
            // },
            // alola: {
            //     tab_id: "alola_button",
            //     map_id: "alola",
            //     text: "Alola",
            //     image: "data/map_data/Alola.png"
            // }
            };
        d3.select("#map_area").select(".tab").selectAll("button")
            .data(Object.values(gen_list))
            .join("button")
            .classed("tablinks", true)
            .attr("id", d=>d.tab_id)
            .on("click", this.open_map)
            .text(d => d.text);

        d3.select("#map_area>#the_maps").selectAll("div.tabcontent")
            .data(Object.values(gen_list))
            .join("div")
            .classed("tabcontent", true)
            .classed("map_img", true)
            .attr("id", d => d.map_id)
            // .text(d=>d.text)
            // .append("embed")
            // .attr("src", d=>d.image)
            // .attr("width", 500)
            .each((d) => {
                d3.xml(d.image)
                    .then(data => {
                        d3.select("#"+d.map_id)
                            .append("div")
                            .attr("width",500)
                            .node().append(data.documentElement)
                    })
            })



        // Default Open
        this.open_map(gen_list.kanto)

    }

    open_map(which) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current map, and add an "active" class to the button that opened the tab
        document.getElementById(which.map_id).style.display = "block";
        // evt.currentTarget.className += " active";
        d3.select("#"+which.tab_id).classed("active", true)
        this.opened_map = which.map_id;
    }

    highlight_region(d){

        let the_region = d3.select("#"+d.map).select("#"+d.place_id)
        the_region.classed("highlighted_region", true);

    }

    unhighlight_region(d){

        let the_region = d3.select("#"+d.map).select("#"+d.place_id)
        the_region.classed("highlighted_region", false);

    }

    highlight_pokemon_regions(places){

        for (let place of places){
            this.highlight_region(place)
        }
    }

    unhighlight_pokemon_regions(places){

        for (let place of places){
            this.unhighlight_region(place)
        }
    }

    make_location_card(selection, mon){
        console.log(selection, mon);
        // Clear old art
        selection.html("");

        let row = selection.append("table").append("tr");

        let poke_pic = row.append("td").append("svg");



        let locs_td = row.append("td");

        if( mon != null ){

        let ordered_locations = Object.values(
            mon.locations.filter(x => x.map === this.opened_map)
            .reduce((accum, item) => {
                if(! (item.place_id in accum) ){
                    accum[item.place_id] = {games: new Set(), map: item.map, place: item.place, place_id: item.place_id};
                }
                let games_to_add = item.game in game_to_acro ? game_to_acro[item.game] : {text: item.game, id: "unknown"};
                console.log(games_to_add)
                games_to_add.forEach(game_to_add => accum[item.place_id].games.add(game_to_add));
                return accum;
            }, {})).sort(location_sort);

            poke_pic.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 120)
                .attr("width", 120)
                .attr("rx", 10)
                .attr("fill", type_colors[mon.type1][0]);

            poke_pic.append("circle")
                .attr("cx", 60)
                .attr("cy", 60)
                .attr("r", 50)
                .attr("fill", type_colors[mon.type1][1]);

            poke_pic.append("image")
                .attr("href","data/pokemon_data/sprites/" + mon.long_id + ".png")
                .attr("x", 10)
                .attr("y", 10)
                .attr("height", 100)
                .attr("width", 100);

            poke_pic.on("mouseover", () => this.highlight_pokemon_regions(ordered_locations))
                    .on("mouseout", () => this.unhighlight_pokemon_regions(ordered_locations))





        } else {
            poke_pic.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 120)
                .attr("width", 120)
                .attr("rx", 10)
                .attr("fill", type_colors["missing"][0]);

            poke_pic.append("circle")
                .attr("cx", 60)
                .attr("cy", 60)
                .attr("r", 50)
                .attr("fill", type_colors["missing"][1]);

            poke_pic.append("image")
                .attr("href","data/pokemon_data/sprites/whodat.png")
                .attr("x", 10)
                .attr("y", 10)
                .attr("height", 100)
                .attr("width", 100);
        }

    }

    update_pokemon(poke_dict){

        for (let i of [0,1,2,3,4,5]){
            let spot = d3.select('#map_poke_' + i);
            let the_poke = this.loc_data[poke_dict[i]];

            this.make_location_card(spot, the_poke);

        }


        // for (let i of [0,1,2,3,4,5]){


            // let the_poke = d3.select('#map_poke_' + i);
            // the_poke.html("");
            // let row = the_poke.append("table").append("tr")
            // let img_td = row.append("td");
            // let locs_td = row.append("td");
            // if( poke_dict[i] != null) {
            //
            //     let game_to_acro = {
            //         "Pokémon Red" : [{game:"Pokémon Red", text: "R", id: "red"}],
            //         "Pokémon Blue" : [{game:"Pokémon Blue", text: "B", id: "blue"}],
            //         "Pokémon Yellow" : [{game:"Pokémon Yellow", text: "Y", id: "yellow"}],
            //         "Pokémon Red (Intl.)" : [{game:"Pokémon Red (Intl.)", text: "R", id: "red"}],
            //         "Pokémon Blue (Intl.)" : [{game:"Pokémon Blue (Intl.)", text: "B", id: "blue"}],
            //         "Pokémon Yellow (Intl.)" : [{game:"Pokémon Yellow (Intl.)", text: "Y", id: "yellow"}],
            //         "Pokémon Red (Jp.)" : [{game:"Pokémon Red (Jp.)", text: "R(j)", id: "red_jp"}],
            //         "Pokémon Blue (Jp.)" : [{game:"Pokémon Blue (Jp.)", text: "B(j)", id: "blue_jp"}],
            //         "Pokémon Green (Jp.)" : [{game:"Pokémon Green (Jp.)", text: "G(j)", id: "green_jp"}],
            //         "Pokémon Pikachu (Jp.)" : [{game:"Pokémon Pikachu (Jp.)", text: "Pk(j)", id: "pikachu_jp"}],
            //         "Pokémon Gold" : [{game:"Pokémon Gold", text: "G", id: "gold"}],
            //         "Pokémon Silver" : [{game:"Pokémon Silver", text: "S", id: "silver"}],
            //         "Pokémon Crystal" : [{game:"Pokémon Crystal", text: "C", id: "crystal"}],
            //         "SoulSilver" : [{game:"SoulSilver", text: "SS", id: "soul_silver"}],
            //         "HeartGold" : [{game:"HeartGold", text: "HG", id: "heart_gold"}],
            //         "Ruby" : [{game:"Ruby", text: "Rby", id: "ruby"}],
            //         "Sapphire" : [{game:"Sapphire", text: "Sph", id: "sapphire"}],
            //         "Emerald" : [{game:"Emerald", text: "E", id: "emerald"}],
            //         "FireRed" : [{game:"FireRed", text: "FR", id: "fire_red"}],
            //         "LeafGreen" : [{game:"LeafGreen", text: "LG", id: "leaf_green"}],
            //         "Diamond" : [{game:"Diamond", text: "D", id: "diamond"}],
            //         "Pearl" : [{game:"Pearl", text: "P", id: "pearl"}],
            //         "Platinum" : [{game:"Platinum", text: "Pl", id: "platinum"}],
            //         "Black" : [{game:"Black", text: "B", id: "black"}],
            //         "White" : [{game:"White", text: "W", id: "white"}],
            //         "Black 2" : [{game:"Black 2", text: "B2", id: "black_2"}],
            //         "White 2" : [{game:"White 2", text: "W2", id: "white_2"}],
            //         "X" : [{game:"X", text: "X", id: "y"}],
            //         "Y" : [{game:"Y", text: "Y", id: "x"}],
            //         "Omega Ruby" : [{game:"Omega Ruby", text: "OR", id: "omega_ruby"}],
            //         "Alpha Sapphire" : [{game:"Alpha Sapphire", text: "AS", id: "alpha_sapphire"}],
            //         "Sun" : [{game:"Sun", text: "Sun", id: "sun"}],
            //         "Moon" : [{game:"Moon", text: "Moon", id: "moon"}],
            //         "Ultra Sun" : [{game:"Ultra Sun", text: "USun", id: "ultra_sun"}],
            //         "Ultra Moon" :[{game:"Ultra Moon", text: "UMoon", id: "ultra_moon"}],
            //         "Pokémon Green (Jp.) | Pokémon Blue (Intl.)" : [{game:"Pokémon Green (Jp.)", text: "G(j)", id: "green_jp"},{game: "Pokémon Blue (Jp.)", text: "B", id: "blue"}]
            //     };
            //
            //     // Combine
            //     let ordered_locations = Object.values( this.loc_data[poke_dict[i]].locations.filter(x => x.map === this.opened_map)
            //         .reduce((accum, item) => {
            //             if(! (item.place_id in accum) ){
            //                 accum[item.place_id] = {games: new Set(), map: item.map, place: item.place, place_id: item.place_id};
            //             }
            //             let games_to_add = item.game in game_to_acro ? game_to_acro[item.game] : {text: item.game, id: "unknown"};
            //             console.log(games_to_add)
            //             games_to_add.forEach(game_to_add => accum[item.place_id].games.add(game_to_add));
            //             return accum;
            //         }, {})).sort((a,b)=>{
            //             if (a.place.startsWith("Route") && b.place.startsWith("Route")){
            //                 return +a.place.split(' ')[1] - +b.place.split(' ')[1]
            //             } else if(a.place.startsWith("Route")){
            //                 return 1;
            //             } else if( b.place.startsWith("Route")){
            //                 return -1;
            //             }
            //             else{
            //                 if ( a.place < b.place ) return -1;
            //                 if (a.place > b.place) return 1;
            //                 else return 0;
            //             }
            //         });
            //
            //
            //     console.log(ordered_locations)
            //     img_td.append("img")
            //         .attr("src", "data/pokemon_data/sprites/" + poke_dict[i] + ".png")
            //         .attr("width", 100)
            //         .attr("height", 100)
            //         .style("object-fit", "contain")
            //         .on("mouseover", () => this.highlight_pokemon_regions(ordered_locations))
            //         .on("mouseout", () => this.unhighlight_pokemon_regions(ordered_locations))
            //         // .attr("overflow", "hidden")
            //     locs_td.append("div")
            //         .text(this.loc_data[poke_dict[i]].name)
            //     let row = locs_td.append("div")
            //         .attr("style", "height:100px;overflow:auto")
            //         .append("table")
            //         .selectAll("tr")
            //         .data(ordered_locations) // Eventually filter that to just locs in this game
            //         .join("tr")
            //         .on("mouseover", d => this.highlight_region(d))
            //         .on("mouseout", d => this.unhighlight_region(d));
            //     row.append("td")
            //         .text(d =>d.place);
            //     row.each((function(d){
            //             let cell = d3.select(this).append("td");
            //             d.games.forEach((x) => {
            //                 console.log(x.text)
            //                 cell.append("span")
            //                     .classed( x.id, true)
            //                     .classed("game_title", true)
            //                     .attr("title", x.game)
            //                     .text(x.text)
            //             });
            //         }))
            //         // .selectAll("span")
            //         // .data(d=> d.games)
            //         // .join("span")
            //         // .text(d=>d.text)
            //         // .attr("id", d=> d.id)
            // } else{
            //     img_td.append("img")
            //         .attr("src", "data/pokemon_data/sprites/whodat.png")
            //         .attr("width", 100)
            //     locs_td.append("div")
            //         .text("Pokemon not selected.")
            // }
        // }


    }
}