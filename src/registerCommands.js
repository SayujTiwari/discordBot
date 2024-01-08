require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

// Creating command objects, some with options
const commands = [
  {
    name: "animedescription",
    description: "synopsis of anime",
    options: [
      {
        name: "animename",
        description: "input anime name",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "topcharacters",
    description: "top rated anime characteres",
  },
  {
    name: "animerecs",
    description: "anime reccomendation if you like something",
    options: [
      {
        name: "animename",
        description: "input anime name",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "topanime",
    description: "list of top anime",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering commands..");
    // Puts the commands into discord
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Commands were registered");
  } catch (error) {
    console.error(`There was an error: ${error.message}`);
  }
})();
