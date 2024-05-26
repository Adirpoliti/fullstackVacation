import fs from 'fs';
import { Request } from "express"
import { getCurrentUser } from "./getCurrentUserLogic";
import { validateCsv } from "../models/CsvModel";
import { UnauthorizedError } from "../models/ErrorModel";
import path from 'path';

export const convertTableToCSV = async (req: Request, dynamicTable: object[], tableName: string) => {
    await getCurrentUser(req);
    validateCsv(tableName);
    try {
        const csvContent = Object.keys(dynamicTable[0]).join(',') + '\n' +
            dynamicTable.map(row => Object.values(row).join(',')).join('\n');
        const csvFolderPath = path.join(__dirname, '../assets/csv');
        if (!fs.existsSync(csvFolderPath)) {
            fs.mkdirSync(csvFolderPath, { recursive: true });
        }
        const csvFilePath = path.join(csvFolderPath, `${tableName}.csv`);
        fs.writeFileSync(csvFilePath, csvContent);
        return csvFilePath;
    } catch (err) {
        UnauthorizedError('Error uploading CSV file');
    }
}