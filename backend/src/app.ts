import express from 'express'
import cors from "cors";
import expressFileUpload from "express-fileupload"
import { catchAll } from './3-middleware/catch-all';
import { loggedRequest } from "./3-middleware/log-request";
import userController from './6-controllers/user-controller'
import vacationController from './6-controllers/vacation-controller'
import versionController from './6-controllers/version-controller';

const port = 3001;
const server = express()

server.use(express.json())
server.use(expressFileUpload());

server.use(cors({
    origin: '*', 
    methods: '*', 
    allowedHeaders: '*', 
    credentials: true, 
  }));

server.use(loggedRequest)
server.use('/api', userController)
server.use('/api', vacationController)
server.use('/v', versionController)

server.use(catchAll)

server.listen(port, () => console.log(`server runing on port ${port}`))
