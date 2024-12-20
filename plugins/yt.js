const config = require('../config')
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

const fs = require('fs')
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    getsize,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson
} = require('../lib/functions')
const {
    cmd,
    commands
} = require('../command')
var sizetoo =  "_This file size is too big_"
const yts = require("ytsearch-venom")

let wm = config.FOOTER
let newsize = config.MAX_SIZE * 1024 * 1024

function ytreg(url) {
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
    return ytIdRegex.test(url);
}
cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts lelena',
    react: "🔎",
desc: "Search songs",
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
try {
let yts = require("ytsearch-venom")
var arama = await yts(q);
} catch(e) {
    l(e)
return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
}
var mesaj = '';
arama.all.map((video) => {
mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
});
await conn.sendMessage(from , { text:  mesaj }, { quoted: mek } )
} catch (e) {
    l(e)
  reply('*Error !!*')
}
})
cmd({
    pattern: "song",
    alias: ["ytsong"],
    use: '.song yimmy',
    react: "🎧",
      desc: "Download songs",
    category: "download",
    filename: __filename
},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{            
    if (!q) return await reply('*Please enter a query or a url!*')
    const url = q.replace(/\?si=[^&]*/, '');
    var results = await yts(url);
    let wm = config.FOOTER
    var result = results.videos[0]
     let caption = `*╭─「𝙷𝙰𝙽𝚂𝙰𝙼𝙰𝙻-𝙼𝙳」*
*│╭───────────────╮*
*│♘𝚂𝙾𝙽𝙶 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁🎵 ▎*
*├────────────────╯*

*│➢📃 Title:* ${result.title}

*│➢💻 Views:* ${result.views}

*│➢⏰ Duration:* ${result.duration}

*│➢🔗 Url:* ${result.url}`
const buttons = [
  {buttonId: prefix + 'ytaa ' + result.url, buttonText: {displayText: 'AUDIO TYPE'}, type: 1},
{buttonId: `${prefix}ytad ${result.url}±${result.title}`, buttonText: {displayText: 'DOCUMENT TYPE'}, type: 1}
	]
const buttonMessage = {
    image: {url: result.thumbnail},
    caption: caption,
    footer: wm,
    buttons: buttons,
    headerType: 4
}
await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
  reply(N_FOUND)
  console.log(e)
}
})



cmd({
    pattern: "ytaa",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Please give me a youtube url!*')
           const prog = await fetchJson(`https://www.dark-yasiya-api.site/download/ytmp3?url=${q}`)
           
	await conn.sendMessage(from, { audio:{ url: prog.result.dl_link }, mimetype: 'audio/mpeg' }, { quoted: mek });
	await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
	 
         } catch (e) {
	       console.log(e)
        }
    })
    
    
    cmd({
    pattern: "ytad",
    react: "⏳",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Please give me a youtube url!*')
	
	 const data = q.split("±")[0]
        const datas = q.split("±")[1]
         
           const prog = await fetchJson(`https://www.dark-yasiya-api.site/download/ytmp3?url=${data}`)
           await conn.sendMessage(from, { document:{ url: prog.result.dl_link }, mimetype: 'audio/mpeg' , caption: config.FOOTER, fileName: `${datas}.mp3` }, { quoted: mek });
   await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
} catch (e) {
	       console.log(e)
        }
    })
