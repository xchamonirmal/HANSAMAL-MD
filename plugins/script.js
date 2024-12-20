const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var {subsearch , subdl }  = require('@sl-code-lords/si-subdl')
const got = require("got");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const fs = require('fs');
let { unlink } = require("fs/promises");
const { promisify } = require("util");
const FormData = require("form-data");
const stream = require("stream");
const pipeline = promisify(stream.pipeline);
const fileType = require("file-type");
const { lyrics, lyricsv2 } = require('@bochilteam/scraper');

var tmsg =''
if(config.LANG === 'SI') tmsg = 'එය Bot link ලබා දෙයි.'
else tmsg = "It gives bot link."


cmd({
    pattern: "script",
    alias: ["sc","git"],
    react: '📚',
    desc: "tmsg",
    category: "main",
    use: '.script',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const result = '*ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ*\n\n*Github:* https://github.com/HANSAMAL-OFFICIAL/HANSAMAL-MD'
reply(result)
} catch (e) {
l(e)
}
})

cmd({
    pattern: "ip",
    alias: ["ipstalk","sip","searchip","ip-locator"],
    react: '🌐',
    desc: "desct",
    category: "search",
    use: '.ipstalk 112.134.193.130',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
if(!q.includes('.')) return reply(needus)
const IP = "IP :"
const ST = "STATUS :"
const CONTINENT = "CONTINENT :"
const COUNTRY = "COUNTRY :"
const COUNTRYCODE = "COUNTRYCODE :"
const REGIONNAME = "REGIONNAME :"
const CITY = "CITY :"
const ZIP = "ZIP :"
const CURRENCY = "CURRENCY :"
const ISP = "ISP :"
const MOBILE = "MOBILE :"
const PROXY = "PROXY :"
const r = await fetchJson('https://api.techniknews.net/ipgeo/' + q)
const wea = `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

    *IP STALKER*
    
` +
'*🔴 ' + IP +'* ```' + q + '```\n' +
'*✅' + ST +'* ```' + r.status+ '```\n' +
    '*🌐' + CONTINENT +'* ```' + r.continent+ '```\n' +
    '*🗺' + COUNTRY +'* ```' + r.country+ '```\n' +
    '*🔢' + COUNTRYCODE +'* ```' + r.countryCode+ '```\n' +
    '*🌍' + REGIONNAME +'* ```' + r.regionName+ '```\n' +
    '*🚩' + CITY +'* ```' + r.city+ '```\n' +
    '*🏛' + ZIP +'* ```' + r.zip+ '```\n' +
    '*💸' + CURRENCY +'* ```' + r.currency+ '```\n' +
    '*📡' + ISP +'* ```' + r.isp+ '```\n' +
    '*🛡' + PROXY +'* ```' + r.proxy+ '```\n' +
    '*📱' + MOBILE +'* ```' + r.mobile+ '```\n\n'
    + "└───────────◉"
await conn.sendMessage(from , { text: wea}, { quoted: mek } )
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "sub",
    react: "🎞️",
    alias: ["subtitle","sinhalasub","sisub","sinhalasubtitle"],
    desc: "urlneed",
    category: "download",
    use: '.sub spiderman',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await conn.sendMessage(from , { text: imgmsg }, { quoted: mek } )        
const data2 = await subsearch(q)
const data = data2.results
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND}, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: data[i].title,
description: '',
rowId: prefix + 'dsub ' + data[i].link
});
}
const sections = [{
title: "_[Result from Baiscopelk.com]_",
rows: srh
}]
const listMessage = {
text: `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *SI SUB DOWNLOADER*

*📜 Entered Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from Baiscopelk.com 📲',
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
    pattern: "dsub",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need sub link...*' }, { quoted: mek } ) 
const dataq = await subdl(q)
let data = dataq.results
let listdata = `*📚 Title :* ${data.title.trim()}
*💼 Creater :* ${data.creater}`
await conn.sendMessage(from, { image: { url: data.img }, caption: listdata }, { quoted: mek })
let sendapk = await conn.sendMessage(from , { document : { url : data.dl_link  } , mimetype : 'application/zip' , fileName : data.title.trim() + '.' + 'zip',caption: '' } , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "removebg",
    react: "🔮",
    alias: ["rmbg"],
    desc: "descg",
    category: "convert",
    use: '.removebg <Reply to image>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    const isQuotedVideo = m.quoted ? ((m.quoted.type === 'videoMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'videoMessage') : false)) : false
    const isQuotedSticker = m.quoted ? (m.quoted.type === 'stickerMessage') : false
  if ((m.type === 'imageMessage') || isQuotedImage) {
    var nameJpg = getRandom('');
    var namePng = getRandom('');
    let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
    let type = await fileType.fromBuffer(buff);
    await fs.promises.writeFile("./" + type.ext, buff);
    var form = new FormData();
    form.append("image_file", fs.createReadStream("./" + type.ext));
    form.append("size", "auto");

    var rbg = await got.stream.post("https://api.remove.bg/v1.0/removebg", {
      body: form,
      headers: {
        "X-Api-Key": 'fLYByZwbPqdyqkdKK6zcBN9H',
      },
    });
await pipeline(rbg, fs.createWriteStream(namePng + ".png"));
let dat = `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *🌆 BACKGROUND REMOVER*

`
const buttons = [
{buttonId: prefix + 'rbgi ' + namePng + ".png", buttonText: {displayText: 'IMAGE'}, type: 1},
{buttonId: prefix + 'rebgs ' + namePng + ".png", buttonText: {displayText: 'STICKER'}, type: 1},
{buttonId: prefix + 'rbgd ' + namePng + ".png", buttonText: {displayText: 'DOCUMENT'}, type: 1}
]
    const buttonMessage = {
        caption: dat,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 1
    }
    return await conn.buttonMessage(from, buttonMessage, mek)

}else return await  reply(imgmsg)
} catch (e) {
reply(cant)
l(e)
}
})

cmd({
  pattern: "rbgi",
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
  pattern: "rebgs",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
let sticker = new Sticker(q, {
  pack: pushname, // The pack name
  author: '', // The author name
  type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
  categories: ["🤩", "🎉"], // The sticker category
  id: "12345", // The sticker id
  quality: 75, // The quality of the output file
  background: "transparent", // The sticker background color (only for full stickers)
});
const buffer = await sticker.toBuffer();
await conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "rbgd",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { document: fs.readFileSync(q), mimetype: 'image/x-png', fileName: 'Removebg' + '.png',caption: config.FOOTER  }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})

let wm = `ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ™`
cmd({
    pattern: "texttoimgv1",
    alias: ["texttoimagev1","toimagev1","t2iv1"],
    react: '🤖',
    desc: "desct",
    category: "menu",
    use: '.imagine  woman,hair cut collor red,full body,bokeh',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let res = await fetchJson('https://hercai.onrender.com/v3/text2image?prompt='+q)
conn.sendMessage(from, { image: { url: res.url }, caption: wm }, { quoted: mek })
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "prodia",
    alias: ["texttoimage4","toimage4","t2i4"],
    react: '🤖',
    desc: "desct",
    category: "menu",
    use: '.prodia  woman,hair cut collor red,full body,bokeh',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let res = await fetchJson('https://hercai.onrender.com/prodia/text2image?prompt='+q)
conn.sendMessage(from, { image: { url: res.url }, caption: wm }, { quoted: mek })
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "texttoimg2",
    alias: ["texttoimage2","toimage2","t2i2"],
    react: '🤖',
    desc: "desct",
    category: "menu",
    use: '.texttoimg2  woman,hair cut collor red,full body,bokeh',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let res = await fetchJson('https://hercai.onrender.com/v2/text2image?prompt='+q)
conn.sendMessage(from, { image: { url: res.url }, caption: wm }, { quoted: mek })
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "texttoimg3",
    alias: ["texttoimage3","toimage3","t2i3"],
    react: '🤖',
    desc: "desct",
    category: "menu",
    use: '.texttoimg3  woman,hair cut collor red,full body,bokeh',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let res = await fetchJson('https://hercai.onrender.com/v1/text2image?prompt='+q)
conn.sendMessage(from, { image: { url: res.url }, caption: wm }, { quoted: mek })
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "aemtv1",
    react: "💫",
    desc: "It gives phone size screenshot of given url.",
    category: "menu",
    use: '.aemtv1 woman',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("🚩 *Please give me a url !*")
await conn.sendMessage(from, { image: { url: `https://widipe.com/v1/text2img?text=${q}` }, caption: wm }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply("🚩 *I can't get a screenshot. Try again later.*")
console.log(e)
}
})

