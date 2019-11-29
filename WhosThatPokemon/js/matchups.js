class Matchups{
    constructor(pokemon, card_manager) {

        let that = this;
        function update_pokemon(cat, pos, mon){
            if(pos !== undefined && mon !== undefined){
                console.log(cat, pos, mon);
                that.update_card(cat, pos, mon);
            }
            // that.initialize_cards();
        }
        this.card_manager = card_manager;
        this.card_manager.add_callback(update_pokemon);

        this.poke_dict = pokemon;
        this.mons = Object.values(pokemon).sort((a,b)=>+a.long_id - +b.long_id);
        this.mons.push(missingno);

        this.current_view = "vs";

        this.num_vs = 2;
        this.num_team = 6;

        this.type_colors = {
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
            "missing" : ["#505050", "#0c0c0c"]
        };

        this.stat_bar_colors = [
            "#ff4f4a",
            "#ff9529",
            "#fffa39",
            "#889bff",
            "#6cff8c",
            "#ff77e8"
        ];

        this.stat_scale =d3.scaleLinear().domain([0,250]).range([0,250]);
        this.stat_axis = d3.axisBottom(this.stat_scale).tickSize(100).ticks(5);

        this.initialize_tabs();
        this.fill_dropdowns();
        this.initialize_cards();
    }

    initialize_tabs() {
        let that = this;
        d3.selectAll("#view_switcher .tablinks").data(["vs", "team"])
            .on("click", d=>that.switch_tabs(d));
        console.log("heer");
        d3.select("#vs_button")
            .classed("active", true);
    }

    switch_tabs(name) {
        d3.selectAll(".lef_table")
            .classed("hidden", true);
        d3.selectAll("#view_switcher .tablinks")
            .classed("active", false);

        if (name === "vs" && this.current_view !== "vs") {
            d3.select("#vs_button")
                .classed("active", true);
            d3.select("#vs_table")
                .classed("hidden", false);
            d3.select("#matchup_summary")
                .classed("hidden", false);
            this.current_view = "vs"
        } else if (name === "team" && this.current_view !== "team") {
            d3.select("#team_builder_button")
                .classed("active", true);
            d3.select("#team_build_table")
                .classed("hidden", false);
            d3.select("#team_summary")
                .classed("hidden", false);
            this.current_view = "team"
        }

    }

    fill_dropdowns() {
        let that = this;
        for (let j = 0; j < this.num_vs; j++) {
            let pane = d3.select("#vs_" + j);

            $("#vs_dd_"+j).select2().on("select2:select", function(evt) {
                let mon = d3.select(evt.params.data.element).datum();
                // that.card_manager.vs[j] = mon.long_id
                // that.draw_card(mon.long_id, "#vs_svg_" + j);
                that.card_manager.update_vs(j, mon.long_id)
            });

            pane.select("select")
                .selectAll("option").data(this.mons).join("option")
                .property("selected", d=>d.long_id === this.card_manager.vs[j])
                .attr("value", d=>d.long_id)
                .text( d => ((d.long_id === "whodat")?"(No Selection)":d.name + " (#" + d.long_id + ")"));

            pane.append("svg")
                .attr("id", "vs_svg_" + j)
                .attr("width", 430)
                .attr("height", 225)

        }
        for (let j = 0; j < this.num_team; j++) {
            let pane = d3.select("#tb_" + j);

            $("#tb_dd_"+j).select2().on("select2:select", function(evt) {
                let mon = d3.select(evt.params.data.element).datum();
                // that.card_manager.team[j] = mon.long_id;
                // that.draw_card(mon.long_id, "#tb_svg_" + j);

                that.card_manager.update_team(j, mon.long_id)
            });

            pane.select("select").selectAll("option").data(this.mons).join("option")
                .property("selected", d=>d.long_id === this.card_manager.team[j])
                .attr("value", d=>d.long_id)
                .text( d => d.name + " (#" + d.long_id + ")");

            pane.append("svg")
                .attr("id", "tb_svg_" + j)
                .attr("width", 430)
                .attr("height", 225)
        }
    }

    initialize_cards() {
        for (let j = 0; j<this.num_vs; j++) {
            let mon = this.poke_dict[this.card_manager.vs[j]];
            this.draw_card(this.card_manager.vs[j], "#vs_svg_" + j);
            $("#vs_dd_"+j).val(mon.long_id)
                .trigger("change");
        }
        for (let j = 0; j<this.num_team; j++) {
            let mon = this.poke_dict[this.card_manager.team[j]];
            this.draw_card(this.card_manager.team[j], "#tb_svg_" + j);
            $("#tb_dd_"+j).val(mon.long_id)
                .trigger("change");
        }
    }

    toggle_view() {
        if (this.current_view === 'vs') {

        } else if (this.current_view === 'team') {

        } else {

        }
    }

    update_card(cat, pos, mon_id) {
        let dd_id = ((cat==="vs")?"#vs_dd_":"#tb_dd_") + pos;
        let svg_id = ((cat==="vs")?"#vs_svg_":"#tb_svg_") + pos;

        console.log(svg_id);

        $(dd_id).val(mon_id).trigger("change");
        this.draw_card(mon_id, svg_id)
    }

    draw_card(id, svg_id) {

        let stat_labels = ["hp","atk","def","s.a.", "s.d.", "spd"];
        d3.select(svg_id).select("g").remove();
        let pallet = d3.select(svg_id).append("g");
        let mon;
        if (id === "whodat"){
            mon = missingno;
        } else{
            mon = this.poke_dict[id];
        }
        pallet.append("rect")
            .attr("x", 5)
            .attr("y", 5)
            .attr("height", 220)
            .attr("width", 420)
            .attr("rx", 10)
            .attr("fill", this.type_colors[mon.type1][0]);

        pallet.append("circle")
            .attr("cx", 60)
            .attr("cy", 60)
            .attr("r", 50)
            .attr("fill", this.type_colors[mon.type1][1]);

        pallet.append("image")
            .attr("href","data/pokemon_data/sprites/" + mon.long_id + ".png")
            .attr("x", 10)
            .attr("y", 10)
            .attr("height", 100)
            .attr("width", 100);

        let bar_group = pallet.append("g")
            .attr("transform", "translate(120,10)");

        bar_group.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 295)
            .attr("height", 130)
            .attr('rx', 10)
            .attr("fill", "#fff8d6")
            .attr("stroke", this.type_colors[mon.type1][1])
            .attr("stroke-width", "3pt");

        let chart_group = bar_group.append("g")
            .attr("transform", "translate(10, 7)");

        chart_group.selectAll("rect").data([mon.hp, mon.attack, mon.defense, mon.sp_attack, mon.sp_defense, mon.speed])
            .join("rect")
            .attr("x", 20)
            .attr("y", (d,i) => 17*i)
            .attr("width", d => d)
            .attr("height", 13)
            .attr("fill", (d,i) => this.stat_bar_colors[i]);

        chart_group.append("g")
            .selectAll("text").data([mon.hp, mon.attack, mon.defense, mon.sp_attack, mon.sp_defense, mon.speed]).join("text")
            .text(d => d)
            .attr("x", 23)
            .attr("y", (d,i)=>12 + 17*i);

        chart_group.append("g")
            .selectAll("text").data(stat_labels).join("text")
            .text(d=>d)
            .attr("x", 17)
            .attr("y", (d,i) => 12 + 17*i)
            .attr("text-anchor", "end");
        chart_group.append("g")
            .attr("transform", "translate(20,0)")
            .call(this.stat_axis).call(g=>g.select(".domain").remove());
        chart_group.append("text")
            .attr("x", 0)
            .attr("y", 135)
            .style("font-weight", "bold")
            .style("font-size", "12px")
            .text("TOTAL STATS: " + mon.stat_total);

        let info_group = pallet.append("g")
            .attr("transform", "translate(10, 120)");

        info_group.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .text("Type:");
        info_group.append("text")
            .attr("x", 0)
            .attr("y", 13)
            .text(((mon.type2 !== '') && (mon.type1 !== mon.type2) ?mon.type1 +' & '+ mon.type2 :mon.type1))
            .style("font-size", "11pt");


        info_group.append("text")
            .attr("x", 0)
            .attr("y", 40)
            .text("height:")
            .style("font-size", "10pt");

        info_group.append("text")
            .attr("x", 10)
            .attr("y", 54)
            .text((mon.height_m ? mon.height_m : "???") + " m")
            .style("font-size", "10pt");

        info_group.append("text")
            .attr("x", 0)
            .attr("y", 72)
            .text("weight:")
            .style("font-size", "10pt");

        info_group.append("text")
            .attr("x", 10)
            .attr("y", 86)
            .text((mon.weight_kg ? mon.weight_kg : "???") + " kg")
            .style("font-size", "10pt");

        let prev_ev = mon.ev_from;
        let next_evs = mon.ev_to;

        let [vs_or_tb, _, card_id] = svg_id.split('_');

        if (prev_ev) {
            let prev_group = pallet.append("g")
                .attr("transform", "translate(130, 165)");

            prev_group.append("text")
                .text("Evolves From:")
                .style("font-size", "8pt")
                .style("text-anchor", "middle")
                .attr("x", 10)
                .attr("y", 0);

            prev_group.append("circle")
                .attr("cx", 10)
                .attr("cy", 25)
                .attr("r", 20)
                .attr("fill", this.type_colors[mon.type1][1]);


            prev_group.append("image")
                .attr("href", "data/pokemon_data/sprites/" + prev_ev + ".png")
                .attr("x", -10)
                .attr("y", 7)
                .attr("width", 40)
                .attr("height", 40)
                .style("cursor", "pointer")
                .on("click", () => this.card_manager.update_pokemon(vs_or_tb, +card_id, prev_ev));

            prev_group.append("text")
                .text(this.poke_dict[prev_ev].name)
                .attr("x", 10)
                .attr("y", 52)
                .style("text-anchor", "middle")
                .style("font-size", "8pt")
        }

        if (next_evs.length > 0) {
            let next_group = pallet.append("g")
                .attr("transform", "translate(400, 165)");

            next_group.append("text")
                .text("Evolves To:")
                .style("text-anchor", "end")
                .style("font-size", "8pt")
                .attr("x", id==="133"?-140:20)
                .attr("y", 0);

            let groups = next_group.selectAll("g").data(next_evs).join("g")
                .attr("transform", (d,i) => "translate(" +( -20 + i*-45 )+ ", 10)")

            groups.append("circle")
                .attr("cx", 20)
                .attr("cy", 15)
                .attr("r", 20)
                .attr("fill", this.type_colors[mon.type1][1]);
            let that=this;
            groups.append("image")
                .attr("href", d => "data/pokemon_data/sprites/" + d + ".png")
                .attr("x", 0)
                .attr("y", -3)
                .attr("height", 40)
                .attr("width", 40)
                .style("cursor", "pointer")
                .each( function(d){
                    d3.select(this)
                        .on("click", () => that.card_manager.update_pokemon(vs_or_tb, +card_id, d))
                });

            groups.append("text")
                .text(d=> this.poke_dict[d].name)
                .attr("x", 20)
                .attr("y", 42)
                .style("text-anchor", "middle")
                .style("font-size", "8pt")
        }
    }
}

