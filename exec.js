require("./media/settings/config");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  jidDecode,
  proto,
  getContentType,
  downloadContentFromMessage,
  fetchLatestWaWebVersion
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const pino = require("pino");
const path = require("path");
const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const figlet = require("figlet");
const FileType = require("file-type");
const chalk = require("chalk");
const _ = require("lodash");
const {
  exec,
  spawn,
  execSync
} = require("child_process");
const {
  Boom
} = require("@hapi/boom");
const PhoneNumber = require("awesome-phonenumber");
const readline = require("readline");
const {
  smsg,
  color,
  getBuffer
} = require("./library/myfunc");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("./library/exif");
const {
  toAudio,
  toPTT,
  toVideo
} = require("./library/converter");
const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store"
  })
});
const level = pino({
  level: "silent"
});
const low = require("./library/lowdb");
const yargs = require("yargs/yargs");
const {
  Low,
  JSONFile
} = low;
const mongoDB = require("./library/mongoDB");
const {
  move
} = require("./library/simple");
paired = false;
const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
const dbPath = "./media/database/dbmongo.json";
urldb = "";
let db;
if (urldb !== "") {
  db = new mongoDB(urldb);
  console.log("[Berhasil tersambung ke database MongoDB]");
} else {
  db = new JSONFile(dbPath);
  console.log("[Berhasil tersambung ke database Lokal]");
}
global.db = new Low(db);
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(_0x4e8666 => setInterval(function () {
      if (!global.db.READ) {
        clearInterval(this);
        _0x4e8666(global.db.data == null ? global.loadDatabase() : global.db.data);
      } else {
        null;
      }
    }, 1000));
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {})
  };
  global.db.chain = _.chain(global.db.data);
};
global.loadDatabase();
process.on("uncaughtException", console.error);
if (global.db && urldb !== "") {
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write();
    }
  }, 30000);
}
let pluginFolder = path.join(__dirname, "./media/plugins");
let pluginFilter = _0x367416 => /\.js$/.test(_0x367416);
global.plugins = {};
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename));
  } catch (_0x132441) {
    console.log(_0x132441);
    delete global.plugins[filename];
  }
}
console.log(Object.keys(global.plugins));
function createTmpFolder() {
  const _0x41f707 = "media/tmp";
  const _0x24ff4c = path.join(__dirname, _0x41f707);
  if (!fs.existsSync(_0x24ff4c)) {
    fs.mkdirSync(_0x24ff4c);
    console.log("Folder '" + _0x41f707 + "' berhasil dibuat.");
  } else {
    console.log("Folder '" + _0x41f707 + "' sudah ada.");
  }
}
createTmpFolder();
const pairingCode = process.argv.includes("code");
const _0x4e6fef = {
  input: process.stdin,
  output: process.stdout
};
const rl = readline.createInterface(_0x4e6fef);
const question = _0x1ffa8 => new Promise(_0x427ef3 => rl.question(_0x1ffa8, _0x427ef3));
async function startBotz() {
  const {
    state: _0x51d5bc,
    saveCreds: _0x5821f3
  } = await useMultiFileAuthState("./media/database/session");
  const {
    version: _0x31e42e
  } = await fetchLatestBaileysVersion();
  const _0x1c14c2 = makeWASocket({
    logger: pino({
      level: "silent"
    }),
    auth: _0x51d5bc,
    version: [2, 3000, 1017531287],
    browser: ["Ubuntu", "Safari", "20.0.00"],
    markOnlineOnConnect: true
  });
  async function _0xd90394(_0x2fc6b4, _0x4fda4c, _0x2b0991) {
    const _0x32b793 = path.join(__dirname, "media/settings/ownerConfig.js");
    const _0x481cfd = "\nconst fs = require('fs')\n// gausah di ubah rek karna\n// udh ada request pas di scan pairing\nglobal.ownername = '" + _0x2fc6b4 + "';\nglobal.owner = '" + _0x4fda4c + "';\nglobal.botname = '" + _0x2b0991 + "';\n\nlet file = require.resolve(__filename)\nfs.watchFile(file, () => {\n    fs.unwatchFile(file)\n    delete require.cache[file]\n    require(file)\n})\n";
    fs.writeFileSync(_0x32b793, _0x481cfd, "utf-8");
    console.log("File ownerConfig.js berhasil dibuat atau diperbarui.");
  }
  if (!_0x1c14c2.authState.creds.registered) {
    console.log(chalk.white.bold("- Masukkan nama owner:"));
    const _0x3bbb89 = await question("input:");
    const _0x32a18d = _0x3bbb89.trim();
    console.log(chalk.white.bold("- Masukkan nomor owner (diawali 62, 45, 60, etc):"));
    const _0x3ec8d2 = await question("input:");
    const _0xe222ea = _0x3ec8d2.trim();
    console.log(chalk.white.bold("- Masukkan nama bot (contoh: Lutfizx bot)"));
    const _0x36caca = await question("input:");
    const _0x5bbb39 = _0x36caca.trim();
    await _0xd90394(_0x32a18d, _0xe222ea, _0x5bbb39);
    if (!paired) {
      paired = true;
      console.log(chalk.white.bold("Masukkan nomor Bot untuk Scan (diawali 62, 45, 60, etc):"));
      const _0x284122 = await question("input:");
      let _0x295f31 = await _0x1c14c2.requestPairingCode(_0x284122);
      _0x295f31 = _0x295f31?.match(/.{1,4}/g)?.join("-") || _0x295f31;
      console.log("Kode kamu:", _0x295f31);
      console.log("salin code di atas dan jangan lupa subscribe agar berhasil & mendapatkan update terbaru");
      console.log("salin code di atas dan jangan lupa subscribe agar berhasil & mendapatkan update terbaru");
      console.log("salin code di atas dan jangan lupa subscribe agar berhasil & mendapatkan update terbaru");
    }
  }
  store.bind(_0x1c14c2.ev);
  _0x1c14c2.ev.on("messages.upsert", async _0x29a8a9 => {
    try {
      const _0x495f2 = _0x29a8a9.messages[0];
      if (!_0x495f2.message) {
        return;
      }
      _0x495f2.message = Object.keys(_0x495f2.message)[0] === "ephemeralMessage" ? _0x495f2.message.ephemeralMessage.message : _0x495f2.message;
      if (_0x495f2.key && _0x495f2.key.remoteJid === "status@broadcast") {
        return;
      }
      if (!_0x1c14c2.public && !_0x495f2.key.fromMe && _0x29a8a9.type === "notify") {
        return;
      }
      if (_0x495f2.key.id.startsWith("BAE5") && _0x495f2.key.id.length === 16) {
        return;
      }
      move(_0x1c14c2, _0x495f2, store);
      smsg(_0x1c14c2, _0x495f2, store);
      require("./connect/xZiyy")(_0x1c14c2, _0x495f2, _0x29a8a9, store);
    } catch (_0x1c5cea) {
      console.log(_0x1c5cea);
    }
  });
  _0x1c14c2.public = true;
  _0x1c14c2.decodeJid = _0x4096eb => {
    if (!_0x4096eb) {
      return _0x4096eb;
    }
    if (/:\d+@/gi.test(_0x4096eb)) {
      let _0x1a0a91 = jidDecode(_0x4096eb) || {};
      return _0x1a0a91.user && _0x1a0a91.server && _0x1a0a91.user + "@" + _0x1a0a91.server || _0x4096eb;
    } else {
      return _0x4096eb;
    }
  };
  _0x1c14c2.ev.on("contacts.update", _0x50f2df => {
    for (let _0x5b844d of _0x50f2df) {
      let _0x5afd0c = _0x1c14c2.decodeJid(_0x5b844d.id);
      if (store && store.contacts) {
        store.contacts[_0x5afd0c] = {
          id: _0x5afd0c,
          name: _0x5b844d.notify
        };
      }
    }
  });
  _0x1c14c2.ev.on("group-participants.update", async _0x2d4b99 => {
    const {
      id: _0x127709,
      author: _0x39485c,
      participants: _0x6de0f5,
      action: _0x56a34d
    } = _0x2d4b99;
    try {
      if (global.db.data.chats[_0x127709] && global.db.data.chats[_0x127709].welcome == true) {
        console.log(_0x56a34d);
        const _0x8ed2ea = await _0x1c14c2.groupMetadata(_0x127709);
        let _0x3eab37 = _0x8ed2ea.subject;
        let _0x40ab61 = _0x8ed2ea.desc || "Tidak ada deskripsi";
        let _0x5dcb01;
        for (let _0x29a130 of _0x6de0f5) {
          let _0x253249;
          try {
            _0x253249 = await _0x1c14c2.profilePictureUrl(_0x29a130, "image");
          } catch {
            _0x253249 = "https://telegra.ph/file/95670d63378f7f4210f03.png";
          }
          let _0x228ca8 = "https://api.siputzx.my.id/api/canvas/welcomev4?avatar=https://telegra.ph/file/95670d63378f7f4210f03.png&background=https://i.top4top.io/p_3223dedas1.jpg&description=welcome hope you are here";
          if (_0x56a34d == "add") {
            let _0x9f1bde = global.db.data.chats[_0x127709]?.welcomeText || "⟡ 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 ⟡\n✦ @user selamat datang di @group\n\n> Ayo bantu ramaikan grup ini!\nKalau kamu merasa grup ini bermanfaat atau menarik,\njangan ragu buat bagikan ke teman-temanmu ya.\nSemakin ramai, semakin seru.";
            let _0x20ced9 = _0x9f1bde.replace(/@user/gi, "@" + _0x29a130.split("@")[0]).replace(/@author/gi, _0x39485c ? "@" + _0x39485c.split("@")[0] : "").replace(/@group/gi, _0x3eab37).replace(/@desc/gi, _0x40ab61);
            const _0xe56534 = {
              thumbnailUrl: _0x228ca8,
              title: "W E L C O M E 👋",
              body: "",
              sourceUrl: "https://whatsapp.com/channel/0029VbAUashAu3aYDTjzqq0v",
              renderLargerThumbnail: true,
              mediaType: 1
            };
            const _0x2aba27 = {
              mentionedJid: [_0x29a130, _0x39485c],
              externalAdReply: _0xe56534
            };
            const _0x464247 = {
              text: _0x20ced9,
              contextInfo: _0x2aba27
            };
            await _0x1c14c2.sendMessage(_0x127709, _0x464247);
          } else if (_0x56a34d == "remove") {
            let _0x1c21e9 = "https://api.siputzx.my.id/api/canvas/goodbyev4?avatar=https://telegra.ph/file/95670d63378f7f4210f03.png&background=https://i.top4top.io/p_3223dedas1.jpg&description=goodbye, may you rest in peace there";
            let _0x2f200b = global.db.data.chats[_0x127709]?.leaveText || "@user telah keluar dari group @group";
            let _0x24abea = _0x2f200b.replace(/@user/gi, "@" + _0x29a130.split("@")[0]).replace(/@author/gi, _0x39485c ? "@" + _0x39485c.split("@")[0] : "").replace(/@group/gi, _0x3eab37).replace(/@desc/gi, _0x40ab61);
            const _0x1f2872 = {
              thumbnailUrl: _0x1c21e9,
              title: "G O O D B Y E 👋",
              body: "",
              sourceUrl: "https://whatsapp.com/channel/0029VbAUashAu3aYDTjzqq0v",
              renderLargerThumbnail: true,
              mediaType: 1
            };
            const _0x28d9de = {
              mentionedJid: [_0x39485c, _0x29a130],
              externalAdReply: _0x1f2872
            };
            const _0x155937 = {
              text: _0x24abea,
              contextInfo: _0x28d9de
            };
            await _0x1c14c2.sendMessage(_0x127709, _0x155937);
          } else if (_0x56a34d == "promote") {
            _0x5dcb01 = _0x39485c == _0x29a130 ? "@" + _0x29a130.split("@")[0] + " telah *menjadi admin* grup " : _0x39485c !== _0x29a130 ? "@" + _0x39485c.split("@")[0] + " telah *menjadikan* @" + _0x29a130.split("@")[0] + " sebagai *admin* grup" : "";
            const _0x479bbf = {
              thumbnail: global.imgUrl,
              title: "P R O M O T E ",
              body: "",
              sourceUrl: "https://whatsapp.com/channel/0029VbAUashAu3aYDTjzqq0v",
              renderLargerThumbnail: true,
              mediaType: 1
            };
            const _0x35aa47 = {
              mentionedJid: [_0x39485c, _0x29a130],
              externalAdReply: _0x479bbf
            };
            const _0x556794 = {
              text: _0x5dcb01,
              contextInfo: _0x35aa47
            };
            await _0x1c14c2.sendMessage(_0x127709, _0x556794);
          } else if (_0x56a34d == "demote") {
            _0x5dcb01 = _0x39485c == _0x29a130 ? "@" + _0x29a130.split("@")[0] + " telah *berhenti* menjadi *admin*" : _0x39485c !== _0x29a130 ? "@" + _0x39485c.split("@")[0] + " telah *menghentikan* @" + _0x29a130.split("@")[0] + " sebagai *admin* grup" : "";
            const _0x221602 = {
              thumbnail: global.imgUrl,
              title: "D E M O T E ",
              body: "",
              sourceUrl: "https://whatsapp.com/channel/0029VbAUashAu3aYDTjzqq0v",
              renderLargerThumbnail: true,
              mediaType: 1
            };
            const _0x15dc4e = {
              mentionedJid: [_0x39485c, _0x29a130],
              externalAdReply: _0x221602
            };
            const _0x4b219d = {
              text: _0x5dcb01,
              contextInfo: _0x15dc4e
            };
            await _0x1c14c2.sendMessage(_0x127709, _0x4b219d);
          }
        }
      }
    } catch (_0x4363fa) {}
  });
  _0x1c14c2.getName = (_0x30a9eb, _0x10a675 = false) => {
    id = _0x1c14c2.decodeJid(_0x30a9eb);
    _0x10a675 = _0x1c14c2.withoutContact || _0x10a675;
    let _0x5429e6;
    if (id.endsWith("@g.us")) {
      return new Promise(async _0x2dbf2d => {
        _0x5429e6 = store.contacts[id] || {};
        if (!_0x5429e6.name && !_0x5429e6.subject) {
          _0x5429e6 = _0x1c14c2.groupMetadata(id) || {};
        }
        _0x2dbf2d(_0x5429e6.name || _0x5429e6.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    } else {
      _0x5429e6 = id === "0@s.whatsapp.net" ? {
        id: id,
        name: "WhatsApp"
      } : id === _0x1c14c2.decodeJid(_0x1c14c2.user.id) ? _0x1c14c2.user : store.contacts[id] || {};
    }
    return (_0x10a675 ? "" : _0x5429e6.name) || _0x5429e6.subject || _0x5429e6.verifiedName || PhoneNumber("+" + _0x30a9eb.replace("@s.whatsapp.net", "")).getNumber("international");
  };
  _0x1c14c2.ev.on("connection.update", async _0x4bd051 => {
    if (_0x4bd051.receivedPendingNotifications == "true") {
      console.log("Please wait About 1 Minute...");
      _0x1c14c2.ev.flush();
    }
    let {
      Connecting: _0x3fe6d8
    } = require("./connect/systemConnext.js");
    const _0x310e1e = {
      update: _0x4bd051,
      fuzzy: _0x1c14c2,
      Boom: Boom,
      DisconnectReason: DisconnectReason,
      startBotz: startBotz
    };
    _0x3fe6d8(_0x310e1e);
  });
  _0x1c14c2.ev.on("creds.update", _0x5821f3);
  _0x1c14c2.getFile = async (_0x1d0fde, _0x537394) => {
    let _0x1fea21;
    let _0xd09118;
    const _0x15aafd = Buffer.isBuffer(_0x1d0fde) ? _0x1d0fde : /^data:.*?\/.*?;base64,/i.test(_0x1d0fde) ? Buffer.from(_0x1d0fde.split`,`[1], "base64") : /^https?:\/\//.test(_0x1d0fde) ? await (_0x1fea21 = await fetch(_0x1d0fde)).buffer() : fs.existsSync(_0x1d0fde) ? (_0xd09118 = _0x1d0fde, fs.readFileSync(_0x1d0fde)) : typeof _0x1d0fde === "string" ? _0x1d0fde : Buffer.alloc(0);
    if (!Buffer.isBuffer(_0x15aafd)) {
      throw new TypeError("Result is not a buffer");
    }
    const _0x4a48b5 = (await FileType.fromBuffer(_0x15aafd)) || {
      mime: "application/octet-stream",
      ext: ".bin"
    };
    if (_0x15aafd && _0x537394 && !_0xd09118) {
      _0xd09118 = path.join(__dirname, "./media/tmp/" + new Date() * 1 + "." + _0x4a48b5.ext);
      await fs.promises.writeFile(_0xd09118, _0x15aafd);
    }
    return {
      res: _0x1fea21,
      filename: _0xd09118,
      ..._0x4a48b5,
      data: _0x15aafd,
      deleteFile() {
        return _0xd09118 && fs.promises.unlink(_0xd09118);
      }
    };
  };
  _0x1c14c2.parseMention = (_0xa9ebb4 = "") => {
    return [..._0xa9ebb4.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x3b6326 => _0x3b6326[1] + "@s.whatsapp.net");
  };
  _0x1c14c2.sendVideoAsSticker = async (_0x56ddfd, _0x11d9de, _0x4e952e, _0x4a942c = {}) => {
    let _0xea2372 = Buffer.isBuffer(_0x11d9de) ? _0x11d9de : /^data:.*?\/.*?;base64,/i.test(_0x11d9de) ? Buffer.from(_0x11d9de.split`,`[1], "base64") : /^https?:\/\//.test(_0x11d9de) ? await await getBuffer(_0x11d9de) : fs.existsSync(_0x11d9de) ? fs.readFileSync(_0x11d9de) : Buffer.alloc(0);
    let _0x196daf;
    if (_0x4a942c && (_0x4a942c.packname || _0x4a942c.author)) {
      _0x196daf = await writeExifVid(_0xea2372, _0x4a942c);
    } else {
      _0x196daf = await videoToWebp(_0xea2372);
    }
    const _0x20043d = {
      url: _0x196daf
    };
    const _0x24c546 = {
      sticker: _0x20043d,
      ..._0x4a942c
    };
    const _0x448f9 = {
      quoted: _0x4e952e
    };
    await XeonBotInc.sendMessage(_0x56ddfd, _0x24c546, _0x448f9);
    return _0x196daf;
  };
  _0x1c14c2.downloadMediaMessage = async _0xe6ddf1 => {
    let _0x5f47c5 = (_0xe6ddf1.msg || _0xe6ddf1).mimetype || "";
    let _0x5612da = _0xe6ddf1.mtype ? _0xe6ddf1.mtype.replace(/Message/gi, "") : _0x5f47c5.split("/")[0];
    const _0x2f5de9 = await downloadContentFromMessage(_0xe6ddf1, _0x5612da);
    let _0x367d48 = Buffer.from([]);
    for await (const _0x234d83 of _0x2f5de9) {
      _0x367d48 = Buffer.concat([_0x367d48, _0x234d83]);
    }
    return _0x367d48;
  };
  _0x1c14c2.sendTextWithMentions = async (_0x15f9c0, _0x4a1f8f, _0x6a0eef, _0x415d24 = {}) => _0x1c14c2.sendMessage(_0x15f9c0, {
    text: _0x4a1f8f,
    mentions: [..._0x4a1f8f.matchAll(/@(\d{0,16})/g)].map(_0x26f7cd => _0x26f7cd[1] + "@s.whatsapp.net"),
    ..._0x415d24
  }, {
    quoted: _0x6a0eef
  });
  _0x1c14c2.sendContact = async (_0x307cbe, _0x3097db, _0x44b9e9 = "", _0x375fce = {}) => {
    let _0x52cb47 = [{
      displayName: await _0x1c14c2.getName(_0x3097db),
      vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await _0x1c14c2.getName(_0x3097db)) + "\nFN:" + (await _0x1c14c2.getName(_0x3097db)) + "\nitem1.TEL;waid=" + _0x3097db + ":" + _0x3097db + "\nitem1.X-ABLabel:Click here ( Owner )\nitem2.EMAIL;type=INTERNET:" + global.email + "\nitem2.X-ABLabel:email\nitem3.URL:" + global.web + "\nitem3.X-ABLabel:email\nitem4.ADR:;;" + global.location + ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
    }, {
      displayName: await _0x1c14c2.getName(Buffer.from("NjI4MzE1OTQ1MTQ4Nw==", "base64").toString("utf-8")),
      vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await _0x1c14c2.getName(Buffer.from("NjI4MzE1OTQ1MTQ4Nw==", "base64").toString("utf-8"))) + "\nFN:" + (await _0x1c14c2.getName(Buffer.from("NjI4MzE1OTQ1MTQ4Nw==", "base64").toString("utf-8"))) + "\nitem1.TEL;waid=" + Buffer.from("NjI4MzE1OTQ1MTQ4Nw==", "base64").toString("utf-8") + ":" + Buffer.from("NjI4MzE1OTQ1MTQ4Nw==", "base64").toString("utf-8") + "\nitem1.X-ABLabel:Developer\nitem2.EMAIL;type=INTERNET:" + Buffer.from("aHR0cHM6Ly9naXRodWIuY29tL3haaXl5eQ==", "base64").toString("utf-8") + "\nitem2.X-ABLabel:github\nitem3.URL:" + Buffer.from("aHR0cHM6Ly94eml5eS5teS5pZC8=", "base64").toString("utf-8") + "\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;pluto;;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
    }];
    const _0x278f95 = {
      displayName: _0x52cb47.length + " Contact",
      contacts: _0x52cb47
    };
    const _0x4e84be = {
      contacts: _0x278f95,
      ..._0x375fce
    };
    const _0x3700ca = {
      quoted: _0x44b9e9
    };
    _0x1c14c2.sendMessage(_0x307cbe, _0x4e84be, _0x3700ca);
  };
  _0x1c14c2.sendFile = async (_0xc046d2, _0x36bf2e, _0x101663 = "", _0x341b28 = "", _0x231e05, _0x3a40e1 = false, _0x453d8e = {}) => {
    let _0x4f75b0 = await _0x1c14c2.getFile(_0x36bf2e, true);
    let {
      res: _0x447697,
      data: _0x417bb8,
      filename: _0x41ec04
    } = _0x4f75b0;
    if (_0x447697 && _0x447697.status !== 200 || _0x417bb8.length <= 65536) {
      try {
        throw {
          json: JSON.parse(_0x417bb8.toString())
        };
      } catch (_0x28d2d8) {
        if (_0x28d2d8.json) {
          throw _0x28d2d8.json;
        }
      }
    }
    const _0x4f6480 = {
      filename: _0x101663
    };
    let _0x5ba9a8 = _0x4f6480;
    if (_0x231e05) {
      _0x5ba9a8.quoted = _0x231e05;
    }
    if (!_0x4f75b0) {
      _0x453d8e.asDocument = true;
    }
    let _0x42d75b = "";
    let _0x2ce747 = _0x4f75b0.mime;
    let _0x4b3508;
    if (/webp/.test(_0x4f75b0.mime) || /image/.test(_0x4f75b0.mime) && _0x453d8e.asSticker) {
      _0x42d75b = "sticker";
    } else if (/image/.test(_0x4f75b0.mime) || /webp/.test(_0x4f75b0.mime) && _0x453d8e.asImage) {
      _0x42d75b = "image";
    } else if (/video/.test(_0x4f75b0.mime)) {
      _0x42d75b = "video";
    } else if (/audio/.test(_0x4f75b0.mime)) {
      _0x4b3508 = await (_0x3a40e1 ? toPTT : toAudio)(_0x417bb8, _0x4f75b0.ext);
      _0x417bb8 = _0x4b3508.data;
      _0x41ec04 = _0x4b3508.filename;
      _0x42d75b = "audio";
      _0x2ce747 = "audio/ogg; codecs=opus";
    } else {
      _0x42d75b = "document";
    }
    if (_0x453d8e.asDocument) {
      _0x42d75b = "document";
    }
    const _0x34d668 = {
      url: _0x41ec04
    };
    const _0x559b1d = {
      ..._0x453d8e
    };
    _0x559b1d.caption = _0x341b28;
    _0x559b1d.ptt = _0x3a40e1;
    _0x559b1d[_0x42d75b] = _0x34d668;
    _0x559b1d.mimetype = _0x2ce747;
    let _0xdd395e = _0x559b1d;
    let _0x548635;
    try {
      const _0x331b88 = {
        ..._0x5ba9a8,
        ..._0x453d8e
      };
      _0x548635 = await _0x1c14c2.sendMessage(_0xc046d2, _0xdd395e, _0x331b88);
    } catch (_0x2e43c1) {
      console.error(_0x2e43c1);
      _0x548635 = null;
    } finally {
      const _0x3a7149 = {
        ..._0xdd395e
      };
      _0x3a7149[_0x42d75b] = _0x417bb8;
      const _0x4cbd0c = {
        ..._0x5ba9a8,
        ..._0x453d8e
      };
      if (!_0x548635) {
        _0x548635 = await _0x1c14c2.sendMessage(_0xc046d2, _0x3a7149, _0x4cbd0c);
      }
      return _0x548635;
    }
  };
  _0x1c14c2.sendVideoAsSticker = async (_0x3d4b82, _0x3a3774, _0x39ec35, _0x622179 = {}) => {
    let _0x35e46f = Buffer.isBuffer(_0x3a3774) ? _0x3a3774 : /^data:.*?\/.*?;base64,/i.test(_0x3a3774) ? Buffer.from(_0x3a3774.split`,`[1], "base64") : /^https?:\/\//.test(_0x3a3774) ? await await getBuffer(_0x3a3774) : fs.existsSync(_0x3a3774) ? fs.readFileSync(_0x3a3774) : Buffer.alloc(0);
    let _0x5bd605;
    if (_0x622179 && (_0x622179.packname || _0x622179.author)) {
      _0x5bd605 = await writeExifVid(_0x35e46f, _0x622179);
    } else {
      _0x5bd605 = await videoToWebp(_0x35e46f);
    }
    const _0x31a1a2 = {
      url: _0x5bd605
    };
    const _0x138348 = {
      sticker: _0x31a1a2,
      ..._0x622179
    };
    const _0x5e312d = {
      quoted: _0x39ec35
    };
    await _0x1c14c2.sendMessage(_0x3d4b82, _0x138348, _0x5e312d);
    return _0x5bd605;
  };
  _0x1c14c2.downloadAndSaveMediaMessage = async (_0x546d14, _0x5c3f44, _0xdae5ed = true) => {
    let _0x572928 = _0x546d14.msg ? _0x546d14.msg : _0x546d14;
    let _0x2504a9 = (_0x546d14.msg || _0x546d14).mimetype || "";
    let _0x21a549 = _0x546d14.mtype ? _0x546d14.mtype.replace(/Message/gi, "") : _0x2504a9.split("/")[0];
    const _0xe1f31c = await downloadContentFromMessage(_0x572928, _0x21a549);
    let _0x3bcfde = Buffer.from([]);
    for await (const _0x5abf7b of _0xe1f31c) {
      _0x3bcfde = Buffer.concat([_0x3bcfde, _0x5abf7b]);
    }
    let _0x539141 = await FileType.fromBuffer(_0x3bcfde);
    trueFileName = _0xdae5ed ? _0x5c3f44 + "." + _0x539141.ext : _0x5c3f44;
    await fs.writeFileSync(trueFileName, _0x3bcfde);
    return trueFileName;
  };
  _0x1c14c2.sendImage = async (_0x393788, _0x1acce2, _0x227121 = "", _0x31ad9e = "", _0x4fc1c5) => {
    let _0x11d51e = Buffer.isBuffer(_0x1acce2) ? _0x1acce2 : /^data:.*?\/.*?;base64,/i.test(_0x1acce2) ? Buffer.from(_0x1acce2.split`,`[1], "base64") : /^https?:\/\//.test(_0x1acce2) ? await (await fetch(_0x1acce2)).buffer() : fs.existsSync(_0x1acce2) ? fs.readFileSync(_0x1acce2) : Buffer.alloc(0);
    const _0x2aad1f = {
      image: _0x11d51e,
      caption: _0x227121,
      ..._0x4fc1c5
    };
    const _0x1bbf78 = {
      quoted: _0x31ad9e
    };
    return await _0x1c14c2.sendMessage(_0x393788, _0x2aad1f, _0x1bbf78);
  };
  _0x1c14c2.downloadAndSaveMediaMessage = async (_0x5f0c74, _0x4898db, _0x5074e7 = true) => {
    let _0x3c4c4a = _0x5f0c74.msg ? _0x5f0c74.msg : _0x5f0c74;
    let _0x3a388a = (_0x5f0c74.msg || _0x5f0c74).mimetype || "";
    let _0x100561 = _0x5f0c74.mtype ? _0x5f0c74.mtype.replace(/Message/gi, "") : _0x3a388a.split("/")[0];
    const _0x49d7d7 = await downloadContentFromMessage(_0x3c4c4a, _0x100561);
    let _0x52bb2f = Buffer.from([]);
    for await (const _0x7485df of _0x49d7d7) {
      _0x52bb2f = Buffer.concat([_0x52bb2f, _0x7485df]);
    }
    let _0xb12a7 = await FileType.fromBuffer(_0x52bb2f);
    let _0x1f698c = _0x5074e7 ? _0x4898db + "." + _0xb12a7.ext : _0x4898db;
    let _0x272e91 = path.join(__dirname, "media/tmp", _0x1f698c);
    await fs.writeFileSync(_0x272e91, _0x52bb2f);
    return _0x272e91;
  };
  _0x1c14c2.sendImageAsSticker = async (_0xc0eaed, _0x4df109, _0x27cffa, _0x4461a2 = {}) => {
    let _0x50d837 = Buffer.isBuffer(_0x4df109) ? _0x4df109 : /^data:.*?\/.*?;base64,/i.test(_0x4df109) ? Buffer.from(_0x4df109.split`,`[1], "base64") : /^https?:\/\//.test(_0x4df109) ? await await getBuffer(_0x4df109) : fs.existsSync(_0x4df109) ? fs.readFileSync(_0x4df109) : Buffer.alloc(0);
    let _0x2d94de;
    if (_0x4461a2 && (_0x4461a2.packname || _0x4461a2.author)) {
      _0x2d94de = await writeExifImg(_0x50d837, _0x4461a2);
    } else {
      _0x2d94de = await imageToWebp(_0x50d837);
    }
    const _0x3a88be = {
      url: _0x2d94de
    };
    const _0x5dd33e = {
      sticker: _0x3a88be,
      ..._0x4461a2
    };
    const _0x1deeec = {
      quoted: _0x27cffa
    };
    await _0x1c14c2.sendMessage(_0xc0eaed, _0x5dd33e, _0x1deeec);
    return _0x2d94de;
  };
  _0x1c14c2.sendText = (_0x4df0be, _0x44c715, _0x277986 = "", _0x45bd14) => _0x1c14c2.sendMessage(_0x4df0be, {
    text: _0x44c715,
    ..._0x45bd14
  }, {
    quoted: _0x277986
  });
  return _0x1c14c2;
}
startBotz();
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update " + __filename);
  delete require.cache[file];
  require(file);
});