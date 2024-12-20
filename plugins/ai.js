const config = require('../config')
const fg = require('api-dylux');
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const cheerio = require('cheerio')
const axios = require("axios")
const { Maker } = require('imagemaker.js')
const { iosNews } = require('ios-news')
const wabetainfo = require("@sasmeee/wabetainfo");
const apkdl = require('../lib/apkdl')
const fetch = require('node-fetch')
let { img2url } = require('@blackamda/telegram-image-url');
const vm = require('vm')
const mumaker = require('mumaker')
let wm = `ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ\nᴀ sɪᴍᴘʟᴇ ᴡᴀʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ʜᴀɴꜱᴀᴍᴀʟ`

class AdobeFirefly {
    constructor(options = {}) {
        this.options = options
    }
 
    generate = prompt => new Promise(async resolve => {
        try {
            const json = await (await axios.post('https://firefly.adobe.io/v2/images/generate', {
                prompt, "size": {
                    "width": 2048, "height": 2048
                }, "visualIntensity": 6, "locale": "en-ID", "seeds": [61438, 95119, 42010, 42205]}, {
                headers: {
                    ...this.options
                }
            })).data
            if (!json.outputs || json.outputs.length < 1) return ({
                status: false,
                msg: `Can't generate image!`
            })
            resolve({
                status: true,
                data: json.outputs
            })
        } catch (e) {
            resolve({
                status: false,
                msg: e.message
            })
        }
    })
}

cmd({
    pattern: "ailogo",
    alias: ["logoai","ail","gptlogo"],
    react: '🤖',
    category: "ai",
    desc: "It creates ai logos.",
    use: '.ailogo <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please enter a query")
const Adobe = new AdobeFirefly
let result = await Adobe(q)
conn.sendMessage(from, { image: { url: result.data }, caption: wm }, { quoted: mek })
} catch (e) {
reply("I cant create that logo")
console.log(e)
}
})

cmd({
    pattern: "blackbox",
    alias: ["bb"],
    react: '👾',
    desc: "Blackbox ai chat",
    category: "ai",
    use: '.blackbox <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply('Need a keyword')
var res = (await fetchJson('https://api-pink-venom.vercel.app/api/blackboxAIChat?message=' + q)).data

return await reply(res.response)
} catch (e) {
reply('Unable to generate')
l(e)
}
})

cmd({
    pattern: "bingimgai",
    alias: ["bingimg"],
    react: '📷',
    desc: "Generate Images using Bing AI",
    category: "ai",
    use: '.bingimgai <prompt>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return await  reply("*Give me a prompt to generate images*")
  let response = await fetchJson(`https://widipe.com/bingimg?text=${encodeURIComponent(q)}`)
        if (response && response.result && Array.isArray(response.result) && response.result.length > 0) {
            for (let i = 0; i < response.result.length; i++) {
                await conn.sendMessage(from, { image: { url: response.result[i] }, caption: wm }, { quoted: mek });
            }
        } else {
            reply('No images found for the given prompt');
        }
} catch (e) {
reply('Unable to generate images to the given prompt')
l(e)
}
})

cmd({
    pattern: "aiimg",
    alias: ["imgai"],
    react: '📷',
    desc: "Generate Images using Bing AI",
    category: "ai",
    use: '.aiimg <prompt>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return await  reply("*Give me a prompt to generate images*")
 await conn.sendMessage(from, { image: { url: `https://sms-bomb.vercel.app/api/aipic.php?prompt=${encodeURIComponent(q)}` }, caption: wm }, { quoted: mek });
} catch (e) {
reply('Unable to generate images to the given prompt')
l(e)
}
})