types_to_idx = {
    "normal":0,
    "fire":1,
    "water":2,
    "grass":3,
    "electric":4,
    "ice":5,
    "fighting":6,
    "poison":7,
    "ground":8,
    "flying":9,
    "psychic":10,
    "bug":11,
    "rock":12,
    "ghost":13,
    "dragon":14,
    "dark":15,
    "steel":16,
    "fairy":17
};

let idx_to_types = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy"
];

let matchups = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .5, 0, 1, 1, .5, 1],
    [1, .5, .5, 2, 1, 2, 1, 1, 1, 1, 1, 2, .5, 1, .5, 1, 2, 1],
    [1, 2, .5, .5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, .5, 1, 1, 1],
    [1, .5, 2, .5, 1, 1, 1, .5, 2, .5, 1, .5, 2, 1, .5, 1, .5, 1],
    [1, 1, 2, .5, .5, 1, 1, 1, 0, 2, 1, 1, 1, 1, .5, 1, 1, 1],
    [1, .5, .5, 2, 1, .5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, .5, 1],
    [2, 1, 1, 1, 1, 2, 1, .5, 1, .5, .5, .5, 2, 0, 1, 2, 2, .5],
    [1, 1, 1, 2, 1, 1, 1, .5, .5, 1, 1, 1, .5, .5, 1, 1, 0, 2],
    [1, 2, 1, .5, 2, 1, 1, 2, 1, 0, 1, .5, 2, 1, 1, 1, 2, 1],
    [1, 1, 1, 2, .5, 1, 2, 1, 1, 1, 1, 2, .5, 1, 1, 1, .5, 1],
    [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, .5, 1, 1, 1, 1, 0, .5, 1],
    [1, .5, 1, 2, 1, 1, .5, .5, 1, .5, 2, 1, 1, .5, 1, 2, .5, .5],
    [1, 2, 1, 1, 1, 2, .5, 1, .5, 2, 1, 2, 1, 1, 1, 1, .5, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, .5, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, .5, 0],
    [1, 1, 1, 1, 1, 1, .5, 1, 1, 1, 2, 1, 1, 2, 1, .5, 1, .5],
    [1, .5, .5, 1, .5, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, .5, 2],
    [1, .5, 1, 1, 1, 1, 2, .5, 1, 1, 1, 1, 1, 1, 2, 2, .5, 1]
];

let offense_map = {
    1: 0,
    2: 1,
    4: 2,
    .5: -1,
    .25: -2,
    0: -2
};

let defense_map = {
    1: 0,
    2: -1,
    4: -2,
    .5: 1,
    .25: 2,
    0: 2
};

let missingno = {
                name: "(no selection)",
                type1 : "missing",
                type2 : "",
                long_id : "whodat",
                hp: 0,
                attack: 0,
                defense: 0,
                sp_attack: 0,
                sp_defense: 0,
                speed: 0,
                stat_total: 0,
                height_m: "?",
                weight_kg: "?",
                ev_from : "",
                ev_to : []
};