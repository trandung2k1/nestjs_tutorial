/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4000', 'http://localhost:5173'],
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  @SubscribeMessage('login')
  login(@MessageBody() data: { name: string; email: string }) {
    this.server.emit('login-success', data);
  }

  handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;
    // console.log(token);
    if (token) {
      this.logger.log(`Client connected: ${client.id}`);
    } else {
      console.log('Client disconnected');
      client.disconnect();
    }
  }

  //
  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
    this.logger.log(`Client disconnected: ${client.id}`);
    client.disconnect();
  }
}
