"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beeperService_1 = __importDefault(require("../service/beeperService"));
const router = express_1.default.Router();
//Create new beeper
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const resolt = await beeperService_1.default.createBeeper(name);
        console.log(resolt);
        if (resolt) {
            res.status(200).json({
                err: false,
                Message: "beeper Created!!",
                data: undefined
            });
        }
        else {
            throw new Error("Can't save new User");
        }
    }
    catch (err) {
        res.status(400).json({
            err: true,
            Message: "Some Error"
        });
    }
});
//get all beepers
router.get("/", async (req, res) => {
    try {
        const resolt = await beeperService_1.default.getAllBeepers();
        if (resolt) {
            res.status(200).json(resolt);
        }
        else {
            throw new Error("Can't get beeper list");
        }
    }
    catch (err) {
        res.status(400).json({
            err: true,
            Message: "Some Error"
        });
    }
});
//get beeper by Id
router.get("/:id", async (req, res) => {
    try {
        const resolt = await beeperService_1.default.getBeeperById(req.params.id);
        if (resolt) {
            res.status(200).json(resolt);
        }
        else {
            throw new Error("Beeper not found");
        }
    }
    catch (err) {
        res.status(400).json({
            err: true,
            Message: err || "Some Error"
        });
    }
});
//get beeper by status
router.get("/status/:status", async (req, res) => {
    try {
        const status = req.params.status;
        const resolt = await beeperService_1.default.getBeeperByStatus(status);
        if (resolt) {
            res.status(200).json(resolt);
        }
        else {
            throw new Error("Beepers not found");
        }
    }
    catch (err) {
        res.status(400).json({
            err: true,
            Message: err || "Some Error"
        });
    }
});
//update status
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;
        if (status == "deployed") {
            const { LAT, LON } = req.body;
            const resolt = await beeperService_1.default.bombBeeper();
        }
        const resolt = await beeperService_1.default.updateBeeperStatus(req.params.id);
        if (resolt) {
            res.status(200).json(resolt);
        }
        else {
            throw new Error("Beepers not found");
        }
    }
    catch (err) {
        res.status(400).json({
            err: true,
            Message: err || "Some Error"
        });
    }
});
exports.default = router;
