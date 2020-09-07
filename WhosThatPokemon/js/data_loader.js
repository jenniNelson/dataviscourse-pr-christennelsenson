

class DataLoader {

    constructor(poke_dict, card_manager) {
        let that = this;
        let uploader = document.getElementById("file_selector")
            .addEventListener("change", ev => this.read_new_log(ev.target.files[0]));
        this.dex = poke_dict;
        this.card_manager = card_manager;

    }

    read_new_log(file) {
        console.log("###########I'm Here!#############");
        console.log(file);

        this.dex["002"].attack = 200;


    }
}

class RandoPokemon {

    constructor() {
        
    }
}