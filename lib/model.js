const Knex = require("knex");
const Bookshelf = require("bookshelf");
const crypto = require("crypto");
const debug = require("debug")("ep:model");

module.exports = (config)=>{
  const knex = Knex(config.database);
  const bookshelf = Bookshelf(knex);

  const User = bookshelf.Model.extend({
    tableName: "users",
    questions: function(){
      return this.hasMany(Question);
    },
    answers: function(){
      return this.hasMany(Answer);
    }
  },{
    createShadow(password, username, salt){
      const shadow = crypto.createHash("sha256")
              .update(`${username}-${password}-${salt}`)
              .digest("hex");
      return shadow;
    }
  });

  const Question = bookshelf.Model.extend({
    tableName: "questions",
    user: function(){
      return this.belongsTo(User);
    },
    items: function(){
      return this.hasMany(Item);
    }
  });

  const Item = bookshelf.Model.extend({
    tableName: "items",
    question: function(){
      return this.belongsTo(Question);
    }
  });
  const Items = bookshelf.Collection.extend({
    model: Item
  });

  const Answer = bookshelf.Model.extend({
    tableName: "answers",
    responses: function(){
      return this.hasMany(Response);
    },
    user: function(){
      return this.hasOne(User);
    }
  });

  const Response = bookshelf.Model.extend({
    tableName: "responses",
    answer: function(){
      this.belongsTo(Answer);
    }
  });

  return {
    bookshelf,
    knex,

    User,
    Question,
    Item,
    Items,
    Answer,
    Response
  };
};
