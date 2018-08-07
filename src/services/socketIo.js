'use strict';

const socketio = require('socket.io');
const path     = require('path');
const models   = require(path.join(__dirname, '../models'));

module.exports.init = (server) =>{
    const io = socketio.listen(server);

    let sockets = [];

    io.on('connection', socket => {
        const emitToFriends = (message, data) => {
            if (socket.user) {
                for (let socketId in io.sockets.sockets) {
                    let user = io.sockets.sockets[socketId].user;
                    if (user){
                        socket.user.contacts.forEach(contact => {
                            if ( contact.contact_id === user.id ){
                                console.log('should emit ' + message + ' to '+ user.username );
                                io.to(`${user.socketId}`).emit(message, data)
                            }
                        })
                    }
                }
            }
        }

        socket.on('user logged in', async ({id}) => {
            socket.user = (await models.User.where('id', id).fetch({withRelated: 'contacts'})).toJSON();
            socket.user.socketId = socket.id;

            emitToFriends('contact logged in', { id : socket.user.id });
            let onlineFriends = [];

            for (let socketId in io.sockets.sockets) {
                let user = io.sockets.sockets[socketId].user;
                if (user) {
                    socket.user.contacts.some(c => {
                        c.id === user.id}
                    )
                    if ( socket.user.contacts.some(c => c.contact_id === user.id)) {
                        onlineFriends.push(user.id);
                    }
                }
            }
            socket.emit('get online contacts', onlineFriends);
        });

        socket.on('disconnect',  () => {
            if (socket.user){
                emitToFriends('contact logged out', { id : socket.user.id });
            }
        })
    });
    return io;
};
