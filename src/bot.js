const { config } = require('dotenv');
const Discord = require('discord.js')
const { Client, GatewayIntentBits } = require('discord.js')

config()

// cria instancia do cliente
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// quando o cliente está pronto executa esse algoritmo
client.once('ready', () => {
  console.log('ok!')
})

// faz login no discord usando a token do config.json
client.login(process.env.TOKEN)
