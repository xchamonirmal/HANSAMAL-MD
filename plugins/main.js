const config = require("../config");
const { cmd, commands } = require("../command");
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require("../lib/functions")
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require("node-fetch")
const { fbdown } = require("../lib/fbdl");
const os = require('os')

cmd({
  pattern: "alive",
    react: "👋",
    alias: ["online","test","bot"],
  desc: "Get bot\'s alive msg.",
  category: "main",
  use: '.alive',
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
const buttons = [
  {buttonId: `${prefix}menu`, buttonText: {displayText: 'COMMANDS MENU'}, type: 1},
  {buttonId: `${prefix}ping`, buttonText: {displayText: 'BOT\'S SPEED'}, type: 1}
]
const buttonMessage = {
  image: {url: config.LOGO},
  caption: `${monspace}👋 Hello ${pushname}${monspace}


*👾 ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ whatsapp bot...*
  
> *Version:* ${require("../package.json").version}
> *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
> *Runtime:* ${runtime(process.uptime())}
> *Platform:* ${hostname}`,
  footer: config.FOOTER,
  buttons: buttons,
  headerType: 4
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply('*Error !!*')
l(e)
}
})
        
cmd({
    pattern: "ping",
    react: "🌠",
    alias: ["speed"],
    desc: "Check bot\'s ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: '```Pinging To index.js!!!```'  }, { quoted: mek } )
var final = new Date().getTime();
return await conn.edit(ping, '*Pong*\n *' + (final - inital) + ' ms* ' )
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
  pattern: "menu",
  react: "🗃️",
  alias: ["panel","list","commands"],
  desc: "Get bot\'s command list.",
  category: "main",
  use: '.menu',
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
const buttons = [
{buttonId: `${prefix}downmenu`, buttonText: {displayText: 'DOWNLOAD COMMANDS MENU'}, type: 1},
{buttonId: `${prefix}searchmenu`, buttonText: {displayText: 'SEARCH COMMANDS MENU'}, type: 1},
{buttonId: `${prefix}convertmenu`, buttonText: {displayText: 'CONVERT COMMANDS MENU'}, type: 1},
{buttonId: `${prefix}logomenu`, buttonText: {displayText: 'LOGO COMMANDS MENU'}, type: 1},
{buttonId: `${prefix}othermenu`, buttonText: {displayText: 'OTHER COMMANDS MENU'}, type: 1},
{buttonId: `${prefix}groupmenu`, buttonText: {displayText: 'GROUP COMMANDS MENU'}, type: 1},
{buttonId: `${prefix}newsmenu`, buttonText: {displayText: 'NEWS COMMANDS MENU'}, type: 1},
{buttonId: `${prefix}ownermenu`, buttonText: {displayText: 'OWNER COMMANDS MENU'}, type: 1},
{buttonId: `${prefix}adminmenu`, buttonText: {displayText: 'ADMIN COMMANDS MENU'}, type: 1},
{buttonId: `${prefix}mnmenu`, buttonText: {displayText: 'NEW COMMANDS MENU'}, type: 1}
]
const buttonMessage = {
  image: {url: config.LOGO},
  caption: `${monspace}👋 Hello ${pushname}${monspace}

*👾 ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ commands menu...*
 *I AM HANSAMAL MD WA BOT*
  
> *Version:* ${require("../package.json").version}
> *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
> *Runtime:* ${runtime(process.uptime())}
> *Platform:* ${hostname}`,
  footer: config.FOOTER,
  buttons: buttons,
  headerType: 4
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "downmenu",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│♘ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 𝙼𝙴𝙽𝚄 📁    ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command:* ${commands[i].pattern}\n
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};

let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: 'https://i.postimg.cc/bNrwryMv/IMG-20241217-WA0059.jpg' },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
cmd({
    pattern: "groupmenu",
    react: "👨‍👩",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│     ♘ 𝙶𝚁𝙾𝚄𝙿 𝙼𝙴𝙽𝚄 📁     ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command:* ${commands[i].pattern}\n
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: 'https://i.postimg.cc/SxL3p8rY/IMG-20241217-WA0052.jpg' },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
cmd({
    pattern: "searchmenu",
    react: "🕵🏻",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│  ♘   𝚂𝙴𝙰𝚁𝙲𝙷   𝙼𝙴𝙽𝚄  🔎  ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command:* ${commands[i].pattern}\n
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: 'https://i.postimg.cc/mrpG0CLN/IMG-20241217-WA0062.jpg' },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "convertmenu",
    react: "🔄",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│    ♘𝙲𝙾𝙽𝚅𝙴𝚁𝚃 𝙼𝙴𝙽𝚄🔄    ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command:* ${commands[i].pattern}\n 
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: 'https://i.postimg.cc/25xfSWfF/IMG-20241217-WA0050.jpg' },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "othermenu",
    react: "👾",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│   ♘   𝙾𝚃𝙷𝙴𝚁  𝙼𝙴𝙽𝚄   📚   ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'misc'){
if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command:* ${commands[i].pattern}\n
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: 'https://i.postimg.cc/Jn4CDhrw/IMG-20241217-WA0058.jpg' },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
  pattern: "ownermenu",
  react: "💼",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│   ♘   𝙾𝚆𝙽𝙴𝚁  𝙼𝙴𝙽𝚄   👦   ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'owner'){
if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command:* ${commands[i].pattern}\n
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: 'https://i.postimg.cc/x8hw4yKY/IMG-20241217-WA0057.jpg' },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "adminmenu",
  react: "🛡️",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│   ♘   𝙰𝙳𝙼𝙸𝙽  𝙼𝙴𝙽𝚄   👨‍🎓   ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'admin'){
if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command:* ${commands[i].pattern}\n
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: 'https://i.postimg.cc/x1DrG5f3/IMG-20241217-WA0065.jpg' },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "logomenu",
  react: "🎡",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│   ♘   𝙻𝙾𝙶𝙾  𝙼𝙴𝙽𝚄   🎨     ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'logo'){
if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command:* ${commands[i].pattern}\n
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: 'https://i.postimg.cc/NjcsGBHt/IMG-20241218-WA0001.jpg' },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "mnmenu",
  react: "👨‍💻",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│  ♘  𝙽𝙴𝚆 𝙲𝙼𝙳  𝙼𝙴𝙽𝚄  ⏳   ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'menu'){
if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command:* ${commands[i].pattern}\n
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: 'https://i.postimg.cc/kG6ZK6LH/IMG-20241217-WA0069.jpg' },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

