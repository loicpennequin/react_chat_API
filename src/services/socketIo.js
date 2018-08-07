'use strict';

const socketio = require('socket.io');
const path     = require('path');
const models   = require(path.join(__dirname, '../models'));

module.exports.init = (server) =>{
    const io = socketio.listen(server);

    let sockets = [];

    io.on('connection', socket => {
        socket.on('user logged in', async ({id}) => {
            if (!socket.user) {
                socket.user = (await models.User.where('id', id).fetch({withRelated: 'contacts'})).toJSON();
                socket.user.socketId = socket.id;
                console.log(`${socket.user.username} logged in`);

                for (let socketId in io.sockets.sockets) {
                    let user = io.sockets.sockets[socketId].user;
                    if (user){
                        socket.user.contacts.forEach(contact => {
                            if ( contact.contact_id === user.id ){
                                io.to(`${user.socketId}`).emit('contact logged in', { id : socket.user.id })
                            }
                        })
                    }
                }
            }
        });

        socket.on('disconnect',  () => {
            if ( socket.user ){
                for (let socketId in io.sockets.sockets) {
                    let user = io.sockets.sockets[socketId].user;
                    if (user){
                        socket.user.contacts.forEach(contact => {
                            if ( contact.contact_id === user.id ){
                                io.to(`${user.socketId}`).emit('contact logged out', { id : socket.user.id })
                            }
                        })
                    }
                }
            }
        })
    });
    return io;
};
