'use strict';

const socketio = require('socket.io');
const path = require('path');
const models = require(path.join(__dirname, '../models'));

module.exports.init = server => {
	const io = socketio.listen(server);

	let sockets = [];

	io.on('connection', socket => {
		const emitToFriends = (message, data) => {
			if (socket.user) {
				for (let socketId in io.sockets.sockets) {
					let user = io.sockets.sockets[socketId].user;
					if (user) {
						socket.user.contacts.forEach(contact => {
							if (contact.contact_id === user.id) {
								io.to(`${user.socketId}`).emit(message, data);
							}
						});
					}
				}
			}
		};

		const getOnlineFriends = () =>
			Object.keys(io.sockets.sockets).reduce((acc, socketId) => {
				let user = io.sockets.sockets[socketId].user;
				return user &&
					socket.user.contacts.some(c => c.contact_id === user.id)
					? [...acc, user.id]
					: acc;
			}, []);

		const updateSocketUser = async id =>
			(await models.User.where('id', id).fetch({
				withRelated: 'contacts'
			})).toJSON();

		socket.on('user logged in', async ({ id }) => {
			socket.user = await updateSocketUser(id);
			socket.user.socketId = socket.id;

			emitToFriends('contact logged in', { id: socket.user.id });
			socket.emit('get online contacts', getOnlineFriends());
		});

		socket.on('user logged off', () => {
			const id = socket.user.id;

			emitToFriends('contact logged out', { id });
			delete socket.user;
		});

		socket.on('accepted contact request', async () => {
			socket.user = await updateSocketUser(socket.user.id);
			socket.emit('update currentUser');
			socket.emit('accepted contact request');
		});

		socket.on('request online contacts', () => {
			socket.emit('get online contacts', getOnlineFriends());
		});

		socket.on('disconnect', () => {
			if (socket.user) {
				emitToFriends('contact logged out', { id: socket.user.id });
			}
		});
	});
	return io;
};
