class IndividualView {
    constructor(card_manager, mons_dict, mon_id) {

        this.card_manager = card_manager;
        this.current_mon = mon_id;
        this.mons = mons_dict;

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

        //array of colors for each different stat
        this.stat_bar_colors = [
            "#ff4f4a",
            "#ff9529",
            "#fffa39",
            "#889bff",
            "#6cff8c",
            "#ff77e8"
        ];

        //Scales for charts
        // TODO: These sizes need to be adjusted
        this.stat_scale =d3.scaleLinear().domain([0,250]).range([0,250]);
        this.stat_axis = d3.axisBottom(this.stat_scale).tickSize(100).ticks(5);

        this.pallet = d3.select("#individual_view_pane")
            .append("svg")
            .attr("id", "iv_svg")
            .attr("width", 900)
            .attr("height", 1000);
    }

    update(mon_id) {
        this.current_mon = mon_id;
        $("#iv_dd").val(mon_id).trigger("change");
        this.drawPanel();
    }

    follow_evolution_to(idx) {
        console.log("HUU");
        console.log(this.current_mon);
        let curr_mon = this.mons[this.current_mon];
        let dest_mon_id = curr_mon.getEvosTo()[idx];
        let dest_mon = this.mons[dest_mon_id];
        if(curr_mon.is_randomized && !curr_mon.revealed_ev_to_idxs.includes(idx)) {
            curr_mon.revealed_ev_to_idxs.push(idx);
            let idx_of_mon_in_dest_list = dest_mon.getEvosFrom().indexOf(curr_mon.long_id);
            dest_mon.revealed_ev_from_idxs.push(idx_of_mon_in_dest_list);

            //Jury's out on this line
            dest_mon.is_stats_revealed = true;
            this.card_manager.update_objects("iv", 0, dest_mon.long_id);
        }

        this.update(dest_mon.long_id);

    }

    follow_evolution_from(idx) {
        let dest_id=this.mons[this.current_mon].getRevealedEvosFrom()[idx];
        console.log(idx)
        console.log(this.mons[this.current_mon].getRevealedEvosFrom());
        console.log(dest_id);
        let dest_mon = this.mons[this.mons[this.current_mon].getRevealedEvosFrom()[idx]];

        this.update(dest_mon.long_id)
    }

    drawPanel() {
        let that = this;
        let stat_labels = ["hp","atk","def","s.a.", "s.d.", "spd"];
        this.pallet.select("g").remove();
        let main_group = this.pallet.append("g");

        let mon = this.mons[this.current_mon];

        main_group
            .append("rect")
            .attr("x", 10)
            .attr("y", 10)
            .attr("width", 880)
            .attr("height", 980)
            .attr("rx", 10)
            .attr("fill", this.type_colors[mon.getType()[0]][0]);

        let image_group = main_group.append("g")
            .attr("transform", "translate(100, 100), scale(2, 2)");

        image_group.append("circle")
            .attr("cx", 60)
            .attr("cy", 60)
            .attr("r", 50)
            .attr("fill", this.type_colors[mon.getType()[0]][1]);

        image_group.append("image")
            .attr("href","data/pokemon_data/sprites/" + mon.long_id + ".png")
            .attr("x", 10)
            .attr("y", 10)
            .attr("height", 100)
            .attr("width", 100);

        //Image

        let chart_group = main_group.append("g")
            .attr("transform", "translate(200, 100)");

        chart_group.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 295)
            .attr("height", 130)
            .attr('rx', 10)
            .attr("fill", "#fff8d6")
            .attr("stroke", this.type_colors[mon.getType()[0]][1])
            .attr("stroke-width", "3pt");

        let chart_interior = chart_group.append("g")
            .attr("transform", "translate(10, 7)");

        chart_interior.selectAll("rect").data(mon.getStats())//[mon.hp, mon.attack, mon.defense, mon.sp_attack, mon.sp_defense, mon.speed])
            .join("rect")
            .attr("x", 20)
            .attr("y", (d,i) => 17*i)
            .attr("width", d => d)
            .attr("height", 13)
            .attr("fill", (d,i) => this.stat_bar_colors[i]);

        chart_interior.append("g")
            .selectAll("text").data(mon.getStats())//[mon.hp, mon.attack, mon.defense, mon.sp_attack, mon.sp_defense, mon.speed]).join("text")
            .join("text")
            .text(d => d)
            .attr("x", 23)
            .attr("y", (d,i)=>12 + 17*i);

