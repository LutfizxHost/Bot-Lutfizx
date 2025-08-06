const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const figlet = require("figlet");
const Connecting = async ({
  update: _0x41489b,
  fuzzy: _0x3678e6,
  Boom: _0x50cd27,
  DisconnectReason: _0x44672b,
  startBotz: _0x103608
}) => {
  const {
    connection: _0x5d6e5c,
    lastDisconnect: _0x44a49d
  } = _0x41489b || {};
  try {
    if (_0x5d6e5c === "close") {
      let _0x1712f1 = new _0x50cd27(_0x44a49d?.error)?.output?.statusCode;
      switch (_0x1712f1) {
        case _0x44672b.badSession:
          console.log(chalk.red("❌ Bad Session File. Hapus dan scan ulang."));
          deleteSession();
          _0x3678e6.logout();
          break;
        case _0x44672b.connectionClosed:
          console.log(chalk.yellow("⚠️ Connection closed. Reconnecting..."));
          _0x103608();
          break;
        case _0x44672b.connectionLost:
          console.log(chalk.yellow("⚠️ Connection lost. Reconnecting..."));
          _0x103608();
          break;
        case _0x44672b.connectionReplaced:
          console.log(chalk.red("❌ Session diganti oleh device lain."));
          _0x3678e6.logout();
          break;
        case _0x44672b.loggedOut:
          console.log(chalk.red("❌ Logged out. Scan ulang diperlukan."));
          deleteSession();
          _0x3678e6.logout();
          break;
        case _0x44672b.restartRequired:
          console.log(chalk.cyan("🔄 Restart required. Restarting..."));
          _0x103608();
          break;
        case _0x44672b.timedOut:
          console.log(chalk.yellow("⏰ Connection timed out. Reconnecting..."));
          _0x103608();
          break;
        default:
          console.log(chalk.red("❓ Unknown DisconnectReason: " + _0x1712f1 + "|" + _0x5d6e5c));
          _0x103608();
          break;
      }
    }
    if (_0x5d6e5c === "open") {
      console.clear();
      const _0x2f41e2 = {
        primary: "#00ffcc",
        secondary: "#22d1ee",
        accent: "#1a9fff",
        warning: "#ffcc00",
        success: "#00ff88",
        error: "#ff5555",
        gray: "#808080",
        white: "#ffffff"
      };
      const _0x98ddd4 = {
        name: "Lutfizx-Bot",
        version: "1.4.0",
        author: "Lutfizx",
        mode: "ASCII Art Mode",
        lastUpdated: "May 1, 2025",
        repository: "github.com/xZiyyy/clairity"
      };
      console.log(chalk.hex(_0x2f41e2.primary).bold("\n    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n    ┃         " + chalk.whiteBright.bold("Welcome to") + " " + chalk.greenBright("Lutfizx Console") + " \n    ┃     " + chalk.gray("ASCII Art Mode | Powered by Lutfizx") + "        \n    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n"));
      console.log(chalk.green("⠠⡠⠠⡠⢀⠄⡠⢀⠤⡀⡔⡠⠄⢂⣂⣤⣤⣶⣶⣿⣽⣿⣿⣿⣶⣶⣤⣤⣀⡀⢀⣀⠀⠀⠀⠀⠀⢀⠀⣏⣴⠟⢁⣴⠟⢁⣿⡤⢀⠀\n⠧⠎⠖⠴⣅⡮⠴⡕⡪⠊⣢⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⠿⣿⣿⣦⡀⠀⠀⠢⠀⢿⠏⣰⡿⢁⣾⢋⣴⣿⠐⠄\n⠀⠀⠀⠀⠀⠉⠑⠊⣰⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡛⠲⢿⣿⣿⣦⡀⢂⠄⢻⣾⡿⢰⣿⢡⣿⠡⣿⡇⡘\n⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣽⡷⡿⠿⠟⠟⠿⠛⠿⠿⡻⣪⣿⣿⣿⣿⡆⠀⢸⣿⢃⣿⠏⣠⠻⣷⣿⡧⠐\n⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⢟⡫⠥⠄⠠⠀⠀⠀⠀⠀⠀⠀⢿⡲⡍⢛⢿⣿⣿⡦⠜⣿⢿⠏⠰⣿⠓⣤⠻⢧⡕\n⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⡿⢏⠣⠉⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠛⠺⣵⠈⠄⡉⢿⣿⣀⡅⠐⣶⣦⡈⢳⡈⢮⠪⣆\n⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⡿⠍⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠈⠠⠄⠠⡈⢻⣿⡅⠀⠘⣌⡻⣄⠙⠢⣑⡿\n⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣯⣿⣿⣿⡿⠑⠀⠈⠀⠀⠀⠠⠀⠀⠄⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠈⠆⠀⠊⣿⣷⠈⠠⠨⡕⢦⠙⠰⣽⠇\n⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠠⢀⠀⠁⠀⠀⠀⠀⠀⡀⠀⠀⡀⠀⠂⠠⠀⠠⠀⢀⠁⠸⡊⠄⢹⣿⣧⠈⠢⢹⠖⡵⣸⡟⢠\n⠀⠀⣸⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⡏⠀⠢⡀⠈⠠⠀⡈⢀⠠⠀⠀⠀⠁⠀⠀⠀⠀⠀⠄⢂⠀⡈⠀⡳⢐⡐⠋⠉⠣⡑⠡⡟⣱⡿⢨⠨\n⠀⠀⢾⣿⣿⣿⣿⢿⣿⣿⣿⣯⣿⠀⡐⠠⠡⠈⢄⣤⣄⡀⠀⠂⠀⠐⢀⠀⠌⢠⣈⡄⠐⠠⢂⠄⠂⠘⡅⠠⣚⣀⡢⠡⣱⣿⠟⣱⢃⠎\n⠀⠀⢺⢿⣿⣿⣿⣿⣿⣿⣿⣿⡯⠀⠄⢂⠡⠀⢺⣿⣿⠇⠀⠀⡐⠀⠠⠀⠸⣿⣿⡧⢈⠐⠀⠂⠌⠀⢃⡈⠉⠁⢡⢀⢙⢍⣿⢃⡎⡸\n⠠⠀⢹⣹⣿⣿⣿⣿⣿⣿⣻⣿⡯⠐⢈⠄⢊⠢⡁⠉⠉⠀⠀⠠⢈⠀⠂⢈⠀⠉⠙⡀⡊⢀⠁⠠⠀⡈⢸⠀⢩⡜⠁⠐⡌⡒⣿⡚⣰⠃\n⢨⠀⢸⣯⣿⣿⣿⣯⣿⣿⣿⣿⡮⡅⡁⡂⢡⠐⠌⠐⠁⡢⠁⠀⠄⠀⠂⠠⠀⡁⠌⢀⠈⢀⠀⠂⠄⠠⠘⠄⠛⡕⡖⠑⢌⢪⣿⢼⠇⣼\n⣴⢣⢞⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢔⢈⠐⡀⢊⠠⢊⠸⡅⠀⠂⢈⠀⠂⠀⠔⠐⠄⠐⡠⠊⢀⣡⡀⢈⢇⠀⠧⠣⣑⢕⣥⡿⢛⣼⢇\n⢸⢡⠣⣿⢿⣿⣿⣿⡿⣿⣻⣿⣿⣧⣵⣤⠑⡈⢄⡱⢈⠄⢝⡄⠁⠠⢀⠁⡈⢀⠡⢈⠄⢂⠐⣽⣿⢷⠀⣽⣷⡶⡻⡜⣯⠪⣻⣿⢵⡟\n⡹⡐⡅⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣟⣿⠁⢆⠡⢂⠢⠑⢄⠲⡈⠀⠂⠄⠐⠀⠔⡀⠢⠠⠈⠹⠿⢋⠢⣻⣿⣟⢜⢎⠪⡓⢜⠃⠜⡉\n⢩⢌⢪⢘⡧⣿⣿⣿⣿⣿⣿⣿⣿⣿⡌⣅⢪⠐⢕⠌⠔⡡⠊⡰⢅⠈⠄⠊⠀⡡⢈⢰⠑⠌⡨⡂⡕⢡⢱⣎⣿⣿⠀⠊⠁⠀⢄⢊⡶⡲\n⠦⠱⢄⠅⣿⢹⣿⣿⣯⣿⣿⣿⣿⣿⣷⠨⡠⠑⡠⠳⡀⠪⡈⢔⠰⢅⠐⡁⢐⠀⠂⠤⡑⢈⠔⡐⢊⠤⠯⣜⣵⣿⣯⣁⢢⠬⡬⢭⠴⡤\n⢈⠢⡑⠌⣺⠘⣿⡽⣿⣿⣿⣿⢿⣿⣿⣇⢑⠅⠢⡐⢙⢤⠊⢄⠑⠬⠄⠐⡀⠡⢈⠄⡣⢈⠄⡡⢊⠎⠢⠀⣻⣿⣸⣷⣑⠪⡪⢢⠓⡜\n⠐⡀⢊⡐⢸⡆⢳⢳⠻⣿⣿⣿⣿⣿⣿⣷⣌⡱⠡⡘⢄⠙⣧⡊⢌⢂⠳⡈⠠⠁⠢⢐⡇⠰⡈⣢⠋⢌⠠⠁⠸⣿⣿⣿⣿⣧⠕⢡⠑⡩\n⠐⠌⠄⢌⠠⣇⠈⣋⢗⣻⢿⣿⣿⣿⣿⣿⣿⣿⣶⣌⡢⣑⣟⢷⡄⢅⠘⡔⠠⡁⢊⢐⣿⢐⢥⠏⠔⢐⠄⡑⠈⣿⣿⡾⣿⣻⡷⢹⡀⠕\n⢊⢐⠁⠢⠐⠸⡄⠈⢮⢳⡸⣿⣿⣿⣾⣿⣿⢿⣿⣿⣿⣾⣦⡫⡹⣆⠱⠨⡆⢄⠡⡐⣿⣾⠃⠍⠐⠄⣢⢼⠲⡕⡿⣿⣯⢟⡡⣻⡀⢆\n⠤⡡⢈⠂⠑⡀⠙⡄⠨⢺⡑⢝⣿⣿⢾⣿⣿⣏⣿⣹⣿⢽⡻⢿⠗⣮⣊⠒⢜⡄⢒⠌⡵⢇⢨⡂⡇⠢⢉⡎⠖⢉⢢⢩⡿⣪⠗⣱⢵⡀\n⠐⠀⠄⢈⠄⠠⠀⡈⠐⠈⣧⠬⢺⣿⣿⣻⣿⣿⡸⣷⢽⢭⡫⠯⡈⡢⢉⢳⡈⢷⢁⠂⡷⣝⢈⢸⡇⡢⠠⡡⢈⠢⡴⢛⡴⢃⡾⢣⢊⠳\n⠠⠈⠀⠄⠀⠐⠀⠀⠈⠄⠈⠣⣼⡻⣿⣼⢿⣿⣷⢏⡾⡩⡓⡇⢘⢄⢃⠆⡹⢆⣄⠱⡆⠷⠋⡸⠈⢅⠂⡆⢢⢫⣴⠟⣡⡾⢡⡟⠠⡂\n⠈⠈⠀⠈⠀⠀⠐⠀⠀⠀⢀⣼⡧⢹⣿⣗⣷⢹⣾⢻⡼⢳⣙⡇⠠⠊⢢⡈⠔⢉⠙⡫⡐⡘⠢⠨⡐⠡⠂⣕⣼⡟⢡⣾⠟⣡⡟⣆⠡⡨\n⠀⠀⠀⠀⠀⠀⠀⢀⡤⣾⢿⢵⢍⢢⢳⣟⣿⢸⢼⠻⣷⢛⣱⡇⡨⢑⢄⠑⡌⠢⡑⠔⡨⢐⠅⡑⢌⢘⠐⢼⠏⣴⡿⢣⣾⢋⣶⢿⡔⣍\n⠤⠤⠤⠤⡤⠶⡚⡅⢅⠄⢏⠪⡳⠱⡌⣷⢑⢿⡺⣎⡏⣿⡇⡏⡖⡴⢠⡕⡨⠢⡈⢢⠐⢅⠌⡂⢢⠁⠕⢨⣾⡿⢱⣿⢳⣿⢱⣿⢿⡔\n⣋⡺⡐⠆⢌⢪⠪⣊⢆⠱⡁⢍⢎⢕⢈⠗⡌⣖⢝⢿⣼⣹⢷⢫⣯⢣⢏⡞⡽⣆⡑⠡⢊⠔⡨⢂⢅⢑⢅⣽⣿⢣⣿⠟⣤⡻⣷⡻⢮⣷\n          "));
      console.log(chalk.green("╔════ Script Information ════╗\n║ Name: " + _0x98ddd4.name + "\n║ Version: " + _0x98ddd4.version + " \n║ Author: " + _0x98ddd4.author + "\n║ Updated: " + _0x98ddd4.lastUpdated + "\n║ Repo: " + _0x98ddd4.repository + "\n║ need help something? Contact me: https://wa.me/6283159451487\n╚═══════════════════════════╝\n"));
    }
  } catch (_0x3e7a50) {
    console.error(chalk.bgRed.white("ERROR di Connection.update: "), _0x3e7a50);
    _0x103608();
  }
};
const deleteSession = () => {
  const _0x1bb1da = "./media/database/session";
  if (fs.existsSync(_0x1bb1da)) {
    fs.rmSync(_0x1bb1da, {
      recursive: true,
      force: true
    });
    console.log(chalk.redBright("🧹 Session folder telah dihapus."));
  }
};
const _0x3e545a = {
  Connecting: Connecting
};
module.exports = _0x3e545a;