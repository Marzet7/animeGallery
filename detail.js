const animeTitle = document.getElementById("anime-title");
const animeImage = document.getElementById("anime-image");
const animeSynopsis = document.getElementById("anime-synopsis");
const animeCharacters = document.getElementById("anime-characters");

let url = window.location.href
let index = url.indexOf("?");
let id = url.substring(index+4, url.length)

const cache = JSON.parse(window.localStorage.getItem("animeList"));
const anime = cache.find(({mal_id}) => mal_id == id);

animeTitle.innerText = anime["title"];
animeImage.src = anime["images"]["jpg"]["image_url"];
animeSynopsis.innerText = anime["synopsis"];

document.title = anime["title"]

const promise = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
const characters = await promise.json();

console.log(characters)

const sorted = characters.data.sort((a, b) => {
    if (a.role === b.role) return b.favorites - a.favorites;
    return a.role === "Main" ? -1 : 1;
});

const frag = document.createDocumentFragment();

for (let i = 0; i < 10; i++) {
    const char = sorted[i];
    const div = document.createElement("div");
    const right = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h2");
    const favorites = document.createElement("p");
    const role = document.createElement("p");

    name.innerText = char.character.name;
    img.src = char.character.images.jpg.image_url;
    favorites.innerText = `Favorites: ${char.favorites}`
    role.innerText = `${char.role} character`;
    
    div.appendChild(img);
    right.appendChild(name);
    right.appendChild(role);
    right.appendChild(favorites);
    div.appendChild(right);
    frag.appendChild(div);
    
}

animeCharacters.appendChild(frag);


console.log(sorted)
console.log(anime)