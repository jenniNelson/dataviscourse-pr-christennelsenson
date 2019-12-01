
let stat_bar_colors = [
            "#ff4f4a",
            "#ff9529",
            "#fffa39",
            "#889bff",
            "#6cff8c",
            "#ff77e8"
        ];

class FancyDex {

    constructor(pokemon, card_manager) {
        let that = this;
        let checked_anything = function(data){
            let sum = 0;
            for(let v of Object.values(data.vs)){
                sum += v? 1:0
            }
            for(let v of Object.values(data.team)){
                sum += v? 1:0
            }
            return sum > 0
        };

        let update_selected = function(){
            // Only change that which might need unchecking, and that which might need checking
            let selected = that.fancydex.searchData(checked_anything)
                .concat(that.fancydex.searchData("long_id", "in", Object.values(card_manager.team) ),
                    that.fancydex.searchData("long_id", "in", Object.values(card_manager.vs) ));

            for (let select of selected) {
                let team = {};
                for (let i of [0, 1, 2, 3, 4, 5]) {
                    team[i] = card_manager.team[i] === select.long_id;
                }
                that.fancydex.updateData([{
                    long_id: select.long_id,
                    vs: {0: card_manager.vs[0] === select.long_id, 1: card_manager.vs[1] === select.long_id},
                    team: team
                }])
            }

        }

        this.card_manager = card_manager;
        this.card_manager.add_callback(update_selected);
        // this.pokemon = pokemon;

        pokemon = Object.values(pokemon)
        this.max_stat_total = d3.max(pokemon.map(p => p.stat_total));
        this.max_hp = d3.max(pokemon.map(p=>p.hp));
        this.max_attack = d3.max(pokemon.map(p=>p.attack));
        this.max_defense = d3.max(pokemon.map(p=>p.defense));
        this.max_sp_attack = d3.max(pokemon.map(p=>p.sp_attack));
        this.max_sp_defense = d3.max(pokemon.map(p=>p.sp_defense));
        this.max_speed = d3.max(pokemon.map(p=>p.speed));

        this.pokemon = pokemon
            .map((p) => {
            let team = {};
            for (let i of [0, 1, 2, 3, 4, 5]) {
                team[i] = card_manager.vs[i] === p.long_id;
            }
            let newp = {
                name : p.name,
                long_id : p.long_id,
                stat_total : p.stat_total,
                hp : p.hp,
                attack : p.attack,
                defense : p.defense,
                sp_attack : p.sp_attack,
                sp_defense : p.sp_defense,
                speed : p.speed,
                type1 : p.type1,
                type2 : p.type2,
                ev_from : p.ev_from,
                ev_to : p.ev_to,
                is_base : p.is_base,
                is_full_ev : p.is_full_ev,
                evo_family : p.evo_family,
                capture_rate : p.capture_rate,
                gen_introduced : p.gen_introduced,
                is_legendary : p.is_legendary,
                height_m : p.height_m,
                weight_kg : p.weight_kg,
                locations : p.locations,

                perc_stat_total : 100* p.stat_total / this.max_stat_total,
                perc_hp : 100* p.hp / this.max_hp,
                perc_attack : 100* p.attack / this.max_attack,
                perc_defense : 100* p.defense / this.max_defense,
                perc_sp_attack : 100* p.sp_attack / this.max_sp_attack,
                perc_sp_defense : 100* p.sp_defense / this.max_sp_defense,
                perc_speed : 100* p.speed / this.max_speed,

                vs : { 0: card_manager.vs[0]===p.long_id, 1: card_manager.vs[1]===p.long_id},
                team: team
            };
            return newp;
        });

        console.log(this.pokemon)


        this.initialize_table();
    }


