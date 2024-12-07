import fs from 'fs'
import path,{dirname} from 'path'
import { fileURLToPath } from 'url';

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};



export const getFilePathImage = (fileName) => {
    const rootPath = process.cwd()
    const filePath = path.join(rootPath, `public/images/${fileName}`);

    return filePath
}