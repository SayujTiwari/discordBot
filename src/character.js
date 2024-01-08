// Getting the
async function getTopCharacters() {
  const response = await fetch(`https://api.jikan.moe/v4/top/characters`);
  const data = await response.json();
  const characterList = data.data;
  return characterList;
}

module.exports = { getTopCharacters };
