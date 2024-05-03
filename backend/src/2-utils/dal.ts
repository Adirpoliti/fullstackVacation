import mysql from 'mysql';
import { appConfig } from './appConfig';


const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
})


export const executeSqlCommand = (sql: string) => {
    return new Promise<any>((res, rej) => {
        connection.query(sql, (err, result) => {

            if (err) {
                rej(err);
                return
            }
            res(result)
        })
    })
}