async function aiArtGenerator(prompt) {
  try {
    const response = await fetch("https://ai-api.magicstudio.com/api/ai-art-generator", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://magicstudio.com",
        Referer: "https://magicstudio.com/ai-art-generator/"
      },
      body: new URLSearchParams({
        prompt: prompt,
        output_format: "bytes",
        user_profile_id: "null",
        anonymous_user_id: "a584e30d-1996-4598-909f-70c7ac715dc1",
        request_timestamp: Date.now(),
        user_is_subscribed: "false",
        client_id: "pSgX7WgjukXCBoYwDM8G8GLnRRkvAoJlqa5eAVvj95o"
      })
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.arrayBuffer();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

cmd({
    pattern: "aiartgen",
    alias: ["aiart"],
    react: '📷',
    desc: "Generate Images using Bing AI",
    category: "ai",
    use: '.aiart <prompt>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return await  reply("*Give me a prompt to generate images*")
 const aiArt = await aiArtGenerator(q)
 await conn.sendMessage(from, { image: Buffer.from(aiArt) , caption: wm }, { quoted: mek });
} catch (e) {
reply('Unable to generate images to the given prompt')
console.log(e)
}
})

cmd({
    pattern: "apk",
    react: "📱",
    alias: ["findapk","playstore"],
    desc: "urlneed",
    category: "download",
    use: '.apk whatsapp',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await conn.sendMessage(from , { text: imgmsg }, { quoted: mek } )        
const data2 = await apkdl.search(q)
const data = data2
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: data[i].name,
description: '',
rowId: prefix + 'dapk ' + data[i].id
});
}
const sections = [{
title: "_[Result from playstore.]_",
rows: srh
}]
const listMessage = {
text: `*╭─「ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ」*

   *APK DOWNLOADER*

*📱 Apk Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from playstore. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
await conn.listMessage(from, listMessage,mek)
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "dapk",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '🌟', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '🚩 *Need apk link...*' }, { quoted: mek } ) 
const data = await apkdl.download(q)
let listdata = `ＡＰＫ ＤＯＷＮＬＯＡＤＥＲ\n
┌ ◦ *Name :* ${data.name}
│ ◦ *Developer :* ${data.package}
│ ◦ *Last update :* ${data.lastup}
└ ◦ *Size :* ${data.size}`
await conn.sendMessage(from, { image: { url: data.icon }, caption: listdata }, { quoted: mek })
let sizeb = await ufs(data.dllink);
if (sizeb > newsize) return await conn.sendMessage(from , { text: '*File size is too big...*' }, { quoted: mek } )
let sendapk = await conn.sendMessage(from , { document : { url : data.dllink  } , mimetype : 'application/vnd.android.package-archive' , fileName : data.name + '.' + 'apk',caption: '' } , { quoted: mek })
//await conn.sendMessage(from, { react: { text: ', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  console.log(e)
   reply(`_An Error Found_ ⚒️ : *${e}*`)
}
})

cmd({
    pattern: "wabeta",
    alias: ["wabetainfo","betawa"],
    react: "✔️",
    desc: "tmsg",
    category: "search",
    use: '.wabeta',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const data = (await fetchJson('https://vihangayt.me/details/wabetainfo')).data
let info = `*🥏 Title :* ${data.title}
*📅 Date :* ${data.date}
*🖥️ Platform :* ${data.platform}
*🔗 URL :* ${data.url}
*🗞️ Short Desc :*
${data.shortdesc}

*ℹ️ FAQ*

*❓ Question :* ${data.faq[0].question}
*👨🏻‍💻 Answer :* ${data.faq[0].answer}

*❓ Question :* ${data.faq[1].question}
*👨🏻‍💻 Answer :* ${data.faq[1].answer}

*❓ Question :* ${data.faq[2].question}
*👨🏻‍💻 Answer :* ${data.faq[2].answer}

*❓ Question :* ${data.faq[3].question}
*👨🏻‍💻 Answer :* ${data.faq[3].answer}

*📰 Full Desc :*
${data.fulldesc}`
return await conn.sendMessage(from, { image: { url: data.image} , caption: info } , { quoted: mek })
} catch (e) {
l(e)
}
})

cmd({
    pattern: "enhance",
    react: "↗️",
    alias: ["imgenhance","quality","qualityimage","tohd"],
    desc: "desct",
    category: "convert",
    use: '.enhance <reply low quality image>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    if ((m.type === 'imageMessage') || isQuotedImage) {
const fileType = require("file-type");
  var nameJpg = getRandom('');
  let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
  let type = await fileType.fromBuffer(buff);
  await fs.promises.writeFile("./" + type.ext, buff);
  img2url("./" + type.ext).then(async url => {
      await conn.sendMessage(from, { image: await getBuffer('https://vihangayt.me/tools/enhance?url='+url), caption: config.FOOTER }, { quoted: mek })
});
    } else return reply(imgmsg)
} catch (e) {
  reply(cantf);
  l(e);
}
})


cmd({
    pattern: "ios",
    alias: ["apple","applenews"],
    react: "🍎",
    desc: "tmsg",
    category: "search",
    use: '.ios',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const data = (await iosNews()).result[0]
let info = `*📃 Title :* ${data.title}
*🕒 Time:* ${data.time} 
*⛓️ Link:* ${data.link}
*📚 Description:* ${data.desc}
`
return await conn.sendMessage(from, { image: { url: data.img} , caption: info } , { quoted: mek })
} catch (e) {
l(e)
}
})

cmd({
    pattern: "naruto",
    alias: ["textpro"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.naruto',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "rose",
    alias: ["textpro2"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.rose',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-online-elegant-3d-ruby-text-effect-1137.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "cake",
    alias: ["textpro3"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.cake',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-3d-chocolate-cake-text-effect-online-1135.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "pokemon",
    alias: ["textpro4"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.pokemon',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-pokemon-logo-style-text-effect-online-1134.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = '*ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™*'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "liquid",
    alias: ["textpro5"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.liquid',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-3d-liquid-metal-text-effect-1112.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = '*ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™*'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "rusty",
    alias: ["textpro6"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.rusty',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/online-3d-rusty-metal-text-effect-maker-1133.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "neon",
    alias: ["textpro7"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.cake',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpr/neon-light-style-3d-text-effect-online-1132.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "pcartoon",
    alias: ["textpro8"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.pcartoon',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-pink-cute-3d-cartoon-text-effect-online-1131.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "dragon",
    alias: ["textpro9"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.dragon',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-3d-dragon-scale-text-effect-online-1127.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "sunset",
    alias: ["textpro10"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.sunset',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-sunset-light-text-effects-online-for-free-1124.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "3dcartoon",
    alias: ["textpro11"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.3dcartoon',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-3d-cartoon-text-effect-online-1120.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "grunge",
    alias: ["textpro12"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.grunge',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/grunge-metallic-3d-text-effect-online-1115.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "multicolor",
    alias: ["textpro13"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.multicolour',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const res = 'https://textpro.me/create-3d-multicolor-paint-text-effect-online-1114.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "3dmetalic",
    alias: ["textpro14"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.3dnetalic',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
const red = 'https://textpro.me/create-3d-metallic-text-with-details-online-1108.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})
//┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉┈┉
cmd({
    pattern: "party",
    alias: ["textpro15"],
    react: '💫',
    desc: "Text to Image Collection",
    category: "logo",
    use: '.party',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return await  reply('🚩 *Text not found ! Please type a text to Make Art*')
let res = 'https://textpro.me/party-text-effect-with-the-night-event-theme-1105.html'
let json = await mumaker.textpro(res, q)
let wtf = { url: json.image }
const wm  = 'ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™'
await conn.sendMessage(from, { image: { url: wtf }, caption: wm}, { quoted: mek })
} catch (e) {
reply("🚩 *Not Found !*")
console.log(e)
}
})

cmd({
    pattern: "logo",
    react: '🎭',
    alias: ["logo6","ephoto360","ephoto"],
    desc: "desc",
    category: "logo",
    use: '.logo hansamal',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
const sections = [{
title: "Result from ephoto360. 📲",
rows: [{
title: 'Blackpink',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html'
},{
title: 'Dragon ball',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html'
},{
title: 'Naruto shippuden',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html'
},{
title: 'Sunset light',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-sunset-light-text-effects-online-807.html'
},{
title: 'beautiful 3d foil baloon',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/beautiful-3d-foil-balloon-effects-for-holidays-and-birthday-803.html'
},{
title: 'Digital glitch',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html'
},{
title: 'Write text on wet glass',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html'
},{
title: 'Glossy silver 3D text effect',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html'
},{
title: 'Colorful neon light text effect',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html'
},{
title: 'Thor logo style',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-thor-logo-style-text-effects-online-for-free-796.html'
},{
title: 'Typography text effect on pavement',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html'
},{
title: 'Impressive neon Glitch text effect',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html'
},{
title: 'Handwritten text on foggy glass',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html'
},{
title: 'Impressive decorative 3D metal text',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/impressive-decorative-3d-metal-text-effect-798.html'
},{
title: 'Frozen Christmas text',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-frozen-christmas-text-effect-online-792.html'
},{
title: 'Hacker avatar',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html'
},{
title: '3D colorful paint text',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html'
},{
title: 'Women\'s Day',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-greeting-video-card-for-international-women-s-day-on-march-8-784.html'
},{
title: 'Pixel Glitch',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html'
},{
title: 'Americal flag',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html'
},{
title: 'Erasing',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html'
},{
title: 'Multicolored signature attachment arrow',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-multicolored-signature-attachment-arrow-effect-714.html'
},{
title: 'Blackpink 02',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html'
},{
title: 'Blackpink neon',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-blackpink-neon-logo-text-effect-online-710.html'
},{
title: 'Star Wars character mascot',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-star-wars-character-mascot-logo-online-707.html'
},{
title: 'Glowing text',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html'
},{
title: 'Funny animations of a traveling bear',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-funny-animations-of-a-traveling-bear-701.html'
},{
title: 'Beach 3D',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-3d-text-effect-on-the-beach-online-688.html'
},{
title: 'Cute girl gamer mascot',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-cute-girl-gamer-mascot-logo-online-687.html'
},{
title: '3D underwater',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html'
},{
title: 'Bear logo',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html'
},{
title: 'Football team logo',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-football-team-logo-online-free-671.html'
},{
title: 'Cartoon style graffiti',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html'
},{
title: 'Multicolor 3D paper',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html'
},{
title: 'Watercolor text',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html'
},{
title: 'Light text effect futuristic technology',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html'
},{
title: 'Write text effect clouds in the sky',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html'
},{
title: 'PUBG logo maker cute character',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html'
},{
title: 'PUBG Mascot Logo Maker for an eSports',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/pubg-mascot-logo-maker-for-an-esports-team-612.html'
},{
title: 'Black Pink 03',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html'
},{
title: 'Funny warning sign',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-funny-warning-sign-602.html'
},{
title: '3D gradient text',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html'
},{
title: 'Write in sand summer beach',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html'
},{
title: 'Luxury gold text',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html'
},{
title: 'Multicolored neon light signatures',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html'
},

]}]
const buttonMessage = { 
text: `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *EPHOTO360 LOGO*

*🗃️ Entered Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from ephoto360. 📲',
buttonText: 'Select Logo 🎭',
sections
}
await conn.buttonMessage(from, buttonMessage, mek)

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "banner",
    alias: ["ytbanner","cover","channelbanner"],
    desc: "desc2",
    category: "logo",
    use: '.banner hansamal+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg2)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "banner2",
    alias: ["ytbanner2","cover2","channelbanner2"],
    desc: "desc2",
    category: "logo",
    use: '.banner2 hansamal+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg3)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/make-your-own-free-fire-youtube-banner-online-free-562.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "banner3",
    alias: ["ytbanner3","cover3","channelbanner3"],
    desc: "desc2",
    category: "logo",
    use: '.banner3 hansamal+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg4)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/create-a-youtube-banner-game-of-pubg-cool-402.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "banner4",
    alias: ["ytbanner4","cover4","channelbanner4"],
    desc: "desc2",
    category: "logo",
    use: '.banner4 hansamal+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg5)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/create-call-of-duty-warzone-youtube-banner-online-548.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "banner5",
    alias: ["ytbanner5","cover5","channelbanner5"],
    desc: "desc2",
    category: "logo",
    use: '.banner5 hansamal+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg6)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/create-banner-youtube-game-apex-legend-online-406.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "dlogo6",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{


