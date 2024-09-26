"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusesEnum_1 = __importDefault(require("../enum/statusesEnum"));
const uuid_1 = require("uuid");
class Beeper {
    constructor(name) {
        this.name = name;
        this.id = (0, uuid_1.v4)();
        this.status = statusesEnum_1.default.manufactured;
        this.created_at = new Date();
        this.detonated_at = null;
        this.latitude = 0;
        this.longitude = 0;
    }
}
exports.default = Beeper;
