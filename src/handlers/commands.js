const { reddirSync, readdirSync } = require("fs");

module.exports = (client) => {
  slashCommands = [];
  const load = async (dirs) => {
    const commands = readdirSync(`./commands/${dirs}/`).filter((f) =>
      f.endsWith(".js")
    );
    for (let file of commands) {
      const command = require(`../commands/${dirs}/${file}`);
      client.commands.set(command.name, command);
      slashCommands.push(command);

      console.log(`O comando ${command.name} foi carregado com sucesso!`);
    }
  };
  client.on("ready", async () => {
    await client.application.commands.set(slashCommands);
    console.log("Todos os comandos carregados com sucesso!");
  });
  readdirSync("./commands/").forEach((dirs) => {
    load(dirs);
  });
};
