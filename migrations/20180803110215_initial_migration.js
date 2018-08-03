exports.up = async function(knex, Promise) {
    await knex.schema.createTable("users", table => {
        table.increments().primary();
        table.string("email").notNullable();
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.string("avatar_url").nullable();

        table.unique("email");
        table.index(["email"]);
        table.index(["username"]);
    });

    await knex.schema.createTable("contacts", table => {
        table.increments().primary();
        table.integer("contact_id").notNullable();

        table.index(["contact_id"]);
    });

    await knex.schema.createTable("contacts_requests", table => {
        table.increments().primary();
        table.integer("sender_id").notNullable();
        table.integer("sendee_id").notNullable();

        table.index(["sender_id"]);
        table.index(["sendee_id"]);
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTableIfExists("users");
    await knex.schema.dropTableIfExists("contacts");
    await knex.schema.dropTableIfExists("contacts_requests");
};
