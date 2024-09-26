"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFileData = exports.getFileData = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const getFileData = async (resource) => {
    try {
        console.log("dirname is: " + __dirname);
        const strData = await promises_1.default.readFile(`${__dirname}/../../Data/${resource}.json`, `utf-8`);
        const parseData = JSON.parse(strData);
        return parseData;
    }
    catch (err) {
        console.log(err);
    }
};
exports.getFileData = getFileData;
const saveFileData = async (resource, data) => {
    try {
        const stringifyData = JSON.stringify(data);
        await promises_1.default.writeFile(`${__dirname}/../../Data/${resource}.json`, stringifyData, {
            encoding: "utf-8"
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.saveFileData = saveFileData;
