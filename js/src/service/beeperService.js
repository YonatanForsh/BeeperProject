"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const beeperModel_js_1 = __importDefault(require("../model/beeperModel.js"));
const fileDataLayer_1 = require("../config/fileDataLayer");
const statusesEnum_js_1 = __importDefault(require("../enum/statusesEnum.js"));
class beeperService {
    static async createBeeper(newBeeperName) {
        console.log(newBeeperName);
        const beeper = new beeperModel_js_1.default(newBeeperName);
        let beepers = await (0, fileDataLayer_1.getFileData)("beeper");
        if (!beepers)
            beepers = [];
        beepers.push(beeper);
        return await (0, fileDataLayer_1.saveFileData)("beeper", beepers);
    }
    static async getAllBeepers() {
        let beepers = await (0, fileDataLayer_1.getFileData)("beeper");
        if (!beepers)
            beepers = [];
        return beepers;
    }
    static async getBeeperById(beeperId) {
        let beepers = await (0, fileDataLayer_1.getFileData)("beeper");
        if (!beepers)
            beepers = [];
        const beeper = beepers.find(p => p.id == beeperId);
        return beeper;
    }
    static async getBeeperByStatus(beeperStatus) {
        let allBeepers = await (0, fileDataLayer_1.getFileData)("beeper");
        if (!allBeepers)
            allBeepers = [];
        const beepers = allBeepers.filter(p => p.status == beeperStatus);
        return beepers;
    }
    static async updateBeeperStatus(beeperId) {
        let beepers = await (0, fileDataLayer_1.getFileData)("beeper");
        if (!beepers)
            beepers = [];
        const beeper = beepers.find(p => p.id == beeperId);
        if (beeper)
            beeper.status = statusesEnum_js_1.default.assembled;
        return beeper;
    }
}
exports.default = beeperService;
