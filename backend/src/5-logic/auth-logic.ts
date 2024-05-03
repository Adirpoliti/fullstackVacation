import { OkPacket } from "mysql"
import { getNewToken } from "../2-utils/cyber"
import { executeSqlCommand } from "../2-utils/dal"
import { unauthorizedError } from "../4-models/error-models"
import { LoginCredentials, UserType, validateLoginCredentials, validateUser } from "../4-models/userModel"

export const loginUserLogic = async (credentials: LoginCredentials): Promise<string> => {
    validateLoginCredentials(credentials);
    
    const sql = `
    SELECT * FROM users
    WHERE username = "${credentials.username}" AND password = "${credentials.password}"
    `

    const users = await executeSqlCommand(sql) as UserType[];
    const user = users[0];
    if (!user) unauthorizedError("Incorrect username or password");
    const token = getNewToken(user);
    return token;
}

export const signupUserLogic = async (user: UserType): Promise<string> => {
    validateUser(user);
    
    const checkUsernameSql = `
    SELECT * FROM users
    WHERE username = "${user.username}"
    `

    const checkUsersUsername = await executeSqlCommand(checkUsernameSql);
    if (checkUsersUsername.length >= 1) unauthorizedError("Username is already exists");

    const sql = `
    INSERT INTO users (userId, username, password, firstname, lastname, role)
    VALUES (null, "${user.username}", "${user.password}", "${user.firstname}","${user.lastname}", 1 )
    `

    const info: OkPacket = await executeSqlCommand(sql);
    if(info.affectedRows === 0) unauthorizedError(info.message);
    user.id = +info.insertId;
    const token = getNewToken(user);
    return token;
}