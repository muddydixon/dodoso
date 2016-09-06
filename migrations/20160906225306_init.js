const config = require("config");
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists("users", (table)=>{
      table.increments();
      table.string("username", 64).notNullable().unique();
      table.string("shadow",   64).notNullable();
      table.string("salt",     64).notNullable();
    }),
    knex.schema.createTableIfNotExists("questions", (table)=>{
      table.increments();
      table.string("identifier", 32).unique().notNullable();
      table.string("title", 256).notNullable();
      table.string("description", 1024).notNullable();
      table.integer("user_id").notNullable();
    }),
    knex.schema.createTableIfNotExists("items", (table)=>{
      table.increments();
      table.string("identifier", 32).unique().notNullable();
      table.integer("question_id").notNullable();
      table.string("title", 256).notNullable();
      table.string("description", 1024).notNullable();
      table.enum("type", config.itemTypes).defaultTo(config.defaultItemTypes);
      table.text("setting").defaultTo("");
    }),
    knex.schema.createTableIfNotExists("answers", (table)=>{
      table.increments();
      table.integer("user_id").notNullable();
      table.integer("question_id").notNullable();
      table.text("note").defaultTo("");
    }),
    knex.schema.createTableIfNotExists("responses", (table)=>{
      table.increments();
      table.integer("answer_id").notNullable();
      table.integer("item_id").notNullable();
      table.text("note").defaultTo("");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("users"),
    knex.schema.dropTableIfExists("questions"),
    knex.schema.dropTableIfExists("items"),
    knex.schema.dropTableIfExists("answers"),
    knex.schema.dropTableIfExists("responses")
  ]);
};
