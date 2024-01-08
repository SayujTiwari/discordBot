const { EmbedBuilder } = require("discord.js");
const { getAnime, getTopAnime } = require("./anime");
const { getTopCharacters } = require("./character");

// Provides anime score, popularity, and synopsis
async function animeDesHandle(interaction) {
  const userAnime = interaction.options.get("animename").value; // get the value of the option provided by the user
  const anime = await getAnime(userAnime); //wait for the function to run (commented above in function definition)
  // Check if anime is loaded in
  if (anime) {
    const animeEmbed = new EmbedBuilder()
      .setTitle(
        `${anime.title} [Score: ${anime.score} Popularity: ${anime.popularity}]`
      )
      .setDescription(anime.synopsis)
      .setImage(anime.images.jpg.image_url)
      .setColor("Red");

    interaction.reply({ embeds: [animeEmbed] });
  } else {
    interaction.reply("unable to fetch anime :("); //If anime does not exist
  }
}

// Provides list of top 10 anime based on fan rankings
async function topAnimeHandle(interaction) {
  animeList = await getTopAnime();
  let topArray = [];
  // Checking ig animeList loaded in
  if (animeList) {
    // Getting the top 10 anime titles
    for (let x = 0; x < 10; x++) {
      topArray.push(`${x + 1}. ${animeList[x].title_english}`);
    }
    // Creating Embed
    const topAnimeEmbed = new EmbedBuilder()
      .setTitle("Most Popular Anime Titles Among Fans...")
      .setColor("Red")
      .setDescription(`${topArray.join("\n")}`);

    interaction.reply({ embeds: [topAnimeEmbed] });
  }
}

// Provides anime recs based on one that a user already likes
async function animeRecHandle(interaction) {
  const userAnime = interaction.options.get("animename").value; //Anime title provided by the user
  const anime = await getAnime(userAnime); // Select the anime the user wants in the API data
  const response = await fetch(
    `https://api.jikan.moe/v4/anime/${anime.mal_id}/recommendations`
  );
  const data = await response.json();
  const recAnime = data.data;

  // Going through the top 10 most recommended
  if (recAnime) {
    let recArray = [];
    for (x = 0; x < 10; x++) {
      recArray.push(`${x + 1}. ${recAnime[x].entry.title}`);
    }
    // Creating Embed
    const topAnimeEmbed = new EmbedBuilder()
      .setTitle(`If you like ${userAnime}, then try out...`)
      .setColor("Red")
      .setDescription(`${recArray.join("\n")}`);

    interaction.reply({ embeds: [topAnimeEmbed] });
  }
}

// Similar logic to topAnimeHandle function
async function topCharacterHandle(interaction) {
  const characterList = await getTopCharacters(); // The data from API
  let topArray = [];
  if (characterList) {
    for (let x = 0; x < 10; x++) {
      topArray.push(`${x + 1}. ${characterList[x].name}`);
    }
    const topAnimeEmbed = new EmbedBuilder()
      .setTitle("Most Popular Anime Characters Among Fans...")
      .setColor("Red")
      .setDescription(`${topArray.join("\n")}`);

    interaction.reply({ embeds: [topAnimeEmbed] });
  }
}

module.exports = {
  animeDesHandle,
  animeRecHandle,
  topAnimeHandle,
  topCharacterHandle,
};
