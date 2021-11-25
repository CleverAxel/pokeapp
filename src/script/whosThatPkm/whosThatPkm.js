const PKBALL_UP = document.getElementById("pkBallUpPart");
const PKBALL_DOWN = document.getElementById("pkBallBottomPart");
const SCREEN_CONTAINER = document.querySelector(".pkmContainer");

const POKEBALL = document.querySelector(".pokeballContainer");
const IMG_POKEMON = document.getElementById("imgPokemon")

const SUBMIT_ANSWER = document.getElementById("submitAnswer");
const ANSWER = document.getElementById("answer");

const WRONG_ANSWER = document.getElementById("wrongAnswer");
const CORRECT_ANSWER = document.getElementById("correctAnswer")

const POKEMON_NAME = document.getElementById("pokemonName");

/*******************************************************/
function getXMLHTTPRequestPokemon(url, detailsAsked) {
    POKEBALL.classList.add("animateRoll");
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(xhr.responseText);
            const DATA = JSON.parse(xhr.responseText);

            if(detailsAsked == "name"){
                selectNewPkm.detailsPkm.nom = DATA.names[4].name;
                selectNewPkm.detailsPkm.nomSimplifie = simplifyName(selectNewPkm.detailsPkm.nom);
            }
            if(detailsAsked == "img"){
                selectNewPkm.detailsPkm.img = DATA.sprites.front_default;
            }
            selectNewPkm.setNewPkmInPokeball();
        }
    }

    xhr.open("GET", url, true);
    xhr.send();
}

/*****************************************************************/
function simplifyName(name){
    name = name.toLowerCase();
    let newName = "";
    for(let i = 0; i < name.length; i++){
        if(name[i] == 'é' || name[i] == 'è' || name[i] == 'ê' || name[i] == 'ë'){
            newName += 'e'
        } else{
            if(name[i] == '♂' || name[i] == '♀'){
                //do nothing car on ne veut pas rajouter la lettre.
            } else{
                newName += name[i];
            }
        }
    }
    return newName;
}
/************************************************************** */
class SelectNewPkm{
    constructor(){
        this.detailsPkm = {
            id : "",
            nom : "",
            nomSimplifie : "",
            img : ""
        }

        this.IDtimeout = 0;
    }

    setNewPkmInPokeball(){
        if(this.detailsPkm.nom != "" && this.detailsPkm.img != ""){
            console.log(this.detailsPkm)
            IMG_POKEMON.src = this.detailsPkm.img;
            setTimeout(() => {
                POKEBALL.classList.remove("animateRoll");

                PKBALL_UP.classList.add("animateOpenUp");
                PKBALL_DOWN.classList.add("animateOpenDown");
                SCREEN_CONTAINER.classList.add("animateDisplayPokemon");
                SCREEN_CONTAINER.classList.remove("screenFlat");

            }, 500);
        }
    }

    selectNewPkM(){
        this.detailsPkm.nom = "";
        this.detailsPkm.img = "";

        PKBALL_UP.classList.remove("animateOpenUp");
        PKBALL_DOWN.classList.remove("animateOpenDown");
        SCREEN_CONTAINER.classList.remove("animateDisplayPokemon");
        SCREEN_CONTAINER.classList.add("screenFlat");

        this.detailsPkm.id = Math.floor(Math.random() * 151) + 1;
        let nomURL = "https://pokeapi.co/api/v2/pokemon-species/"+ this.detailsPkm.id +"/";
        getXMLHTTPRequestPokemon(nomURL, "name");
    
        nomURL = "https://pokeapi.co/api/v2/pokemon/"+ this.detailsPkm.id +"/";
        getXMLHTTPRequestPokemon(nomURL, "img");
    }

    compareAnswer(){
        POKEMON_NAME.innerHTML = "POKEMON : " + selectNewPkm.detailsPkm.nom;
        clearTimeout(this.IDtimeout);
        this.IDtimeout = setTimeout(() => {
            POKEMON_NAME.innerHTML = "POKEMON : ";
        }, 3000);
        let reponse = ANSWER.value;
        ANSWER.value = "";
        reponse = simplifyName(reponse);
        if(reponse == this.detailsPkm.nomSimplifie){
            this.reveal(CORRECT_ANSWER);
        } else{
            this.reveal(WRONG_ANSWER);
        }

        ANSWER.focus();
    }

    reveal(DOMelement){
        DOMelement.classList.remove("hideElement");
        IMG_POKEMON.classList.add("animateReveal");
        IMG_POKEMON.classList.remove("brightnessPKM");
        setTimeout(() => {
            IMG_POKEMON.classList.remove("animateReveal");
            IMG_POKEMON.classList.add("brightnessPKM");
            DOMelement.classList.add("hideElement");
            this.selectNewPkM();
        }, 1000);
    }
}
let selectNewPkm = new SelectNewPkm();
/**********************************************************************/


window.onload = () => {
    selectNewPkm.selectNewPkM();
}

SUBMIT_ANSWER.addEventListener("click", () =>{
    selectNewPkm.compareAnswer();
})