cmd({
    pattern: "video",
    alias: ["ytvideo"],
    use: '.video yimmy',
    react: "📽️",
      desc: "Download videos",
    category: "download",
    filename: __filename
},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{            
    if (!q) return await reply('*Please enter a query or a url!*')
    const url = q.replace(/\?si=[^&]*/, '');
    var results = await yts(url);
    let wm = config.FOOTER
    var result = results.videos[0]
     let caption = `*╭─「𝙷𝙰𝙽𝚂𝙰𝙼𝙰𝙻-𝙼𝙳」*
*│╭───────────────╮*
*│ 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁🎥 ▎*
*├────────────────╯*

*│➢📃 Title:* ${result.title}

*│➢💻 Views:* ${result.views}

*│➢⏰ Duration:* ${result.duration}

*│➢🔗 Url:* ${result.url}`
const buttons = [
{buttonId: `${prefix}360pv ${result.url}` , buttonText: {displayText: '360P VIDEO'}, type: 1},
  {buttonId: `${prefix}480pv ${result.url}` , buttonText: {displayText: '480P VIDEO'}, type: 1},
  {buttonId: `${prefix}720pv ${result.url}` , buttonText: {displayText: '720P VIDEO'}, type: 1},
  {buttonId: `${prefix}1080pv ${result.url}` , buttonText: {displayText: '1080P VIDEO'}, type: 1}
	]
 const buttonMessage = {
    image: {url: result.thumbnail},
    caption: caption,
    footer: wm,
    buttons: buttons,
    headerType: 4
}
await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
  reply(N_FOUND)
  console.log(e)
}
})


 cmd({
    pattern: "360pv",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Please give me a youtube url!*')
	
         
           const prog = await fetchJson(`https://api.fgmods.xyz/api/downloader/ytv?url=${q}&quality=360p&apikey=9b2EtoA5`)
         await conn.sendMessage(from, { video:{ url: prog.result.dl_url }, mimetype: 'video/mp4' }, { quoted: mek });
	await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
         } catch (e) {
	       console.log(e)
        }
    })

cmd({
    pattern: "480pv",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Please give me a youtube url!*')
	
         
           const prog = await fetchJson(`https://api.fgmods.xyz/api/downloader/ytv?url=${q}&quality=480p&apikey=9b2EtoA5`)
         await conn.sendMessage(from, { video:{ url: prog.result.dl_url }, mimetype: 'video/mp4' }, { quoted: mek });
	await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
         } catch (e) {
	       console.log(e)
        }
    })
cmd({
    pattern: "720pv",
    react: "📱",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Please give me a youtube url!*')

	
         
           const prog = await fetchJson(`https://api.fgmods.xyz/api/downloader/ytv?url=${q}&quality=720p&apikey=9b2EtoA5`)
          await conn.sendMessage(from, { video:{ url: prog.result.dl_url }, mimetype: 'video/mp4' }, { quoted: mek });
	await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
} catch (e) {
	console.log(e)
        }
    })
cmd({
    pattern: "1080pv",
    react: "📱",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Need a youtube url!*')
	
         
           const prog = await fetchJson(`https://api.fgmods.xyz/api/downloader/ytv?url=${q}&quality=1080p&apikey=9b2EtoA5`)
           	await conn.sendMessage(from, { video:{ url: prog.result.dl_url }, mimetype: 'video/mp4' }, { quoted: mek });
	        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
	   
         } catch (e) {
	       console.log(e)
        }
    })





async function xnxxs(query) {
  return new Promise((resolve, reject) => {
    const baseurl = "https://www.xnxx.com";
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {
      method: "get",
    })
      .then((res) => res.text())
      .then((res) => {
        const $ = cheerio.load(res, { xmlMode: false });
        const title = [];
        const url = [];
        const desc = [];
        const results = [];
        $("div.mozaique").each(function (a, b) {
          $(b)
            .find("div.thumb")
            .each(function (c, d) {
              url.push(
                baseurl + $(d).find("a").attr("href").replace("/THUMBNUM/", "/")
              );
            });
        });
        $("div.mozaique").each(function (a, b) {
          $(b)
            .find("div.thumb-under")
            .each(function (c, d) {
              desc.push($(d).find("p.metadata").text());
              $(d)
                .find("a")
                .each(function (e, f) {
                  title.push($(f).attr("title"));
                });
            });
        });
        for (let i = 0; i < title.length; i++) {
          results.push({ title: title[i], info: desc[i], link: url[i] });
        }
        resolve({ status: true, result: results });
      })
      .catch((err) => reject({ status: false, result: err }));
  });
}

