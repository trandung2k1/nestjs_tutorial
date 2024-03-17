import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, ClientOptions } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  private logger = new Logger('SocketGateway');

  handleConnection(client: ClientOptions) {
    // console.log(client.protocol);
    if (client.protocol.length) {
      this.logger.log('Client connected');
    } else {
      this.server.close();
    }
  }

  handleDisconnect() {
    this.logger.log('Client disconnected');
    this.server.close();
  }

  @SubscribeMessage('events')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }
}
