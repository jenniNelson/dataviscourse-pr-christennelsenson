

class DataLoader {

    constructor(poke_dict, card_manager) {
        let that = this;
        this.uploader_button = document.getElementById("file_selector");
        this.uploader_button.addEventListener("change", ev => this.read_new_log(ev.target.files[0]));
        this.dex = poke_dict;
        this.card_manager = card_manager;

    }

    read_new_log(file) {
        card_manager.rando_mode=true;
        d3.select("#file_selector").attr("disabled", "disabled");

        console.log("###########I'm Here!#############");
        console.log(file);

        this.dex["002"].attack = 200;


    }
}

class RandoPokemon {

    constructor() {

    }
}