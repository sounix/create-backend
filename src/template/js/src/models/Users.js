<% if(database == 'mysql (no sequelize)') { %>
<% if(aliases === true) { %>
const db = require('@models/database.js');
<% } else { %>
const db = require('./database.js');
<% } %>

const users = {
    /** Returns an array of users */
    async getAll(){
        const result = await db.query('SELECT id, name, email FROM users');
        return result;
    },
    /** Returns a user by its id */
    async getById(id){
        const result = await db.query('SELECT id, name, email FROM users WHERE id = ?', [id]);
        return result[0];
    },
    /** Adds a new user to database and returns it */
    async create(name, email){
        const { insertId } = await db.query('INSERT INTO users(id, name, email) VALUES(0, ?, ?)', [name, email]);
        return (await db.query('SELECT id, name, email FROM users WHERE id = ?', [insertId]))[0];
    },
    /** Update an existing user and returns it */
    async update(id, name, email){
        await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        return (await db.query('SELECT id, name, email FROM users WHERE id = ?', [id]))[0];
    },
    /** Deletes an existing user */
    async delete(id){
        const result = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }
}
<% } else if (database == 'mongodb') { %>
<% if(aliases === true) { %>
const database = require('@models/database.js');
<% } else { %>
const database = require('./database.js');
<% } %>

const users = {

    async getAll() {
        const dbo = await database.getDbo();

        return await dbo.collection('users').find().toArray();
    },

    async search(good) {
        const dbo = await database.getDbo();

        const {_id} = good;

        return await dbo.collection('users').find({_id: new ObjectId(_id)}).toArray();
    },

    async create(good) {
        const dbo = await database.getDbo();
        
        delete good._id;
        delete good.id;
        
        return (await dbo.collection('users').insertOne(good)).ops[0];
    },

    async update(good) {
        const dbo = await database.getDbo();

        const {_id} = good;
        
        delete good._id;
        delete good.id;

        return await dbo.collection('users').findOneAndUpdate({_id:  new ObjectId(_id)},{$set: good},{ returnNewDocument: true });
    },

    async delete(good) {
        const dbo = await database.getDbo();

        const {_id} = good;
        
        await dbo.collection('users').deleteOne({_id: new ObjectId(_id)});
    }

}
<% } else { %>
const Sequelize = require('sequelize');
<% if(aliases === true) { %>
const db = require('@models/database.js');
<% } else { %>
const db = require('./database.js');
<% } %>

const users = db.define('users', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
})
<% } %>

module.exports = users;