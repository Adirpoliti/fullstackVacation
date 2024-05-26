import express from 'express'
import cors from "cors";
import expressFileUpload from "express-fileupload"
import { catchAll } from './middleware/catch-all';
import { loggedRequest } from "./middleware/log-request";
import csvController from './controllers/csv-controller';
import userController from './controllers/user-controller'
import vacationController from './controllers/vacation-controller'
import versionController from './controllers/version-controller';
import path from 'path';

const port = 3001;
const server = express()

server.use(express.json())
server.use(expressFileUpload());
server.use('/images', express.static(path.join(__dirname, '1-Assets/images')));

server.use(cors({
    origin: '*', 
    methods: '*', 
    allowedHeaders: '*', 
    credentials: true, 
  }));

server.use(loggedRequest)
server.use('/api', userController)
server.use('/api', vacationController)
server.use('/api' , csvController)
server.use('/v', versionController)

server.use(catchAll)

server.listen(port, () => console.log(`server runing on port ${port}`))
