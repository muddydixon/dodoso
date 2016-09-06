const http = require("http");
const commander = require("commander");
const config = require("config");
const debug = require("debug")("dodoso:app");
const Dodoso = require("./lib/dodoso");

process.title = config.title;

const dodoso = new Dodoso(config);
const server = http.createServer(dodoso.app);
server.listen(process.env.PORT || config.port);
server.on("listening", ()=>{
  debug(`listening ${process.env.PORT || config.port}`);
});
server.on("error", (err)=>{
  debug(err.stack);
});
