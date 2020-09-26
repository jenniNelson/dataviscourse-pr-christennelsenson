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

        this.pallet = d3.select("#individual_view_pane")
            .append("svg")
            .attr("id", "iv_svg")
            .attr("width", 900)
            .attr("height", 1000);
        this.drawPanel()
    }

    update(mon_id) {
        this.current_mon = mon_id;
        this.drawPanel();
    }

    drawPanel() {
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
            .attr("transform", "translate(100, 100)");

        //TODO: Get a circle and an image of the proper size
        // Maybe have name and number beneath too

        let chart_group = main_group.append("g")
            .attr("transform", "translate(200, 100)");

        //TODO: Get a chart. Vertical or Horizontal. Not sure which,
        // but I'm leaning towards just a bigger horizontal for clearer
        // relationship with other cards
        // (this will require scales in the constructor above)

        let info_group = main_group.append("g")
            .attr("transform", "translate(300, 100)");

        //TODO: Types, Abilities (only first 2), Height, Weight

        let ev_to_group = main_group.append("g")
            .attr("transform", "translate(400, 100)");

        let ev_from_group = main_group.append("g")
            .attr("transform", "translate(500, 100)");

        let rev_buttons_group = main_group.append("g")
            .attr("transform", "translate(400, 400)");
    }
}