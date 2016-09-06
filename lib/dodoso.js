const express = require("express");
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const Session = require("express-session");
const ServeStatic = require("serve-static");
const debug = require("debug")("dodoso:app");

const UserRouter = require("./user-router");
const QuestionRouter = require("./question-router");
const AnswerRouter = require("./answer-router");
const Model = require("./model");

module.exports = class Dodoso {
  constructor(config){
    const app = this.app = express();
    const model = Model(config);

    app.use(ServeStatic("public", {index: ["index.html"]}));
    app.use(ServeStatic("node_modules"));
    app.use(BodyParser.json());
    app.use(CookieParser());
    app.use(Session({secret: config.secret || "mysecret"}));
    app.disable("x-powered-by");
    app.use((req, res, next)=>{
      req.model = model;
      next();
    });

    const userRouter = new UserRouter(config);
    const questionRouter = new QuestionRouter(config);
    const answerRouter = new AnswerRouter(config);

    app.use("/users", userRouter.router);
    app.use("/questions", questionRouter.router);
    app.use("/answers", answerRouter.router);

    app.use((req, res, next)=>{
      res.status(404).json({error: new Error("page not found").message});
    });
    app.use((err, req, res, next)=>{
      debug(err.stack);
      if(!res.statusCode) res.status(500);
      res.json({error: err.message});
    });
  }
};
