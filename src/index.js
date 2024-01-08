require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const {
  animeDesHandle,
  topAnimeHandle,
  animeRecHandle,
  topCharacterHandle,
} = require("./handler");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return; // if not a command do nothing

  if (interaction.commandName === "animedescription") {
    animeDesHandle(interaction);
  }
  // Make it so it shows an image for each one in an embed
  if (interaction.commandName === "topcharacters") {
    topCharacterHandle(interaction);
  }
  // Create embed for this command
  if (interaction.commandName === "topanime") {
    topAnimeHandle(interaction);
  }
  // Anime Recommendation Command Logic
  if (interaction.commandName === "animerecs") {
    animeRecHandle(interaction);
  }
});

client.login(process.env.TOKEN);
