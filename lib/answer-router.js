const express = require("express");
const co = require("co");
const uuid = require("uuid");
const debug = require("debug")("dodoso:answer");

module.exports = class AnswerRouter {
  constructor(config){
    const router = this.router = express.Router();

    router.use((req, res, next)=>{
      debug(`${req.method} ${req.originalUrl}`);
      next();
    });
    router.post("/:questionId", (req, res, next)=>{
      co(function*(){
        return req.model.bookshelf.transaction((t)=>{
          return co(function*(){
            const question = yield new req.model.Question({
              identifier: req.params.questionId
            }).fetch({require: true, transacting: t});

            const answer = yield new req.model.Answer({
              user_id: req.session.user.id,
              question_id: question.get("id")
            }).save(null, {transacting: t});

            const responses = yield Promise.all(req.body.responses.map(resp => co(function*(){
              const item = yield new req.model.Item({identifier: resp.identifier}).fetch({transacting: t});
              const r = yield new req.model.Response({
                answer_id: answer.get("id"),
                item_id:   item.get("id"),
                note:      resp.response
              }).save(null, {transacting: t});
            })));
            return answer;
          });
        });
      }).then((answer)=>{
        res.json(answer);
      }).catch((err)=>{
        debug(JSON.stringify(req.body));
        next(err);
      });
    });

  }
};
