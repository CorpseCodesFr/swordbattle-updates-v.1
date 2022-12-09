import Phaser from 'phaser';
import Packet from '../../../../shared/Packet';
import initWebsocket from '../helpers/initWebsocket';

export default class Ws extends Phaser.Events.EventEmitter {
  serverUrl: string;
  ws: WebSocket;
  connected: boolean;
  id: any;
  constructor(serverUrl: string) {
    super();
    this.serverUrl = serverUrl;
    this.connected = false;

    initWebsocket(this.serverUrl, null, 5000, 2).then((ws: any) => {
      this.ws = ws;
      this.connected = true;
      this.emit('connected');

      this.ws.onmessage = (event) => {
        try {
          const parsed = Packet.fromBinary(event.data);
          this.emit(parsed.type, parsed.data);
        } catch (e) {
          console.error('error while parsing packet', e);
        }
      };

      this.ws.onerror = () => {
        const err = 'There was an error in your connection to the server.';
        this.emit('connectionLost', err);
      };
      this.ws.onclose = () => {
        const err = 'The connection to the server was closed unexpectedly.';
        this.emit('connectionLost', err);
      };
    }).catch((err: string) => {
      console.error(err);
      this.emit('connect_error', err);
    });
  }
  send(packet: Packet, json = false) {
    if (this.connected) {
      // check if closing or closed
      if (this.ws.readyState === 2 || this.ws.readyState === 3) {
        this.emit('connectionLost', 'The connection to the server was closed unexpectedly.');
        console.error('The connection to the server was closed unexpectedly.');
        return;
      }
      this.ws.send(packet.toBinary(json));
    }
  }
}
