const Packet = require('../../shared/Packet');
const idGen = require('../helpers/idgen');
const RoomState = require('./RoomState');

const WsRoom = require('./WsRoom');

module.exports = class Room {
  constructor(id = idGen()) {
    // eslint-disable-next-line no-param-reassign
    if (typeof id !== 'string' && typeof id !== 'number') id = idGen();
    this.id = id;
    this.ws = new WsRoom(this.id);
    this.players = new Set();
    this.state = RoomState.WAITING;
    this.maxPlayers = 4;
  }

  removePlayer(playerId) {
    this.players.delete(playerId);
    this.ws.removeClient(playerId);
  }

  addPlayer(player, ws) {
    const ourPlayer = player;
    ourPlayer.roomId = this.id;
    ourPlayer.id = ws.id;

    this.players.add(ourPlayer);
    this.ws.addClient(ws);

    // Send a packet to the client to tell them they joined the room
    ws.send(new Packet(Packet.Type.JOIN, ws.id).toBinary());

    if (this.players.size === this.maxPlayers) {
      this.state = RoomState.PLAYING;
    }
  }
};
