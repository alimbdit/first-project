import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';


let server: Server;

async function main() {
  try {
    // await mongoose.connect(config.database_url as string);
    await mongoose.connect(config.database_url as string);
    console.log(mongoose.connection.readyState);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();


process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected, Shutting down the server !!`)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  };
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected, Shutting down the server !!`)
  process.exit(1);
})