    initialize_table(){
        let that = this;

        let type_formatter = function(cell, formatterParams, onRendered){;
            if( cell.getValue() === "") {
                return "";
            }
            return "<img width='50' src='data/pokemon_data/typelabels/" + cell.getValue() + ".gif'>";
        }

        let make_vs_buttons = function (cell, formatterParams, onRendered) {
            let data = cell.getValue();
            let button1 = "<input type='checkbox' " + (data[0]?"checked":"") + "/>";
            let button2 = "<input type='checkbox' " + (data[1]?"checked":"") + "/>";
            return button1+button2;
        }
        let make_team_buttons = function (cell, formatterParams, onRendered) {
            let data = cell.getValue();
            // console.log("TEAM",data)
            let buttonrow1 = "";
            let buttonrow2 = "";
            for (let i of [0,1,2]){
                buttonrow1 +="<input type='checkbox' " + (data[i]?"checked":"") + "/>";
                buttonrow2 +="<input type='checkbox' " + (data[i+3]?"checked":"") + "/>";
            }
            return buttonrow1 + "<br\>" + buttonrow2;
        }

        let check_callback_vs = function(e, cell) {
            //e - the click event object
            //cell - cell component

            let chkboxes = d3.select(cell.getElement()).selectAll("input").nodes()
            // console.log(chkboxes[0].checked, chkboxes[1].checked)

            let old0 = cell.getValue()[0];
            let old1 = cell.getValue()[1];
            cell.getValue()[0] = chkboxes[0].checked;
            cell.getValue()[1] = chkboxes[1].checked;

            if (!old0 && chkboxes[0].checked){
                that.card_manager.update_vs(0, cell.getRow().getData().long_id)
            }
            if (old0 && !chkboxes[0].checked){
                that.card_manager.update_vs(0, null)
            }
            if (!old1 && chkboxes[1].checked){
                that.card_manager.update_vs(1, cell.getRow().getData().long_id)
            }
            if (old1 && !chkboxes[1].checked){
                that.card_manager.update_vs(1, null)
            }
        }

        let check_callback_team = function(e, cell) {
            //e - the click event object
            //cell - cell component

            let chkboxes = d3.select(cell.getElement()).selectAll("input").nodes()
            // console.log(chkboxes)

            console.log("CHECKS:",chkboxes.map((x) => x.checked))

            let old = []
            for (let i of [0,1,2,3,4,5]){
                old.push(cell.getValue()[i]);
                cell.getValue()[i] = chkboxes[i].checked;
            }


            for (let i of [0,1,2,3,4,5]){
                if (!old[i] && chkboxes[i].checked){
                    that.card_manager.update_team(i, cell.getRow().getData().long_id)
                }
                if (old[i] && !chkboxes[i].checked){
                    that.card_manager.update_team(i, null)
                }

            }
        }

        let check_sorter = function(a, b, aRow, bRow, column, dir, sorterParams){
            // console.log(a,b)
            let suma = 0;
            for(let v of Object.values(a)){
                suma += v? 1:0
            }
            let sumb = 0;
            for(let v of Object.values(b)){
                sumb += v? 1:0
            }
            return sumb-suma;
        }

        this.fancydex = new Tabulator("#fancydex", {
            height: 600,
            index:"long_id",
            responsiveLayout:"hide",
            data: this.pokemon,
            layout: "fitColumns",
            // autoColumns:true
            initialSort:[{column:"long_id", dir:"asc"}],
            columns: [
                {title:"Vs", field:"vs", width:48, dataLoaded:make_vs_buttons, formatter:make_vs_buttons, cellClick:check_callback_vs, sorter:check_sorter}
                ,
                {title:"TB", field:"team", width:66,formatter:make_team_buttons, cellClick:check_callback_team, sorter:check_sorter}
                ,
                {title:"#", field:"long_id", sorter:"number", width:20}
                ,
                {title:"Name", field:"name", widthGrow:2}
                ,
                {title:"Base Stats", field:"perc_stat_total", width:75, formatter:"progress", formatterParams:{color:"#b1b1b1", legend:(x)=>"&nbsp;&nbsp;"+(x*this.max_stat_total/100).toFixed(0), legendAlign:'left'}}
                ,
                {title:"HP", field:"perc_hp", align:"left", width:75, formatter:"progress", formatterParams:{color:stat_bar_colors[0], legend:(x)=>"&nbsp;&nbsp;"+(x*this.max_hp/100).toFixed(0), legendAlign:'left'}}
                ,
                {title:"Atk", field:"perc_attack", align:"left", width:75, formatter:"progress", formatterParams:{color:stat_bar_colors[1], legend:(x)=>"&nbsp;&nbsp;"+(x*this.max_attack/100).toFixed(0), legendAlign:'left'}}
                ,
                {title:"Def", field:"perc_defense", align:"left", width:75, formatter:"progress", formatterParams:{color:stat_bar_colors[2], legend:(x)=>"&nbsp;&nbsp;"+(x*this.max_defense/100).toFixed(0), legendAlign:'left'}}
                ,
                {title:"S.Atk", field:"perc_sp_attack", align:"left", width:75, formatter:"progress", formatterParams:{color:stat_bar_colors[3], legend:(x)=>"&nbsp;&nbsp;"+(x*this.max_sp_attack/100).toFixed(0), legendAlign:'left'}}
                ,
                {title:"S.Def", field:"perc_sp_defense", align:"left", width:75, formatter:"progress", formatterParams:{color:stat_bar_colors[4], legend:(x)=>"&nbsp;&nbsp;"+(x*this.max_sp_defense/100).toFixed(0), legendAlign:'left'}}
                ,
                {title:"Spd", field:"perc_speed", align:"left", width:75, formatter:"progress", formatterParams:{color:stat_bar_colors[5], legend:(x)=>"&nbsp;&nbsp;"+(x*this.max_speed/100).toFixed(0), legendAlign:'left'}}
                ,
                {title:"Type1", field:"type1", width:75, formatter:type_formatter}
                ,
                {title:"Type2", field:"type2", width:75, formatter:type_formatter}
                ,
                {title:"Gen", field:"gen_introduced", align:'center'}
            ]
        });

        let table_controls = d3.select("#table_controls")
        let fairydiv = table_controls.append("div")
        fairydiv.append("img")
            .attr("src","data/pokemon_data/typelabels/fairy.gif")
            .attr("width", 50)
        fairydiv.append("button")
            .text("x")

    }

}