cmd(
  {
    pattern: "xnxx",
    alias: ["xnxxs"],
    react: "🤫",
    use: ".xnxx <query>",
    desc: "Search and DOWNLOAD VIDEOS from xnxx.",
    category: "download",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      prefix,
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
      isPreUser,
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
      //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
      if (!q) return reply("🚩 *Please give me words to search*");
      let res = await xnxxs(q);
      let data = res.result;
      if (data.length < 1)
        return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek });
      var rows = [];
      res.result.map((v) => {
        rows.push({
          buttonId: prefix + `xnxxdl ${v.link}`,
          buttonText: { displayText: `${v.title}` },
          type: 1,
        });
      });

      const buttonMessage = {
        image: { url: "https://1000logos.net/wp-content/uploads/2021/04/XNXX-logo.png" },
        caption: `⬇️ *X N X X - S E A R C H*`,
        footer: config.FOOTER,
        buttons: rows,
        headerType: 4,
      };
      return await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

//------------------------dl---------------

async function xdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, { method: "get" })
      .then((res) => res.text())
      .then((res) => {
        const $ = cheerio.load(res, { xmlMode: false });
        const title = $('meta[property="og:title"]').attr("content");
        const duration = $('meta[property="og:duration"]').attr("content");
        const image = $('meta[property="og:image"]').attr("content");
        const videoType = $('meta[property="og:video:type"]').attr("content");
        const videoWidth = $('meta[property="og:video:width"]').attr("content");
        const videoHeight = $('meta[property="og:video:height"]').attr(
          "content"
        );
        const info = $("span.metadata").text();
        const videoScript = $("#video-player-bg > script:nth-child(6)").html();
        const files = {
          low: (videoScript.match("html5player.setVideoUrlLow\\('(.*?)'\\);") ||
            [])[1],
          high: videoScript.match(
            "html5player.setVideoUrlHigh\\('(.*?)'\\);" || []
          )[1],
          HLS: videoScript.match(
            "html5player.setVideoHLS\\('(.*?)'\\);" || []
          )[1],
          thumb: videoScript.match(
            "html5player.setThumbUrl\\('(.*?)'\\);" || []
          )[1],
          thumb69: videoScript.match(
            "html5player.setThumbUrl169\\('(.*?)'\\);" || []
          )[1],
          thumbSlide: videoScript.match(
            "html5player.setThumbSlide\\('(.*?)'\\);" || []
          )[1],
          thumbSlideBig: videoScript.match(
            "html5player.setThumbSlideBig\\('(.*?)'\\);" || []
          )[1],
        };
        resolve({
          status: true,
          result: {
            title,
            URL,
            duration,
            image,
            videoType,
            videoWidth,
            videoHeight,
            info,
            files,
          },
        });
      })
      .catch((err) => reject({ status: false, result: err }));
  });
}

cmd(
  {
    pattern: "xnxxdown",
    react: "⬇️",
    alias: ["dlxnxx", "xnxxdl"],
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
      isPreUser,
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
      //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
      if (!q) return reply("*Please give me xnxx url !!*");
      let res = await xdl(q);
      let caption = `𝚇𝙽𝚇𝚇 𝙳𝙻\n`;
      caption += `	◦  *𝚃𝙸𝚃𝙻𝙴* : ${res.result.title}\n`;
      caption += `	◦  *𝙸𝙽𝙵𝙾* : ${res.result.info}\n`;
      caption += `	◦  *𝙳𝚄𝚁𝙰𝚃𝙸𝙾𝙽* : ${res.result.duration}\n`;
      caption += `${config.FOOTER}`;
      let title = res.result.title;
      await conn.sendMessage(
        from,
        {
          document: { url: res.result.files.high },
          mimetype: "video/mp4",
          fileName: `${title}.mp4`,
          caption: caption,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
)