let wm = `ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™`
await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
let [name,link] = q.split('+')
let res = await fetchJson( `https://api-pink-venom.vercel.app/api/logo?url=${link}&name=${name}`)

await conn.sendMessage(from, { image: { url: res.result.download_url }, caption: wm }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})

    
} catch (e) {
    reply(errt)
  l(e)
}
})

async function animeVideo() {
  const response = await fetch("https://shortstatusvideos.com/anime-video-status-download/"),
    html = await response.text(),
    $ = cheerio.load(html),
    videos = [];
  $("a.mks_button.mks_button_small.squared").each((index, element) => {
    const href = $(element).attr("href"),
      title = $(element).closest("p").prevAll("p").find("strong").text();
    videos.push({
      title: title,
      source: href
    });
  });
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}


cmd({
    pattern: "status",
    alias: ["wastatus"],
    react: '💫',
    desc: "Download status videos.",
    category: "download",
    use: '.status <facebook url>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let resl = await animeVideo()
let wm = `ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™`
let cap = `📝 *Title:* ${resl.title}`
let newwm = `${cap}

${wm}
`
await conn.sendMessage(from, { video: { url: resl.source }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cantf)
console.log(e)
}
})

cmd({
    pattern: "modapk",
    react: "📱",
    alias: ["androidapksfree","mod"],
    desc: "urlneed",
    category: "download",
    use: '.modapk whatsapp',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await conn.sendMessage(from , { text: imgmsg }, { quoted: mek } )        
const era = await axios.get(`https://androidapksfree.com/?s=${q}`, {
    withCredentials: true
  })

var sedarch = []
const $gs = cheerio.load(era.data)
$gs('html > body > div.main-wrap > div.main.wrap.cf > div > div > div > div > div.boxed-content > div.devapk-apps-list > section').each(function(a, b) {
const link = $gs(b).find('h1 > a').attr('href')
const title = $gs(b).find('h1').text()
const update = $gs(b).find('div.date-on-tax').text().replaceAll('\n','')
sedarch.push({ link, title , update })
})
const data = sedarch
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: data[i].title,
rowId: prefix + 'dapk2 ' + data[i].link + '+' + data[i].title
});
}
const sections = [{
title: "_[Result from androidapksfree.]_",
rows: srh
}]
const listMessage = {
text: `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *MOD APK DOWNLOADER*

*📱 Enterd Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from androidapksfree. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
await conn.listMessage(from, listMessage,mek)
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "dapk2",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need apk link...*' }, { quoted: mek } ) 
let [link,title] = q.split('+')
const era = await axios.get(link + `download/`, {
    withCredentials: true
})
const $g = cheerio.load(era.data)
const linkdl = $g('html > body > div.main-wrap > div.main.wrap.cf > div > div > div > div > div.post-container.cf > div > div > div.box > div.boxed-content.boxed-content-mobile > div > div > div.download-button-main.centered-element > a').attr('href')
const icon = $g('div.app-icon-new > img').attr('src')
const size = $g('html > body > div.main-wrap > div.main.wrap.cf > div > div > div > div > div.post-container.cf > div > div > div.box > div.boxed-content.boxed-content-mobile > div > div > div.download-button-main.centered-element > a').text().split('(')[1].replaceAll(')','')
let listdata = `*📚 Name :* ${title}
*📥 Size :* ${size}`
await conn.sendMessage(from, { image: { url: icon }, caption: listdata }, { quoted: mek })
if (size.includes('GB')) return await conn.sendMessage(from , { text: '*File size is too big...*' }, { quoted: mek } )
if (size.includes('MB') && size.replace(' MB','') > config.MAX_SIZE) return await conn.sendMessage(from , { text: '*File size is too big...*' }, { quoted: mek } )
let sendapk = await conn.sendMessage(from , { document : { url : linkdl  } , mimetype : 'application/vnd.android.package-archive' , fileName : title + '.' + 'apk',caption: '' } , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply('*ERROR !!*')
  l(e)
}
})
