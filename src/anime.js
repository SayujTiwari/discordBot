async function getAnime(animeName) {
  const response = await fetch(
    `https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`
  );
  const data = await response.json();
  const anime = data.data[0];
  return anime;
}

async function getTopAnime() {
  const response = await fetch(`https://api.jikan.moe/v4/top/anime`);
  const data = await response.json();
  const animeList = data.data;
  return animeList;
}

module.exports = {
  getAnime,
  getTopAnime,
};
