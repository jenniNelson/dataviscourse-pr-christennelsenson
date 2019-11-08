

class Pokedex {
    constructor(pokemon, callback_object_or_whatever){

        this.pokemon = pokemon

        this.createTable()

    }

    createTable() {

        let table = d3.select("#pokedex")
        let header_row = table.append("thead")
            .append("tr")
        let table_body = table.append("tbody")
        let rows = table_body.selectAll("tr").data(this.pokemon).join("tr");

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
        rows.append("td").text(p=> p.type1);

        header_row.append("th").text("Type 2");
        rows.append("td").text(p=> p.type2);

        header_row.append("th").text("Capture Rate");
        rows.append("td").text(p=> p.capture_rate);

        header_row.append("th").text("Legendary?");
        rows.append("td").text(p=> p.is_legendary==="1" ? "Yes" : "No");

        header_row.append("th").text("Orig. Gen");
        rows.append("td").text(p=> p.generation);

        header_row.append("th").text("Height (m)");
        rows.append("td").text(p=> p.height_m);


        // Takes care of that nasty sorting business
        sorttable.makeSortable(document.getElementById("pokedex"))


    }
}