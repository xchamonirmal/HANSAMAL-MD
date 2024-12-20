const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
let { img2url } = require('@blackamda/telegram-image-url');
const fs = require('fs');
const gis = require('async-g-i-s');
const {unsplash, pixabay} = require("@sl-code-lords/image-library")

var desct = "It convert given text to ai image."
var imgmsg = "*Example: .imagine woman,hair cut collor red,full body,bokeh*"
var cantf = "*Server is busy. Try again later.!*"
let wm = `ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ\nᴄʀᴇᴀᴛᴇᴅ ʙʏ • ʜᴀɴꜱᴀᴍᴀʟ`

cmd({
    pattern: "mute",
    react: "🔇",
    alias: ["close","mute_cyber"],
    desc: "Change to group settings to only admins can send messages.",
    category: "group",
    use: '.mute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'announcement')
 await conn.sendMessage(from , { text: `🔇 *Group Chat closed by Admin ${pushname}*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "unmute",
    react: "🔇",
    alias: ["open","unmute_cyber"],
    desc: "Change to group settings to all members can send messages.",
    category: "group",
    use: '.unmute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'not_announcement')
 await conn.sendMessage(from , { text: `🔇 *Group Chat Opened by Admin ${pushname}*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "lockgs",
    react: "🔇",
    alias: ["lockgsettings"],
    desc: "Change to group settings to only admins can edit group info",
    category: "group",
    use: '.lockgs',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group Command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'locked')
 await conn.sendMessage(from , { text: `🔒 *Group settings Locked*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

//allow everyone to modify the group's settings -- like display picture etc.
//await sock.groupSettingUpdate("abcd-xyz@g.us", 'unlocked')

cmd({
    pattern: "unlockgs",
    react: "🔓",
    alias: ["unlockgsettings"],
    desc: "Change to group settings to all members can edit group info",
    category: "group",
    use: '.unlockgs',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'unlocked')
 await conn.sendMessage(from , { text: `🔓 *Group settings Unlocked*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "leave",
    react: "🔓",
    alias: ["left","kickme"],
    desc: "To leave from the group",
    category: "group",
    use: '.leave',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) {return reply('🚫 *This is Group command*')}
 await conn.sendMessage(from , { text: `🔓 *Good Bye All*` }, { quoted: mek } )
 await conn.groupLeave(from) 
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "updategname",
    react: "🔓",
    alias: ["upgname","gname"],
    desc: "To Change the group name",
    category: "group",
    use: '.updategname',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
if (!q) return reply("🖊️ *Please write the new Group Subject*")
await conn.groupUpdateSubject(from, q )
 await conn.sendMessage(from , { text: `✔️ *Group name Updated*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "bard",
    alias: ["bardai","gbard","googlebard","googleai","ai2"],
    react: '👾',
    desc: desct,
    category: "search",
    use: '.bard hi',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
let apilist = await fetchJson('https://gist.githubusercontent.com/vihangayt0/7dbb65f6adfe21538f7febd13982569a/raw/apilis.json')
let list = apilist.users
let apikey = list[Math.floor(Math.random() * list.length)]
const dataget = await fetchJson(apilist.xz +'api/bard?text='+ q +'&apikey='+ apikey)
return await reply(dataget.content)
} catch (e) {
try{
    const dataget = await fetchJson('https://api.akuari.my.id/ai/gbard?chat=' + q)
return await reply(dataget.respon)
} catch (e) {
reply(cantf)
l(e)
}
}
})
cmd({
    pattern: "updategdesc",
    react: "🔓",
    alias: ["upgdesc","gdesc"],
    desc: "To Change the group description",
    category: "group",
    use: '.updategdesc',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) {return reply('🚫 *You must be admin frist*') }
if (!q) return reply("🖊️ *Please write the new Group Description*")
await conn.groupUpdateDescription(from, q )
 await conn.sendMessage(from , { text: `✔️ *Group Description Updated*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "join",
    react: "📬",
    alias: ["joinme","cyber_join"],
    desc: "To Join a Group from Invite link",
    category: "group",
    use: '.join < Group Link >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
//if (!isGroup) return reply('🚫 *This is Group command*')
if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
if (!q) return reply("🖇️️ *Please write the Group Link*")
 let result = args[0].split('https://chat.whatsapp.com/')[1]
 await conn.groupAcceptInvite(result)
     await conn.sendMessage(from , { text: `✔️ *Successfully Joined*`}, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "joinsup",
    react: "🔖",
    desc: "To leave a group",
    use: '.joinsup',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isOwner) return await reply('🚩 *You must be a bots owner frist*')
await conn.groupAcceptInvite('GC2eZuYTkMp0XR6x9NUdvl')
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
await reply('✅ *You have successfully joined to our support group*')
} catch (e) {
reply('🚩 *You have already joined to our support group*')
l(e)
}
}) 					


cmd({
    pattern: "invite",
    react: "🖇️",
    alias: ["grouplink","glink"],
    desc: "To Get the Group Invite link",
    category: "group",
    use: '.invite',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
const code = await conn.groupInviteCode(from)
//console.log("group code: " + code)
 await conn.sendMessage(from , { text: `🖇️ *Group Link*\n\nhttps://chat.whatsapp.com/${code}`}, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

//await sock.groupRevokeInvite("abcd-xyz@g.us")

cmd({
    pattern: "revoke",
    react: "🖇️",
    alias: ["revokegrouplink","resetglink","revokelink","cyber_revoke"],
    desc: "To Reset the group link",
    category: "group",
    use: '.revoke',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupRevokeInvite(from)
 await conn.sendMessage(from , { text: `⛔ *Group link Reseted*`}, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "kick",
    react: "🥏",
    alias: ["remove"],
    desc: "To Remove a participant from Group",
    category: "group",
    use: '.kick',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
        if (!isGroup) return reply('This is Group only Command')
		if(!isAdmins) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❌ *Bot must be Admin Frist*  ❗")
		const mention = await mentionByTag
		let users = await (mention[0]) || mek.msg.contextInfo.participant
		if (!users) return reply("🚫 *Couldn't find any user in context*")
			await conn.groupParticipantsUpdate(from, [users], "remove")
			await conn.sendMessage(from,{text:`*Successfully removed*  ✔️`},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})

cmd({
    pattern: "promote",
    react: "🥏",
    alias: ["addadmin"],
    desc: "To Add a participatant as a Admin",
    category: "group",
    use: '.promote',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
        if (!isGroup) return reply('This is Group only Command')
		if(!isAdmins) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❓ *Bot must be Admin Frist*")
		const mention= await mentionByTag
		let users = await (mention[0]) || mek.msg.contextInfo.participant
		if (!users) return reply("🚫 *Couldn't find any user in context*")
		const groupAdmins = await getGroupAdmins(participants) 
		if  ( groupAdmins.includes(users)) return reply('❗ *User Already an Admin*  ✔️')
		    await conn.groupParticipantsUpdate(from, [users], "promote")
			await conn.sendMessage(from,{text:`*User promoted as an Admin*  ✔️`},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})

cmd({
    pattern: "demote",
    react: "🥏",
    alias: ["removeadmin"],
    desc: "To Demote Admin to Member",
    category: "group",
    use: '.demote',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
        if (!isGroup) return reply('This is Group only Command')
		if(!isAdmins) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❌  *Bot must be Admin Frist*  ❗")
		const mention= await mentionByTag
		let users = await (mention[0]) || mek.msg.contextInfo.participant
		if (!users) return reply("🚫 *Couldn't find any user in context*")
		const groupAdmins = await getGroupAdmins(participants) 
		if  ( !groupAdmins.includes(users)) return reply('❗ *User Already not an Admin*')
		    await conn.groupParticipantsUpdate(from, [users], "demote")
			await conn.sendMessage(from,{text:`*User No longer an Admin*  ✔️`},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["cyber_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
	     if (!isGroup) return reply(' ❗ *This is Group Command*')
         	if(!isAdmins) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❓ *Bot must be Admin Frist*")
		let teks = `💱 *HI ALL ! GIVE YOUR ATTENTION PLEASE* 
 
`
                for (let mem of participants) {
                teks += `🥎 @${mem.id.split('@')[0]}\n`
                }
                conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek })
                
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})

cmd({
    pattern: "tag",
    react: "🔊",
    alias: ["tg"],
    desc: "To Tag all Members for Message",
    category: "group",
    use: '.tag Hi',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
	     if (!isGroup) return reply(' ❗ *This is Group Command*')
         	if(!isAdmins) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❓ *Bot must be Admin Frist*")
		if(!q && !m.quoted ) return reply('ℹ️ *Please add a message or Quote a text*')
		if (!q) {
		let teks = `${m.quoted.msg}`
                return conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) } )
		}
		let teks = `${q}`
                conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) } )
                
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})


cmd({
    pattern: "ginfo",
    react: "🥏",
    alias: ["groupinfo"],
    desc: "Get group informations.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('⛔ *This is Group only Command* ')
if (!isBotAdmins) return reply('⛔ *Bot must be Admin Frist* ')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be a admin frist*') }
const metadata = await conn.groupMetadata(from) 
let ppUrl = await conn.profilePictureUrl( from , 'image')
const gdata = `\n*${metadata.subject}*

🐉 *Group Jid* - ${metadata.id}

📬 *Participant Count* - ${metadata.size}

👤 *Group Creator* - ${metadata.owner}

📃 *Group Description* - ${metadata.desc}

ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ\nᴀ sɪᴍᴘʟᴇ ᴡᴀʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ʜᴀɴꜱᴀᴍᴀʟ`
await conn.sendMessage(from,{image:{url: ppUrl },caption: gdata },{quoted:mek })
} catch (e) {
reply('⛔ *Error accurated !!*\n\n'+ e )
l(e)
}
})


cmd({
    pattern: "img",
    react: '🖼️',
    alias: ["gimage"],
    desc: "desc",
    category: "download",
    use: '.img car',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
const results = await gis(q);
let data = results.slice(0, 100)
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
let nombor = 1
for (var i = 0; i < data.length; i++) {
srh.push({
title: 'Image number: ' + nombor++ ,
description: data[i].width+'x'+data[i].height,
rowId: prefix + 'dimg ' + data[i].url
});
}
const sections = [{
title: "Result from google. 📲",
rows: srh
}]
const listMessage = { 
text: `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *IMG DOWNLOADER 01*

*🖼️ Image Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from google. 📲',
buttonText: 'Select Image',
sections
}
await conn.listMessage(from, listMessage, mek)

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "img2",
    react: '🖼️',
    alias: ["unsplash"],
    desc: "desc2",
    category: "download",
    use: '.img2 car',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
const results = await unsplash.search({"query": q, page: 1})
let data = results
if (data.result.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
let nombor = 1
for (var i = 0; i < data.result.length; i++) {
srh.push({
title: 'Image number: ' + nombor++ ,
rowId: prefix + 'dimg ' + data.result[i]
});
}
const sections = [{
title: "Result from unsplash.com. 📲",
rows: srh
}]
const listMessage = { 
text: `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *IMG DOWNLOADER 02*

*🖼️ Image Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from unsplash.com. 📲',
buttonText: 'Select Image',
sections
}
await conn.listMessage(from, listMessage, mek)

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "img3",
    react: '🖼️',
    alias: ["pixabay"],
    desc: "desc3",
    category: "download",
    use: '.img3 car',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
const results = await pixabay.search({"query": q, page: 1})
let data = results
if (data.result.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
let nombor = 1
for (var i = 0; i < data.result.length; i++) {
srh.push({
title: 'Image number: ' + nombor++ ,
rowId: prefix + 'dimg ' + data.result[i]
});
}
const sections = [{
title: "Result from pixabay.com. 📲",
rows: srh
}]
const listMessage = { 
text: `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *IMG DOWNLOADER 03*

*🖼️ Image Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from pixabay.com. 📲',
buttonText: 'Select Image',
sections
}
await conn.listMessage(from, listMessage, mek)

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "img4",
    react: '🖼️',
    alias: ["bingimage","bingimg"],
    desc: "desc4",
    category: "download",
    use: '.img4 car',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
const results = await fetchJson('https://api.akuari.my.id/search/bingimage?query=' + q)
let data = results.hasil
if (data.results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
let nombor = 1
for (var i = 0; i < data.results.length; i++) {
srh.push({
title: data.results[i].title ,
description: data.results[i].description ,
rowId: prefix + 'dimg ' + data.results[i].direct
});
}
const sections = [{
title: "Result from bing 📲",
rows: srh
}]
const listMessage = { 
text: `┌───[ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ]

   *IMG DOWNLOADER 04*

*🖼️ Image Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from bing 📲',
buttonText: 'Select Image',
sections
}
await conn.listMessage(from, listMessage, mek)

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "dimg",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🔃', key: mek.key }})
    await conn.sendMessage(from, { image: { url: q }, caption: config.FOOTER }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "anime",
    alias: ["animesearch","sanime"],
    react: "⛩️",
    desc: "descgs",
    category: "search",
    use: '.anime astro',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply(img)
let anu = await fetchJson(`https://api.jikan.moe/v4/anime?q=${q}`)
let sections = []   
for (let i of anu.data) {
const list = {title: `${i.title}`,
rows: [
{
title: `${i.title}`, 
rowId: `${prefix}animeeg ${i.mal_id}`
}, 
]
}
sections.push(list)   
}
let listset = {
text: `┌───[*ʜᴀɴꜱᴀᴍᴀʟ-ᴍᴅ*]

   *ANIME SEARCH*
   
*Search Results From* ${q}`,
footer: config.FOOTER,
title: "",
buttonText: '*🔢 Reply below number*',
sections
}
await conn.listMessage(
from, 
listset,mek)
} catch (e) {
  reply(cants)
  l(e)
}})


cmd({
    pattern: "animeeg",
    dontAddCommandList: true,
    filename: __filename
  },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{
  await conn.sendMessage(from, { react: { text: '🔃', key: mek.key }})
  res = await fetchJson(`https://api.jikan.moe/v4/anime/${q}`)
  let txt = `*TITLE:* *${res.data.title}*\n*ENGLISH:* *${res.data.title_english}*\n*JAPANESE:* *${res.data.title_japanese}*\n*TYPE ANIME:* *${res.data.type}*\n*ADAPTER:* *${res.data.source}*\n*TOTAL EPISODE:* *${res.data.episodes}*\n*STATUS:* *${res.data.status}*\n*ONGOING:* *${res.data.airing ? 'Ya' : 'DRIS'}*\n*AIRED:* *${res.data.aired.string}*\n*DURATION:* *${res.data.duration}*\n*RATING:* *${res.data.rating}*\n*SCORE:* *${res.data.score}*\n*RANK:* *${res.data.rank}*\n*STUDIO:* *${res.data.studios[0].name}* `
  conn.sendMessage(from, { image : { url : res.data.images.jpg.image_url}, caption : txt}, {quoted :mek }).catch((err) => reply(''))
  await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
  } catch (e) {
  reply(cants)
  l(e)
  }
  })
  
  

cmd({
    pattern: "texttoimgv1",
    alias: ["texttoimagev1","toimagev1","t2iv1"],
    react: '🤖',
    category: "menu",
    desc: "woman,hair cut collor red,full body,bokeh",
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
    category: "menu",
    desc: "woman,hair cut collor red,full body,bokeh",
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
    category: "menu",
    desc: "woman,hair cut collor red,full body,bokeh",
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
    category: "menu",
    desc: "woman,hair cut collor red,full body,bokeh",
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
    category: "menu",
    desc: "It gives phone size screenshot of given url.",
    use: '.aemtv1',
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
    category: "menu",
    desc: "It gives phone size screenshot of given url.",
    use: '.aemtv2',
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
    category: "menu",
    desc: "It gives phone size screenshot of given url.",
    use: '.aemtv3',
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
    category: "menu",
    desc: "It gives phone size screenshot of given url.",
    use: '.aemtv4',
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
    category: "menu",
    desc: "It gives phone size screenshot of given url.",
    use: '.aemtv5',
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
    category: "menu",
    desc: "It gives phone size screenshot of given url.",
    use: '.aemtv6',
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
//=============================================================
cmd({
    pattern: "aemtv6",
    react: "💫",
    category: "menu",
    desc: "It gives phone size screenshot of given url.",
    use: '.aemtv6',
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
    pattern: "img2url",
    react: "🔗",
    alias: ["tourl","imgurl","telegraph","imgtourl"],
    desc: desct,
    category: "convert",
    use: '.img2url <reply image>',
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
    await reply('\n' + url + '\n');
});
    } else return reply(imgmsg)
} catch (e) {
  reply(cantf);
  l(e);
}
})

//==============================================================

const mumaker = require('mumaker')

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
    pattern: "colorize",
    react: "🎨",
    alias: ["colorizer","tocolour","colourize"],
    desc: "desct",
    category: "convert",
    use: '.colorize <reply black & white image>',
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
    try{
      await conn.sendMessage(from, { image: await getBuffer('https://vihangayt.me/tools/colorize?url='+url), caption: config.FOOTER }, { quoted: mek })
    } catch (e) {
      let apilist = await fetchJson('https://gist.githubusercontent.com/vihangayt0/7dbb65f6adfe21538f7febd13982569a/raw/apilis.json')
      let list = apilist.users
      let apikey = list[Math.floor(Math.random() * list.length)]
      await conn.sendMessage(from, { image: { url: apilist.xz +'api/colorizer?url='+url+'&apikey=' + apikey }, caption: config.FOOTER }, { quoted: mek })
    }
});
    } else return reply(imgmsg)
} catch (e) {
  reply(cantf);
  l(e);
}
})
