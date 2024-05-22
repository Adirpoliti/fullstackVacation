import fs from 'fs';
import { Request } from "express"
import { getCurrentUser } from "./getCurrentUserLogic";
import { validateCsv } from "../4-models/CsvModel";
import { UnauthorizedError } from "../4-models/ErrorModel";

export const convertTableToCSV = async (req: Request, dynamicTable: object[], tableName: string, path: string) => {
    await getCurrentUser(req);
    validateCsv(tableName);
    console.log(dynamicTable)
    try {
        const csvContent = Object.keys(dynamicTable[0]).join(',') + '\n' +
            dynamicTable.map(row => Object.values(row).join(',')).join('\n');
        const csvFolderPath = `./src/1-Assets/csv`;
        if (!fs.existsSync(csvFolderPath)) {
            fs.mkdirSync(csvFolderPath, { recursive: true });
        }
        const csvFilePath = `${csvFolderPath}/${tableName}.csv`;
        fs.writeFileSync(csvFilePath, csvContent);
        console.log("CSV file saved successfully at", csvFilePath);
    } catch (err) {
        console.error('Error uploading CSV file:', err);
        UnauthorizedError('Error uploading CSV file');
    }
}