cmd({
    pattern: "newsmenu",
    react: "🌐",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*
*│╭───────────────╮*
*│   ♘   𝙽𝙴𝚆𝚂   𝙼𝙴𝙽𝚄   🌏    ▎*
*├────────────────╯*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'news'){
  if(!commands[i].dontAddCommandList){
menuc += `\n│❄ *Command :* ${commands[i].pattern}\n
│👨‍💻 *Use:* ${commands[i].use}\n\n\n`
}}};

let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: 'https://i.postimg.cc/GhY31H9z/IMG-20241217-WA0067.jpg' },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

async function dlPanda(url) {
  try {
    const response = await fetch(
        `https://dlpanda.com/id?url=${url}&token=G7eRpMaa`
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      results = {
        image: [],
        video: [],
      };
    return (
      $(
        "div.hero.col-md-12.col-lg-12.pl-0.pr-0 img, div.hero.col-md-12.col-lg-12.pl-0.pr-0 video"
      ).each(function () {
        const element = $(this),
          isVideo = element.is("video"),
          src = isVideo
            ? element.find("source").attr("src")
            : element.attr("src"),
          fullSrc = src.startsWith("//") ? "https:" + src : src;
        results[isVideo ? "video" : "image"].push({
          src: fullSrc,
          width: element.attr("width"),
          ...(isVideo
            ? {
                type: element.find("source").attr("type"),
                controls: element.attr("controls"),
                style: element.attr("style"),
              }
            : {}),
        });
      }),
      results
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
//==================================================================

cmd(
  {
    pattern: "tiktok",
    alias: ["tt", "ttdl", "tiktokdl"],
    desc: "Download tiktok videos",
    category: "download",
    use: ".tiktok *<Tiktok Url>*",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      if (!q) return await reply(needtt);
      if (!q.includes("tiktok")) return await reply("invalid_url");

      const mov = await fetchJson(
        `https://api-pink-venom.vercel.app/api/tiktok?url=${q}`
      );

      let yt = `🌏 *T I K T O K - D O W N L O A D E R*

    *◦ Title:* ${mov.result.title}
    *◦ Region:* ${mov.result.region}
    *◦ Duration:* ${mov.result.duration}
`;
      const buttons = [
        {
          buttonId: prefix + `ttvid ${mov.result.no_wm}`,
          buttonText: { displayText: "DOWNLOAD VIDEO WITHOUT WATERMARK" },
          type: 1,
        },
        {
          buttonId: prefix + `ttvid ${mov.result.with_wm}`,
          buttonText: { displayText: "DOWNLOAD VIDEO WATERMARK" },
          type: 1,
        },
        {
          buttonId: prefix + `tikmp3 ${mov.result.music}`,
          buttonText: { displayText: "DOWNLOAD VIDEO AUDIO" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image:  { url: config.LOGO },
        caption: yt,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
      if (!q) return reply("🚩 *Please give me words to search*");
      const data = await dlPanda(q);
      if (0 === data.video.length)
        for (let i = 0; i < data.image.length; i++)
          await conn.sendMessage(
            from,
            { image: { url: data.image[i].src }, caption: config.FOOTER },
            { quoted: mek }
          );
      else
        for (let i = 0; i < data.video.length; i++)
          await conn.sendMessage(
            from,
            { video: { url: data.video[i].src }, caption: config.FOOTER },
            { quoted: mek }
          );
      console.log(e);
      reply(`${e}`);
    }
  }
);
cmd(
  {
    pattern: "ttvid",
    dontAddCommandList: true,
    use: ".tt1 <tiktok link>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return await reply(needus);
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      let wm = config.FOOTER;
      await conn.sendMessage(
            from,
            { video: { url: q }, caption: config.FOOTER },
            { quoted: mek }
          );
      //await conn.sendFile(from, q, null, wm, mek);
      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);
//==============================================================================

cmd(
  {
    pattern: "tikmp3",
    alias: ["tiktokmp3"],
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return await reply(needus);
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      conn.sendMessage(
        from,
        { audio: { url: q }, mimetype: "audio/mpeg" },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "tiktok2",
    alias: ["tt2"],
    use: ".tiktok2 *<Tiktok Url>*",
    desc: "Download videos and images from tiktok.",
    category: "download",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      if (!q) return reply("🚩 *Please give me words to search*");
      const data = await dlPanda(q);
      let wm = config.FOOTER;
      if (0 === data.video.length)
        for (let i = 0; i < data.image.length; i++)
          await conn.sendMessage(
            from,
            { image: { url: data.image[i].src }, caption: wm },
            { quoted: mek }
          );
      else
        for (let i = 0; i < data.video.length; i++)
          await conn.sendMessage(
            from,
            { video: { url: data.video[i].src }, caption: wm },
            { quoted: mek }
          );
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);


cmd(
  {
    pattern: "fb",
    alias: ["facebook"],
    category: "download",
    use: ".fb *<Facebook Url>*",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return await reply(needus);
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      let wm = config.FOOTER;
      let text = q;
      let status, result;

      ({ status, result } = await fbdown.V2(text));
      if (!status) {
        ({ status, result } = await fbdown.V3(text));
      }
      if (!status) {
        ({ status, result } = await fbdown.V1(text));
      }
      if (!status) {
        return await reply("*Please check the url and try again*");
      }

      const filteredMedia = result.media.filter((m) =>
        (m?.quality || "").includes("HD")
      );

      for (const media of filteredMedia) {
        if ((media?.quality || "").includes("HD")) {
          await conn.sendMessage(
            from,
            { video: { url: media.url }, caption: wm },
            { quoted: mek }
          );
        }
      }
    } catch (e) {
    reply(`${e}`)
      console.log(e);
    }
  }
)
