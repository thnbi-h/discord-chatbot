[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/aifbot/discord-chatbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

<p align="center">
 <a><img width="600" src="https://cdn.discordapp.com/attachments/821200514041511948/1050376234468655124/aifbotaifchatbotlogo2.png"/></a>
</p>

Projeto chatbot desenvolvido pela turma de Administração de Redes de Computadores e Telefonia IP do Curso Técnico Integrado de Telecomunicações do IFSC São José.

## 🤔 Premissa da aplicação

O if chatbot é uma ferramenta que pode ser usada para facilitar a vida de estudantes de telecomunicações (assim como nós). Especialmente estudantes do técnico integrado do IFSC câmpus de São José. Já que as suas funções foram criadas a partir de dores de estudantes do curso.

### Como adicionar o aifbot ao seu servidor

Se você quer adicionar o aifbot ao seu servidor sem se preocupar com hostear o bot localmente e coisas do tipo, você pode adicionar a nossa instancia pública [clicando aqui](https://discord.com/api/oauth2/authorize?client_id=1019291298458509424&permissions=8&scope=bot).

### Comandos por voz

Os comandos por voz fazem parte de uma função mais experimental do aifbot. Com apoio de uma inteligência artificial transcrevemos sua  voz e com esta transcrição executamos comandos simples, quando você falar `oi`, por exemplo, o aifbot responde. Se você quiser que o aifbot se apresente é só perguntar `quem é você`, e assim por diante.

> Por enquanto talvez você tenha que descobrir quais são os comandos executáveis, mas já estamos trabalhando para documentar isso. No mais você pode procurar em [comandos por voz](https://github.com/aifbot/discord-chatbot/blob/e6dda1001434bc8a42336fdc8fbd242c5f6e9d6d/commands/audio/comandosPorVoz.js). Obrigado pela compreensão e divirta-se :D.

### Criar horário para as turmas

Uma das funções do aifbot é o comando ``criar`` com ele é possível de uma forma bem interativa criar um cronograma de aulas, que será guardado no banco de dados possibilitando que em qualquer outro momento você possa com o comando ``horario`` receber ele novamente.

### Gravador de áudio

Com o comando `gravar` o aifbot grava o áudio da sua chamada por alguns minutos e quando a gravação para, ele envia a gravação no chat.

### Calculadora com algumas fórmulas do curso

É uma calculadora com algumas funções a mais, além de fazer cálculos simples como `2 + 2` você também pode usar para outras coisas que podem ser úteis como por exemplo, converter uma tensão em milivolts para volts, ou até calcular a lei de ohms. Exemplo: `ohms R=10 I=2` então o bot retorna: `V = 20 Volts`.

### Comando para tocar som de telefone na call

:phone: `tele` tiri rin tiri rin tiriin!! básicamente isto.
 
É um comando divertido, criado por uma piada do curso e com finalidade de estudo, vale a pena testar.

### Curiosidades aleatórias do curso

Quer saber curiosidades aleatórias sobre as telecomunicações? com o comando `curiosidade` você recebe uma curiosidade aleatória

> Telstar, um projeto comum da NASA e da empresa estadunidense de telecomunicação AT&T, foi o primeiro satélite de telecomunicação civil. Os satélites Telstar foram os primeiros satélites que permitiam ligações eventuais entre as estações munidas de grandes antenas de acompanhamento. :nerd_face:

<div align="center">
    <img width="600px" src="https://cdn.discordapp.com/attachments/821200514041511948/1015348119933825024/unknown.png">
</div>

---

## 💻 Tecnologias

[![My Skills](https://skillicons.dev/icons?i=discord,nodejs,git,github,aws,mongodb)](https://skillicons.dev)

## 📊 Status do projeto

![Alt](https://repobeats.axiom.co/api/embed/5fa2c991238c8ff6ff08817906e31ced32fcbb0e.svg "Repobeats analytics image")

## ✍️ Nossas referências

- [Loritta |  Um bot brasileiro para o Discord extremamente customizável](https://loritta.website/)
- [Ayana | Um bot _all in one_ customizável que entre suas funções tem opções com áudio](https://ayana.io/)
---
**Para rodar o projeto localmente leia a [documentação](SETUP.md).**
