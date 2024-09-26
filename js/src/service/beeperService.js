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
    static async updateBeeperStatus(beeperId, status) {
        const statusIndex = statusesEnum_js_1.default.indexOf(status);
        const isValidStatus = statusesEnum_js_1.default.includes(status);
        if (!isValidStatus) {
            throw new Error("Invalid status");
        }
        let beepers = await (0, fileDataLayer_1.getFileData)("beeper");
        if (!beepers)
            beepers = [];
        const beeper = beepers.find(p => p.id == beeperId);
        if (beeper) {
            const beeperIndex = statusesEnum_js_1.default.indexOf(beeper.status);
            if (statusIndex >= beeperIndex) {
                beeper.status = status;
                await (0, fileDataLayer_1.saveFileData)("beeper", beepers);
            }
            else {
                return "invalid status";
            }
        }
        return beeper;
    }
    static async deployedBeeper(beeperId, status, lat, lon) {
        const statusIndex = statusesEnum_js_1.default.indexOf(status);
        const isValidStatus = statusesEnum_js_1.default.includes(status);
        if (!isValidStatus) {
            throw new Error("Invalid status");
        }
        let beepers = await (0, fileDataLayer_1.getFileData)("beeper");
        if (!beepers)
            beepers = [];
        const beeper = beepers.find(p => p.id == beeperId);
        if (beeper) {
            const beeperIndex = statusesEnum_js_1.default.indexOf(beeper.status);
            const inLocation = await this.checkLocation(lat, lon);
            if ((statusIndex >= beeperIndex) && inLocation) {
                console.log(inLocation);
                beeper.status = status;
                beeper.latitude = lat;
                beeper.longitude = lon;
                await (0, fileDataLayer_1.saveFileData)("beeper", beepers);
                setTimeout(() => this.bombBeeper(beeper, beepers), 3000);
            }
            else {
                return "invalid status or location";
            }
        }
        return beeper;
    }
    static async bombBeeper(beeper, beepers) {
        beeper.status = statusesEnum_js_1.default[statusesEnum_js_1.default.length - 1];
        beeper.detonated_at = new Date();
        await (0, fileDataLayer_1.saveFileData)("beeper", beepers);
    }
    static async deleteBeeper(beeperId) {
        let beepers = await (0, fileDataLayer_1.getFileData)("beeper");
        if (!beepers)
            beepers = [];
        const beeper = beepers.find(p => p.id == beeperId);
        const newBeepers = beepers.filter(p => p.id != beeperId);
        await (0, fileDataLayer_1.saveFileData)("beeper", newBeepers);
        return beeper;
    }
    static async checkLocation(lat, lon) {
        const inlat = lat > 33.01048 && lat < 34.6793;
        const inlon = lon > 35.04438 && lon < 36.59793;
        return inlat && inlon;
    }
}
exports.default = beeperService;