cmd({
    pattern: "aemtv2",
    react: "💫",
    desc: "It gives phone size screenshot of given url.",
    category: "menu",
    use: '.aemtv2 woman',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("🚩 *Please give me a url !*")
await conn.sendMessage(from, { image: { url: `https://widipe.com/v2/text2img?text=${q}` }, caption: wm }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply("🚩 *I can't get a screenshot. Try again later.*")
console.log(e)
}
})

cmd({
    pattern: "aemtv3",
    react: "💫",
    desc: "It gives phone size screenshot of given url.",
    category: "menu",
    use: '.aemtv3 woman',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("🚩 *Please give me a url !*")
await conn.sendMessage(from, { image: { url: `https://widipe.com/v3/text2img?text=${q}` }, caption: wm }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply("🚩 *I can't get a screenshot. Try again later.*")
console.log(e)
}
})

cmd({
    pattern: "aemtv4",
    react: "💫",
    desc: "It gives phone size screenshot of given url.",
    category: "menu",
    use: '.aemtv4 woman',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("🚩 *Please give me a url !*")
await conn.sendMessage(from, { image: { url: `https://widipe.com/v4/text2img?text=${q}` }, caption: wm }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply("🚩 *I can't get a screenshot. Try again later.*")
console.log(e)
}
})

