# Instalar e rodar o projeto

Para instalar o aifbot e rodar localmente em sua máquina, você precisa ter o [Node.js](https://nodejs.org/en/) na versão LTS.

**Instalando as dependências**

Após clonar o projeto, execute o seguinte comando no seu terminal para instalar as dependências:

```bash
npm install
```

**Configurando o projeto**

Você precisa criar um arquivo `.env` na raiz do projeto e adicionar as seguintes variáveis de ambiente: `TOKEN`, `WIT_TOKEN` e `MONGODB_URI`.

```bash
# .env
TOKEN=
WIT_TOKEN=
MONGODB_URI=
```

A `TOKEN` é o token do seu bot do Discord. Você pode criar um bot [aqui](https://discordapp.com/developers/applications/me).

`WIT_TOKEN` é o token do seu app [Wit.ai](https://wit.ai/).

`MONGODB_URI` é a URI do seu banco de dados [MongoDB](https://www.mongodb.com/).

## Iniciando o projeto

Para iniciar o bot, você só precisa executar esse comando no terminal:

```bash
npm start
```
