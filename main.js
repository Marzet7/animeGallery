const parent = document.getElementById("parent");
const radios = document.querySelectorAll('input[type="radio"]');
const buttonPrev = document.getElementById("btn-prev-page");
const buttonNext = document.getElementById("btn-next-page");
const pageCounter = document.getElementById("current-page");
const checkCarousel = document.getElementById("ck-carousel");

let titleCount = 5;
let currentPage = 1;
let animeList = [];
let interval;

await getAnime(1);

loadAnime(5);

radios.forEach(radio => {
    radio.addEventListener("change", (e) => {
        titleCount = e.target.value
        currentPage = 1;
        loadAnime();
    });
});

buttonPrev.addEventListener("click", decreasePage);
buttonNext.addEventListener("click", increasePage);

checkCarousel.addEventListener("click", (e) => {
    if (checkCarousel.checked) {
        interval = setInterval(increasePage, 5000);
    }
    else {
        clearInterval(interval);
    }
})

//////////////

function decreasePage() {
    if (currentPage > 1) {
        currentPage--;
    }
    loadAnime();
}

async function increasePage() {
    currentPage++;
    loadAnime();
}

async function getAnime(page) {
    const cached = localStorage.getItem("animeList");

    if (cached !== null) {
        animeList = JSON.parse(cached);
    }

    if (animeList.length < page * 25) {
        await fetchAnime(page);
        localStorage.setItem("animeList", JSON.stringify(animeList));
        console.log("Fetched")
    }

    //console.log(animeList);
}

async function fetchAnime(page) {
    const promise = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
        const json = await promise.json();

        json["data"].forEach(a => {
            animeList.push(a)
        });
}

async function loadAnime() {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild)
    }

    if (currentPage * titleCount > animeList.length) {
        console.log("load more")
        const num = (animeList.length/25) + 1;
        await getAnime(num);
    }
    
    for (let i = (currentPage-1) * titleCount; i < currentPage * titleCount; i++) {
        const anime = animeList[i]
        console.log(anime)

        await loadCard(anime)
        pageCounter.innerText = currentPage;
    }
}

function loadCard(anime) {
    const link = document.createElement("a");
    link.href = `./detail.html?id=${anime["mal_id"]}`

    const div = document.createElement("div");
    div.classList.add("card");
    
    const image = document.createElement("img");
    image.src = anime["images"]["jpg"]["image_url"];
    div.appendChild(image);

    const title = document.createElement("h1");
    title.innerText = anime["title"]
    div.appendChild(title)

    const score = document.createElement("h2");
    score.innerText = anime["score"] + "⭐";
    div.appendChild(score);

    link.appendChild(div);
    parent.appendChild(link);


}
