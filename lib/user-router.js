const express = require("express");
const crypto = require("crypto");
const co = require("co");
const debug = require("debug")("dodoso:user");

module.exports = class UserRouter {
  constructor(config){
    const router = this.router = express.Router();

    router.use((req, res, next)=>{
      debug(`${req.method} ${req.originalUrl}`);
      next();
    });
    router.get("/", (req, res, next)=>{
      co(function*(){
        const users = req.model.User.fetchAll();
        res.json(users);
      }).catch(next);
    });
    router.post("/", (req, res, next)=>{
      // debug(req.body);
      co(function*(){
        const user = new req.model.User({
          username: req.body.username
        });
        const key = `Date.now()-${0|Math.random() * 1000}-${user.get("username")}`;
        const salt = crypto.createHash("md5").update(key).digest("hex");
        const shadow = req.model.User.createShadow(req.body.password, req.body.username, salt);
        user.set("salt", salt);
        user.set("shadow", shadow);
        return user.save();
      }).then((user)=>{
        res.json(user);
      }).catch(next);
    });

    router.post("/authed", (req, res, next)=>{
      co(function(){
        if(req.session.user) return res.json(req.session.user);
        res.status(401);
        throw new Error("unauthorized");
      }).catch(next);
    });
    router.post("/signup", (req, res, next)=>{
      debug(req.body);
      co(function*(){
        const user = new req.model.User({
          username: req.body.username
        });
        const key = `Date.now()-${0|Math.random() * 1000}-${user.get("username")}`;
        const salt = crypto.createHash("md5").update(key).digest("hex");
        const shadow = req.model.User.createShadow(req.body.password, req.body.username, salt);
        user.set("salt", salt);
        user.set("shadow", shadow);
        return user.save();
      }).then((user)=>{
        req.session.user = user;
        res.json(user);
      }).catch(next);
    });
    router.post("/signin", (req, res, next)=>{
      co(function*(){
        const user = yield new req.model.User({username: req.body.username}).fetch({require: true});
        const shadow = req.model.User.createShadow(req.body.password, req.body.username, user.get("salt"));
        if(user.get("shadow") === shadow){
          req.session.user = user.toJSON();
          res.json(user);
        }else{
          throw new Error("username or password invalid");
        }
      }).catch((err)=>{
        res.status(401);
        next(err);
      });
    });

    router.get("/signout", (req, res, next)=>{
      co(function*(){
        const user = yield new req.model.User({username: req.session.user.username}).fetch({require: true});
        req.session.destroy();
        res.json({});
      }).catch((err)=>{
        req.session.destroy();
        res.status(401);
        next(err);
      });
    });

    router.get("/:username", (req, res, next)=>{
      co(function*(){
        const user = yield req.model.User.forge({username: req.params.username}).fetch();
        res.json(user);
      }).catch(next);
    });
    router.put("/:usernam", (req, res, next)=>{
    });
    router.delete("/:username", (req, res, next)=>{
    });
  }
};
