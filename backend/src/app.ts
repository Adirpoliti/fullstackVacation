import express from 'express';
import expressFileUpload from 'express-fileupload'
import { logRequest } from './3-middleware/log-request';
import { sabbathForbidden } from './3-middleware/sabbath-forbidden';
import { catchAll } from './3-middleware/catch-all';
import { routeNotFound } from './3-middleware/route-not-found';
import { appConfig } from './2-utils/appConfig';
import booksController from './6-controllers/books-controller'
import usersController from './6-controllers/users-controller'
import authorsController from './6-controllers/authors-controller'
import categoriesController from './6-controllers/categories-controller'
import authController from './6-controllers/auth-controller'
import cors from "cors"
// creating our server
const server = express();

server.use(cors());

// work with json
server.use(express.json());
server.use(expressFileUpload());

// binding our middleware
server.use(logRequest);
server.use(sabbathForbidden);

// tell the server to listen to any router written in our controller
server.use('/api', booksController);
server.use('/api', usersController);
server.use('/api', authorsController);
server.use('/api', categoriesController);
server.use('/api', authController);

// Route not found middleware
server.use('/*', routeNotFound);

// Catch-All Middleware
server.use(catchAll);

// listen to our server (port)
server.listen(appConfig.port, () => console.log(`Listening on http://${appConfig.host}:${appConfig.port}`));
