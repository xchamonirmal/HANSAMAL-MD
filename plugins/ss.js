const config = require('../config')
const { cmd, commands } = require('../command')
const { Download } = require("nima-threads-dl-api")
const cheerio = require('cheerio')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios');
const {  
    igstalker,
    tikstalk
} = require('../lib/stalker')
const fg = require('api-dylux');
const { mediafireDl } = require('mfiredlcore-vihangayt')
const FormData = require('form-data');
const fs = require('fs');
 async function sswebA(url = '', full = false, type = 'desktop') {
	type = type.toLowerCase()
	if (!['desktop', 'tablet', 'phone'].includes(type)) type = 'desktop'
	let form = new URLSearchParams()
	form.append('url', url)
	form.append('device', type)
	if (!!full) form.append('full', 'on')
	form.append('cacheLimit', 0)
	let res = await axios({
		url: 'https://www.screenshotmachine.com/capture.php',
		method: 'post',
		data: form
	})
	let cookies = res.headers['set-cookie']
	let buffer = await axios({
		url: 'https://www.screenshotmachine.com/' + res.data.link,
		headers: {
			'cookie': cookies.join('')
		},
		responseType: 'arraybuffer' 
	})
	return Buffer.from(buffer.data)
}

var imgmsg =''
if(config.LANG === 'SI') imgmsg = '*කරුණාකර මට url එකක් දෙන්න !*'
else imgmsg = "*Please give me a url !*"
var descg = ''
if(config.LANG === 'SI') descg = "එය ලබා දී ඇති url හි desktop ප්‍රමාණයේ තිර රුවක් ලබා දෙයි."
else descg = "It gives desktop size screenshot of given url."
var descp = ''
if(config.LANG === 'SI') descp = "එය ලබා දී ඇති url හි දුරකථන ප්‍රමාණයේ තිර රුවක් ලබා දෙයි."
else descp = "It gives phone size screenshot of given url."
var desct = ''
if(config.LANG === 'SI') desct = "එය ලබා දී ඇති url හි ටැබ්ලට් ප්‍රමාණයේ තිර රුවක් ලබා දෙයි."
else desct = "It gives tablet size screenshot of given url."
var cant = ''
if(config.LANG === 'SI') cant = "*මට තිර රුවක් ලබා ගත නොහැක. පසුව නැවත උත්සාහ කරන්න.*"
else cant = "*I can't get a screenshot. Try again later.*"

cmd({
    pattern: "ss",
    react: "📸",
    alias: ["screenshot","ssweb","ssdesktop"],
    desc: "descg",
    category: "download",
    use: '.ss <url>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let name = getRandom('')
let data = await sswebA(q,true,'desktop')
fs.writeFileSync(name + '.jpg', data);
let dat = `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *📸 SCREENSHOT GETTER*`
const buttons = [
{buttonId: prefix + 'ssd ' + name + '.jpg', buttonText: {displayText: 'DOCUMENT'}, type: 1},
{buttonId: prefix + 'ssi ' + name + '.jpg', buttonText: {displayText: 'IMAGE'}, type: 1}
]
    const buttonMessage = {
        caption: dat,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 1
    }
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply(cant)
l(e)
}
})

cmd({
    pattern: "ssphone",
    react: "📸",
    desc: "descp",
    category: "download",
    use: '.ss <url>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let name = getRandom('')
let data = await sswebA(q,true,'phone')
fs.writeFileSync(name + '.jpg', data);
let dat = `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *📸 SCREENSHOT GETTER*`
const buttons = [
{buttonId: prefix + 'ssd ' + name + '.jpg', buttonText: {displayText: 'DOCUMENT'}, type: 1},
{buttonId: prefix + 'ssi ' + name + '.jpg', buttonText: {displayText: 'IMAGE'}, type: 1}
]
    const buttonMessage = {
        caption: dat,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 1
    }
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply(cant)
l(e)
}
})

cmd({
    pattern: "sstab",
    react: "📸",
    desc: "desct",
    category: "download",
    use: '.ss <url>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let name = getRandom('')
let data = await sswebA(q,true,'tablet')
fs.writeFileSync(name + '.jpg', data);
let dat = `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *📸 SCREENSHOT GETTER*`
const buttons = [
{buttonId: prefix + 'ssd ' + name + '.jpg', buttonText: {displayText: 'DOCUMENT'}, type: 1},
{buttonId: prefix + 'ssi ' + name + '.jpg', buttonText: {displayText: 'IMAGE'}, type: 1}
]
    const buttonMessage = {
        caption: dat,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 1
    }
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply(cant)
l(e)
}
})

cmd({
  pattern: "ssi",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { image: fs.readFileSync(q), caption: config.FOOTER }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "ssd",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { document: fs.readFileSync(q), mimetype: 'image/jpeg', fileName: 'screenshot' + '.jpg',caption: config.FOOTER  }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})

cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    react: '📁',
    desc: "Download mediafire files.",
    category: "download",
    use: '.mediafire <mediafire link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply('*Please give me google drive url*')
if (!q.includes('mediafire.com')) return await  reply('*Please give me google drive url*')
if (!q.includes('/file')) return await  reply('*Please give me google drive url*')
const baby1 = await mediafireDl(q)
if(baby1.size.includes('MB') && baby1.size.replace('MB','') > config.MAX_SIZE) return await  reply('*This file is too big !!*')
if(baby1.size.includes('GB')) return await  reply('*This file is too big !!*')
const mfile = conn.sendMessage(from, { document : { url : baby1.link}, fileName : baby1.name, mimetype: baby1.mime,caption: `*🧸 Name* : ${baby1.name}
*📊 Size* : ${baby1.size}
*🕹️ Mime* : ${baby1.mime}`}, {quoted: mek})	
await conn.sendMessage(from, { react: { text: '📁', key: mfile.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "gdrive",
    alias: ["googledrive'"],
    react: '📑',
    desc: "Download googledrive files.",
    category: "download",
    use: '.gdrive <googledrive link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) return await  reply('*Please give me googledrive url !!*')   
let res = await fg.GDriveDl(q)
reply(`*📃 File name:*  ${res.fileName}
*💈 File Size:* ${res.fileSize}
*🕹️ File type:* ${res.mimetype}`)		
conn.sendMessage(from, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "stiktok",
    alias: ["tiktokstalk","stalktiktok","tikstalk"],
    react: '📱',
    desc: "desct",
    category: "search",
    use: '.stiktok <tiktok username>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
const dataget = await tikstalk(args[0])
const cap = `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

    *TIKTOK STALKER*

*🆔 Username:* ${dataget.username}

*👤 Name:* ${dataget.name}

*🐾 Bio:* ${dataget.bio}

*🚶🏽 Following:* ${dataget.following}

*👥 Followers:* ${dataget.followers}

*💌 Likes:* ${dataget.likes}

└───────────◉➣➣`
await conn.sendMessage(from, { image: { url: dataget.img }, caption: cap }, { quoted: mek })
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "igstalk",
    alias: ["instastalk","instagramstalk","igstalker"],
    react: '📷',
    desc: "desct",
    category: "search",
    use: '.igstalk <instagram username>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
const dataget = await igstalker(q)
const cap = `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

    *IG STALKER*

*🆔 Username:* ${dataget.username}

*👤 Name:* ${dataget.fullname}

*🐾 Bio:* ${dataget.bio}

*🚶🏽 Following:* ${dataget.following}

*👥 Followers:* ${dataget.followers}

*📬 Post count:* ${dataget.post}

└───────────◉➣➣`
await conn.sendMessage(from, { image: { url: dataget.profile }, caption: cap }, { quoted: mek })
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "threads",
    alias: ["thread"],
    react: '🧵',
    desc: "Download threads videos/photos.",
    category: "download",
    use: '.threads <threads link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return await reply(needus)
  let response = await Download(q)
  for (let i=0;i<response.download.length;i++) {
    if(response.download[i].type === 'image') await conn.sendMessage(from, { image: { url: response.download[i].url }, caption: config.FOOTER}, { quoted: mek })
  else await conn.sendMessage(from, { video: { url: response.download[i].url }, caption: config.FOOTER}, { quoted: mek })
  }
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "fmmods",
    alias: ["wamod","wamods","fmmod"],
    react: '📲',
    desc: "Download all fmmods.",
    category: "download",
    use: '.fmmods',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted,prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  let response = (await fetchJson('https://vihangayt.me/download/fmmods')).data
  var buttons = [
    {buttonId: prefix + 'dmod ' + response.com_whatsapp.link + '+' + response.com_whatsapp.name, buttonText: {displayText: response.com_whatsapp.name }, type: 1},
    {buttonId: prefix + 'dmod ' + response.com_fmwhatsapp.link + '+' + response.com_fmwhatsapp.name, buttonText: {displayText: response.com_fmwhatsapp.name }, type: 1},
    {buttonId: prefix + 'dmod ' + response.com_gbwhatsapp.link + '+' + response.com_gbwhatsapp.name, buttonText: {displayText: response.com_gbwhatsapp.name }, type: 1},
    {buttonId: prefix + 'dmod ' + response.com_yowhatsapp.link + '+' + response.com_yowhatsapp.name, buttonText: {displayText: response.com_yowhatsapp.name }, type: 1},
  ]

  const buttonMessage = {
      caption: `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]
      
*Foud Whatsapp Mod Downloader 📲*
`,
      footer: config.FOOTER,
      buttons: buttons,
      headerType: 1
  }
  return await conn.buttonMessage(from, buttonMessage,mek)
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
  pattern: "dmod",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
let [modlink, modname] = q.split `+`;
await conn.sendMessage(from, { document: { url: modlink }, fileName:  modname + '.apk' , mimetype: 'application/vnd.android.package-archive'}, {quoted: mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})