        chart_interior.append("g")
            .selectAll("text").data(stat_labels).join("text")
            .text(d=>d)
            .attr("x", 17)
            .attr("y", (d,i) => 12 + 17*i)
            .attr("text-anchor", "end");
        chart_interior.append("g")
            .attr("transform", "translate(20,0)")
            .call(this.stat_axis).call(g=>g.select(".domain").remove());
        chart_interior.append("text")
            .attr("x", 0)
            .attr("y", 135)
            .style("font-weight", "bold")
            .style("font-size", "12px")
            .text("TOTAL STATS: " + mon.getStatTotal());

        //TODO: Get a chart. Horizontal.

        let info_group = main_group.append("g")
            .attr("transform", "translate(300, 100)");

        info_group.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .text("Type:");
        info_group.append("text")
            .attr("x", 0)
            .attr("y", 13)
            .text(((mon.getType()[1] !== '') && (mon.getType()[0] !== mon.getType()[1]) ?mon.getType()[0] +' & '+ mon.getType()[1] :mon.getType()[0]))
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

        info_group.append("text")
            .attr("x", 0)
            .attr("y", 104)
            .text("abilities:")
            .style("font-size", "10pt");

        info_group.append("text")
            .attr("x", 10)
            .attr("y", 118)
            .text(mon.getAbilities()[0])
            .style("font-size", "10pt");
        info_group.append("text")
            .attr("x", 10)
            .attr("y", 130)
            .text(mon.getAbilities()[1])
            .style("font-size", "10pt");

        //TODO: Types, Abilities (only first 2), Height, Weight

        let ev_to_group = main_group.append("g")
            .attr("transform", "translate(400, 100)");
        let cradius = 20;
        let c_v_offset = 50;
        //This is where the fun begins
        let vanilla_evos = mon.ev_to.map(id => that.mons[id]);
        ev_to_group.selectAll("circle").data(vanilla_evos)
            .join("circle")
            .attr("r", cradius)
            .attr("cy", (d, i) => cradius + i*c_v_offset)
            .attr("cx", cradius)
            .attr("fill", this.type_colors[mon.getType()[0]][1])
            .each( function(d,i) {
                d3.select(this)
                    .on("click", () => that.follow_evolution_to(i))
            })
            .append("title")
            .text((d,i) => (mon.is_randomized && !mon.revealed_ev_to_idxs.includes(i)) ? d.name + " evolution" : "");

        if(mon.is_randomized) {
            ev_to_group.selectAll("image").data(mon.revealed_ev_to_idxs)
                .join("image")
                .attr("href", d => "data/pokemon_data/sprites/" + mon.getEvosTo()[d] + ".png")
                .attr("x", 0)
                .attr("y", d => d*c_v_offset)
                .attr("width", 2*cradius)
                .attr("height", 2*cradius)
                .each( function(d){
                    d3.select(this)
                        .on("click", () => that.update(mon.getEvosTo()[d]))
                });
        } else {
            ev_to_group.selectAll("image").data(mon.ev_to)
                .join("image")
                .attr("href", d => "data/pokemon_data/sprites/" + d + ".png")
                .attr("x", 0)
                .attr("y", (d,i) => i*c_v_offset)
                .attr("width", 2*cradius)
                .attr("height", 2*cradius)
                .each( function(d){
                    d3.select(this)
                        .on("click", () => that.update(d))
                });
        }

        //TODO: typed circle, tooltip with vanilla evolution name unless it's revealed.

        let ev_from_group = main_group.append("g")
            .attr("transform", "translate(500, 100)");
        ev_from_group.selectAll("circle").data(mon.getRevealedEvosFrom())
            .join("circle")
            .attr("cx", cradius)
            .attr("cy", (d,i) => cradius + i*c_v_offset )
            .attr("r", cradius)
            .attr("fill", this.type_colors[mon.getType()[0]][1]);

        ev_from_group.selectAll("image").data(mon.getRevealedEvosFrom())
            .join("image")
            .attr("href", d => "data/pokemon_data/sprites/" + d + ".png")
            .attr("x", 0)
            .attr("y", (d,i) => i*c_v_offset)
            .attr("width", 2*cradius)
            .attr("height", 2*cradius)
            .each( function(d,i){
                d3.select(this)
                    .on("click", () => that.follow_evolution_from(i))
            });

        let rev_buttons_group = main_group.append("g")
            .attr("transform", "translate(400, 400)");
    }
}