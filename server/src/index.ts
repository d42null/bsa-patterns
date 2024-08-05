import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import { lists } from './assets/mock-data';
import { Database } from './data/database';
import { CardHandler, ListHandler } from './handlers/handlers';
import { ReorderService } from './services/reorder.service';
import { logger, LogLevel } from './services/logger';

const PORT = 3005;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const db = Database.Instance;
const reorderService = new ReorderService();
// PATTERN: Proxy
const reorderServiceProxy = new Proxy(reorderService, {
  get(target, property) {
    const origMethod = target[property as keyof ReorderService];
    return (...args: any[]) => {
      logger.log(
        LogLevel.Info,
        `Calling ${String(property)} with arguments: ${JSON.stringify(args)}`,
      );
      return origMethod.apply(target, args);
    };
  },
});

if (process.env.NODE_ENV !== 'production') {
  db.setData(lists);
}

const onConnection = (socket: Socket): void => {
  new ListHandler(io, db, reorderServiceProxy).handleConnection(socket);
  new CardHandler(io, db, reorderServiceProxy).handleConnection(socket);
};

io.on('connection', onConnection);

httpServer.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

export { httpServer };