cmd({
    pattern: "aemtv5",
    react: "💫",
    desc: "It gives phone size screenshot of given url.",
    category: "menu",
    use: '.aemtv5 woman',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("🚩 *Please give me a url !*")
await conn.sendMessage(from, { image: { url: `https://widipe.com/v5/text2img?text=${q}` }, caption: wm }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply("🚩 *I can't get a screenshot. Try again later.*")
console.log(e)
}
})

cmd({
    pattern: "aemtv6",
    react: "💫",
    desc: "It gives phone size screenshot of given url.",
    category: "menu",
    use: '.aemtv6 woman',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("🚩 *Please give me a url !*")
await conn.sendMessage(from, { image: { url: `https://widipe.com/v6/text2img?text=${q}` }, caption: wm }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply("🚩 *I can't get a screenshot. Try again later.*")
console.log(e)
}
})
//=====================================dalle e========================
cmd({
    pattern: "aemtv7",
    react: "💫",
    desc: "It gives phone size screenshot of given url.",
    category: "menu",
    use: '.aemtv7 woman',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("🚩 *Please give me a url !*")
await conn.sendMessage(from, { image: { url: `https://widipe.com/dalle?text=${q}` }, caption: wm }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
    pattern: "chatgpt",
    alias: ["ai","gpt","openai","zerotwo","chat"],
    react: '👾',
    desc: "desct",
    category: "search",
    use: '.chatgpt hi',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
var res = ''
try{
res = (await fetchJson('https://www.dark-yasiya-api.site/ai/chatgpt?q=' + q)).data
} catch (e) {
try{
res = (await fetchJson('https://www.dark-yasiya-api.site/ai/chatgpt?q=' + q)).data
} catch (e) {
res = (await fetchJson('https://www.dark-yasiya-api.site/ai/chatgpt?q=' + q)).data
}
}

return await reply(res)
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "chatgpt4",
    alias: ["ai2","gpt4","openai4","zerotwo2","chat2"],
    react: '👾',
    desc: "desct",
    category: "search",
    use: '.chatgpt4 hi',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
var res = (await fetchJson('https://www.dark-yasiya-api.site/ai/chatgpt?q=' + q)).response

return await reply(res)
} catch (e) {
reply(cantf)
l(e)
}
})                    
