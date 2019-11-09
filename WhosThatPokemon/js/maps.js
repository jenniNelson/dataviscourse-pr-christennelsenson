class MapView {
    constructor(){



        this.initialize_maps_and_tabs()

        this.update_pokemon({
            0: "001",
            1: "321",
            3: "022",
            5: "026"
        })
    }

    initialize_maps_and_tabs(){
        let gen_list = [
            {
                tab_id: "Gen1_button",
                map_id: "Gen1_map",
                text: "Gen 1",
                image: "data/map_data/Kanto.png",
                map: "#kanto_map"
            },
            {
                tab_id: "Gen2_button",
                map_id: "Gen2_map",
                text: "Gen 2",
                image: "data/map_data/Johto.png"
            },
            {
                tab_id: "Gen3_button",
                map_id: "Gen3_map",
                text: "Gen 3",
                image: "data/map_data/Hoenn.png"
            },
            {
                tab_id: "Gen4_button",
                map_id: "Gen4_map",
                text: "Gen 4",
                image: "data/map_data/Sinnoh.png"
            },
            {
                tab_id: "Gen5_button",
                map_id: "Gen5_map",
                text: "Gen 5",
                image: "data/map_data/Unova_2.png"
            },
            {
                tab_id: "Gen6_button",
                map_id: "Gen6_map",
                text: "Gen 6",
                image: "data/map_data/Kalos.png"
            },
            {
                tab_id: "Gen7_button",
                map_id: "Gen7_map",
                text: "Gen 7",
                image: "data/map_data/Alola.png"
            }
            ];
        d3.select("#map_area").select(".tab").selectAll("button")
            .data(gen_list)
            .join("button")
            .classed("tablinks", true)
            .attr("id", d=>d.tab_id)
            .on("click", this.open_map)
            .text(d => d.text);

        d3.select("#map_area>#the_maps").selectAll("div.tabcontent")
            .data(gen_list)
            .join("div")
            .classed("tabcontent", true)
            .classed("map_img", true)
            .attr("id", d => d.map_id)
            // .text(d=>d.text)
            .append("img")
            .attr("src", d=>d.image)
            .attr("width", 500)
            .attr("usemap", d=> d.map)



        // Default Open
        this.open_map(gen_list[0])

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
    }

    update_pokemon(poke_dict){

        for (let i of [0,1,2,3,4,5]){
            let the_poke = d3.select('#map_poke_' + i);
            the_poke.html("");
            let row = the_poke.append("table").append("tr")
            let img_td = row.append("td");
            let locs_td = row.append("td");
            if( i in poke_dict) {
                img_td.append("img")
                    .attr("src", "data/pokemon_data/sprites/" + poke_dict[i] + ".png")
                    .attr("width", 100)
                    .attr("height", 100)
                    .style("object-fit", "contain")
                    // .attr("overflow", "hidden")
                locs_td.append("div")
                    .text("Name: XXX (###)\nWhere: Not found in the wild")
            } else{
                img_td.append("img")
                    .attr("src", "data/pokemon_data/sprites/whodat.png")
                    .attr("width", 100)
                locs_td.append("div")
                    .text("Pokemon not selected.")
            }
        }


    }
}