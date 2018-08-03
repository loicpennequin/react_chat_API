exports.up = async function(knex, Promise) {
    await knex.schema.dropTableIfExists("users");
    await knex.schema.createTable("users", table => {
        table.increments().primary();
        table.string("email").notNullable();
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.string("avatar_url").nullable();

        table.timestamps(false, true);
        table.unique("email");
        table.index(["email"]);
        table.index(["username"]);
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTableIfExists("users");
};
