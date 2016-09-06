const express = require("express");
const co = require("co");
const uuid = require("uuid");
const debug = require("debug")("dodoso:question");

module.exports = class QuestionRouter {
  constructor(config){
    const router = this.router = express.Router();

    router.use((req, res, next)=>{
      debug(`${req.method} ${req.originalUrl}`);
      next();
    });
    router.get("/", (req, res, next)=>{
      co(function*(){
        const questions = yield req.model.Question.fetchAll({withRelated: ["items", "user"]});
        yield questions.invokeThen("related", ["items", "user"]);
        res.json(questions);
      }).catch(next);
    });
    router.post("/", (req, res, next)=>{
      co(function*(){
        const question = yield req.model.bookshelf.transaction((t)=>{
          return co(function*(){
            const question = yield new req.model.Question({
              identifier: uuid().replace(/\-/g, ""),
              user_id: req.session.user.id,
              title: req.body.title,
              description: req.body.description || ""
            }).save(null, {transacting: t});

            req.body.items.forEach(item =>{
              delete item.isEdit;
              item.setting = JSON.stringify(item.setting || "");
              item.question_id = question.get("id");
            });
            const itemCollection = new req.model.Items(req.body.items);
            const items = yield itemCollection
                    .invokeThen("save", null, {method: "insert", transacting: t});
            return question;
          });
        });
        yield question.related("user").fetch();
        yield question.related("items").fetch();
        return question;
      }).then((question)=>{
        res.json(question);
      }).catch((err)=>{
        debug(JSON.stringify(req.body));
        next(err);
      });
    });

    router.get("/:qIdentifier", (req, res, next)=>{
      co(function*(){
        const question = new req.model.Question({identifier: req.params.qIdentifier}).fetch({require: true});
        res.json(question);
      }).catch(next);
    });
    router.put("/:qIdentifier", (req, res, next)=>{
      co(function*(){
        const question = new req.model.Question({identifier: req.params.qIdentifier}).fetch({require: true});
        yield question.save(null, req.body);
        res.json(question);
      }).catch(next);
    });
  }
};
