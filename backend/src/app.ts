import express from 'express'
import cors from "cors";
import expressFileUpload from "express-fileupload"
import { catchAll } from './3-middleware/catch-all';
import { loggedRequest } from "./3-middleware/log-request";
import csvController from './6-controllers/csv-controller';
import userController from './6-controllers/user-controller'
import vacationController from './6-controllers/vacation-controller'
import versionController from './6-controllers/version-controller';
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
