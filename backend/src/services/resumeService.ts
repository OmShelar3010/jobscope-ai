import fs from 'fs';
const pdf = require('pdf-parse');

export const parseResume = async (filePath: string): Promise<string> => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};
