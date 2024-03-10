const API_KEY = "70ad531a3c9b44b29edf3d9d56cf8be1";
const url1 = "https://newsapi.org/v2/top-headlines?country=in&pageSize=90&apiKey=70ad531a3c9b44b29edf3d9d56cf8be1";
const url2 = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fetchNews("#RELOAD"));

function reload(id) {
    window.location.reload();
}

async function fetchNews(query) {
    if(query=="#RELOAD"){
        const res = await fetch(url1);
        const data = await res.json();
        bindData(data.articles);
        const navItem = document.getElementById("headlines");
        curSelectedNav?.classList.remove("active");
        curSelectedNav = navItem;
        curSelectedNav.classList.add("active");
    }
    else{
        const res = await fetch(`${url2}${query}&from=2024-03-01&language=en&pageSize=40&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {

    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});