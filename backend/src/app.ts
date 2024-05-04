import express from 'express'
import { catchAll } from './3-middleware/catch-all';
import { loggedRequest } from "./3-middleware/log-request";
import userController from './6-controllers/user-controller'
import versionController from './6-controllers/version-controller';

const port = 3001;
const server = express()

server.use(express.json())

server.use(loggedRequest)
server.use('/api', userController)
server.use('/v', versionController)

server.use(catchAll)

server.listen(port, () => console.log(`server runing on port ${port}`))
