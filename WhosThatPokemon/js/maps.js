class MapView {
    constructor(){



        this.initialize_maps_and_tabs()
    }

    initialize_maps_and_tabs(){
        let gen_list = [
            {
                tab_id: "Gen1_button",
                map_id: "Gen1_button",
                text: "Gen 1",
                image: "data/map_data/Kanto.png",
                map: "data/map_data/pokearth.html"
            },
            {
                tab_id: "Gen2_button",
                map_id: "Gen2_button",
                text: "Gen 2",
                image: "data/map_data/Johto.png"
            },
            {
                tab_id: "Gen3_button",
                map_id: "Gen3_button",
                text: "Gen 3",
                image: "data/map_data/Hoenn.png"
            },
            {
                tab_id: "Gen4_button",
                map_id: "Gen4_button",
                text: "Gen 4",
                image: "data/map_data/Sinnoh.png"
            },
            {
                tab_id: "Gen5_button",
                map_id: "Gen5_button",
                text: "Gen 5",
                image: "data/map_data/Unova_2.png"
            },
            {
                tab_id: "Gen6_button",
                map_id: "Gen6_button",
                text: "Gen 6",
                image: "data/map_data/Kalos.png"
            },
            {
                tab_id: "Gen7_button",
                map_id: "Gen7_button",
                text: "Gen 7",
                image: "data/map_data/Alola.png"
            }
            ];
        d3.select("#map_area").select(".tab").selectAll("button")
            .data(gen_list)
            .join("button")
            .classed("tablinks", true)
            .on("click", this.open_map)
            .text(d => d.text);

        d3.select("#map_area").selectAll("div.tabcontent")
            .data(gen_list)
            .join("div")
            .classed("tabcontent", true)
            .classed("map_img", true)
            .attr("id", d => d.map_id)
            .text(d=>d.text)
            .append("img")
            .attr("src", d=>d.image)
            .attr("width", 500)
            .attr("map", d=> d.map)



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

    update_pokemon(poke_list){
    //    Assuming poke_list is of their pokedex numbers

        


    }
}