# pokeapp
https://fonts.google.com/specimen/Space+Mono
https://fonts.google.com/specimen/Genos
https://fonts.google.com/specimen/Orbitron
https://fonts.google.com/specimen/Press+Start+2P#standard-styles
https://fonts.google.com/specimen/Dela+Gothic+One
https://fonts.google.com/specimen/Slackey

let requests = urls.map((url) => {
        return fetch(url);
    });



Promise.all(requests)
    .then((responses) =>{
        return responses;
    })
    .then((responses) =>{
        return Promise.all(responses.map((r) => {
            return r.json();
        }));
    })
    //.then(users => users.forEach(user => console.log(user)));
    .then((pokemons) => {
        helloPokemon(pokemons);
    })
    function helloPokemon(pPokemons){
        console.log(pPokemons);
    }



https://www.shapedivider.app/
