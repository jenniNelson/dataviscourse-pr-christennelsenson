class Matchups{
    constructor(pokemon, callbacks) {
        this.poke_dict = pokemon;
        this.mons = Object.values(pokemon).sort((a,b)=>+a.long_id - +b.long_id);

        this.vs_selection = ['001', '123'];
        this.team_selection = ['003', '242', '321', '500', '292', '141'];

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

        this.fill_dropdowns();
        this.initialize_cards();
    }

    fill_dropdowns() {
        let that = this;
        for (let j = 0; j < this.num_vs; j++) {
            let pane = d3.select("#vs_" + j);

            $("#vs_dd_"+j).select2().on("select2:select", function(evt) {
                    let mon = d3.select(evt.params.data.element).datum();
                    console.log(mon.long_id);
                    that.vs_selection[j] = mon.long_id
                    that.draw_card(mon.long_id, "#vs_svg_" + j);
            });

            pane.select("select")
                // .on("change", function() {
                //     let newVal = eval(d3.select(this).property('value'));
                //     console.log(newVal);
                //     that.draw_card(newVal, "#vs_svg_" + j);
                // })
                .selectAll("option").data(this.mons).join("option")
                .property("selected", d=>d.long_id === this.vs_selection[j])
                .attr("value", d=>d.long_id)
                .text( d => d.name + " (#" + d.long_id + ")");

            pane.append("svg")
                .attr("id", "vs_svg_" + j)
                .attr("width", 430)
                .attr("height", 200)
                .style("border", "1pt solid black")

        }
        for (let j = 0; j < this.num_team; j++) {
            let pane = d3.select("#tb_" + j);

            $("#tb_dd_"+j).select2().on("select2:select", function(evt) {
                    let mon = d3.select(evt.params.data.element).datum();
                    console.log(mon.long_id);
                    that.team_selection[j] = mon.long_id
                    that.draw_card(mon.long_id, "#tb_svg_" + j);
            });

            pane.select("select").selectAll("option").data(this.mons).join("option")
                .property("selected", d=>d.long_id === this.team_selection[j])
                .attr("value", d=>d.long_id)
                .text( d => d.name + " (#" + d.long_id + ")");

            pane.append("svg")
                .attr("id", "tb_svg_" + j)
                .attr("width", 430)
                .attr("height", 200)
                .style("border", "1pt solid black");
        }
    }

    initialize_cards() {
        for (let j = 0; j<this.num_vs; j++) {
            this.draw_card(this.vs_selection[j], "#vs_svg_" + j)
        }
        for (let j = 0; j<this.num_team; j++) {
            this.draw_card(this.team_selection[j], "#tb_svg_" + j)
        }
    }

    toggle_view() {
        if (this.current_view === 'vs') {

        } else if (this.current_view === 'team') {

        } else {

        }
    }

    draw_card(id, svg_id) {

        let stat_labels = ["hp","atk","def","s.a.", "s.d.", "spd"];
        console.log(this.team_selection, this.vs_selection);
        d3.select(svg_id).select("g").remove();
        let pallet = d3.select(svg_id).append("g");
        let mon = this.poke_dict[id];
        pallet.append("rect")
            .attr("x", 5)
            .attr("y", 5)
            .attr("height", 190)
            .attr("width", 420)
            .attr("rx", 10)
            .attr("fill", this.type_colors[mon.type1][0]);

        pallet.append("circle")
            .attr("cx", 60)
            .attr("cy", 60)
            .attr("r", 50)
            .attr("fill", this.type_colors[mon.type1][1]);

        pallet.append("image")
            .attr("href","data/pokemon_data/sprites/" + id + ".png")
            .attr("x", 10)
            .attr("y", 10)
            .attr("height", 100)
            .attr("width", 100)

        let bar_group = pallet.append("g")
            .attr("transform", "translate(120,10)")

        bar_group.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 295)
            .attr("height", 130)
            .attr('rx', 10)
            .attr("fill", "#fff8d6")
            .attr("stroke", this.type_colors[this.poke_dict[id].type1][1])
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
            .text(((mon.type2 !== '') && (mon.type1 !== mon.type2) ?mon.type1 +' & '+ mon.type2 :mon.type1));




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