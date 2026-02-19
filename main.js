const animeList = [];
await getAnime();


const radios = document.querySelectorAll('input[type="radio"]');

radios.forEach(radio => {
    radio.addEventListener("change", (e) => {
        loadAnime(e.target.value);
    });
});

const parent = document.getElementById("parent");



async function getAnime() {
    const promise = await fetch("https://api.jikan.moe/v4/top/anime");
    const json = await promise.json();

    json["data"].forEach(a => {
        animeList.push(a)
    });

    console.log(animeList)
}

function loadAnime(count) {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild)
    }
    
    for (let i = 0; i < count; i++) {
        const anime = animeList[i]
        console.log(anime)


        loadCard(anime)
    }
}

function loadCard(anime) {
    const div = document.createElement("div");
    //div.classList.add("card");
    
    const image = document.createElement("img");
    image.src = anime["images"]["jpg"]["image_url"];
    div.appendChild(image);

    const title = document.createElement("h1");
    title.innerText = anime["title"]
    div.appendChild(title)

    const synopsis = document.createElement("p");
    synopsis.innerText = anime["synopsis"];
    div.appendChild(synopsis);

    parent.appendChild(div);


}
