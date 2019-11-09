

class Pokedex {

    constructor(pokemon, callback_object_or_whatever) {


        this.pokemon = pokemon;

        this.p_v_p = [];
        this.team = [];

        this.createTable()

    }

    //
    // update_checkboxes(classname, list_to_check){
    //     d3.selectAll("input."+classname).each(function() {
    //         if(d3.select(this).datum in list_to_check) {
    //             d3.select(this).property("checked", true)
    //         }else{
    //             d3.select(this).property("checked", null)
    //         }
    //     });
    //
    // }
    //
    // p_v_p_change(d,i){
    //     console.log("PVP Checked/unchecked: ", d,i, this, self)
    //
    //
    //
    // }
    //
    // teambuilder_change(d,i, that){
    //     console.log("Team Checked/uncheckes: ", d,i,this, that);
    //     if(this.checked){
    //         if (that.team.length < 6) {
    //             that.team.push(d);
    //         }
    //         else {
    //             that.team.shift();
    //             that.team.push(d);
    //         }
    //     }
    //     else{
    //         that.team.splice(that.team.indexOf(d),1)
    //     }
    //     console.log(that.team);
    //     that.update_checkboxes("teambuilder_checkbox", that.team)
    // }



    createTable() {

        let table = d3.select("#pokedex")
        let header_row = table.append("thead")
            .append("tr")
        let table_body = table.append("tbody")
        let rows = table_body.selectAll("tr").data(this.pokemon).join("tr");

        /** Change the order here to change the order in-table **/
        let self = this;
        header_row.append("th").text("PvP");
        rows.append("td").append("input")
            .attr("type", "checkbox")
            .classed("pvp_checkbox", true)
            // .on('click', this.p_v_p_change);

        header_row.append("th").text("Team");
        rows.append("td").append("input")
            .attr("type", "checkbox")
            .classed("teambuilder_checkbox", true)
            // .on('click', function(d,i) {
            //     self.teambuilder_change(d, i, self)
            // });

        header_row.append("th").text("Dex #");
        rows.append("td").text(p=> p.pokedex_number);

        header_row.append("th").text("Name");
        rows.append("td").text(p=> p.name);

        header_row.append("th").text("Base Total");
        rows.append("td").text(p=> p.base_total);

        header_row.append("th").text("HP");
        rows.append("td").text(p=> p.hp);

        header_row.append("th").text("Atk");
        rows.append("td").text(p=> p.attack);

        header_row.append("th").text("Def");
        rows.append("td").text(p=> p.defense);

        header_row.append("th").text("Sp.Atk");
        rows.append("td").text(p=> p.sp_attack);

        header_row.append("th").text("Sp.Def");
        rows.append("td").text(p=> p.sp_defense);

        header_row.append("th").text("Spd");
        rows.append("td").text(p=> p.speed);

        header_row.append("th").text("Type 1");
        rows.append("td")
            .attr("align", "center")
            .attr("class", p=> "type_"+p.type1)
            .text(p=> p.type1);

        header_row.append("th").text("Type 2");
        rows.append("td")
            .attr("align", "center")
            .attr("class", p=> "type_"+p.type2)
            .text(p=> p.type2);

        header_row.append("th").text("Capture Rate");
        rows.append("td").text(p=> p.capture_rate);

        header_row.append("th").text("Legendary?");
        rows.append("td").text(p=> p.is_legendary==="1" ? "Yes" : "No");

        header_row.append("th").text("Orig. Gen");
        rows.append("td").text(p=> p.generation);

        // header_row.append("th").text("Height (m)");
        // rows.append("td").text(p=> p.height_m);

        rows.on("mouseover", (d,i) => console.log(d));
        rows.on("mouseout", () => console.log("MOUSEOUT"));


        // Takes care of that nasty sorting business
        sorttable.makeSortable(document.getElementById("pokedex"))


    }



}