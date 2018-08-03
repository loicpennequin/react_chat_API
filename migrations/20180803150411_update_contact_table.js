exports.up = async function(knex, Promise) {
    await knex.schema.alterTable('contacts', table => {
        table.integer("user_id").notNullable();
    });
};

exports.down = function(knex, Promise) {

};
