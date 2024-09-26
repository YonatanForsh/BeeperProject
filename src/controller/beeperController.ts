import exp, { Router, Request, Response } from "express"
import beeperService from "../service/beeperService"
import statusesList from "../enum/statusesEnum"


const router: Router= exp.Router()


//Create new beeper
router.post("/", async (req: Request, res: Response): Promise<void> => {
    try{
        const { name } = req.body
        const resolt = await beeperService.createBeeper(name)  
        console.log(resolt);
        if (resolt){
            res.status(200).json({
                err: false,
                Message: "beeper Created!!",
                data: undefined
            })
        } else {
            throw new Error("Can't save new User");   
        }
        } catch(err){
            res.status(400).json({
                err: true,
                Message: "Some Error"
        })
    }
})


//get all beepers
router.get("/", async (req: Request, res: Response): Promise<void> => {
    try{
        const resolt = await beeperService.getAllBeepers()  
        if (resolt){
            res.status(200).json(resolt)
        } else {
            throw new Error("Can't get beeper list");   
        }
        } catch(err){
            res.status(400).json({
                err: true,
                Message: "Some Error"
        })
    }
})


//get beeper by Id
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const resolt = await beeperService.getBeeperById(req.params.id)
        if (resolt) {
            res.status(200).json(resolt)
        } else {
            throw new Error("Beeper not found")
        }
    } catch (err) {
        res.status(400).json({
            err: true,
            Message: err || "Some Error"
        })
    }
})


//get beeper by status
router.get("/status/:status", async (req: Request, res: Response): Promise<void> => {
    try {
        const status: string = req.params.status
        const resolt = await beeperService.getBeeperByStatus(status)
        if (resolt) {
            res.status(200).json(resolt)
        } else {
            throw new Error("Beepers not found")
        }
    } catch (err) {
        res.status(400).json({
            err: true,
            Message: err || "Some Error"
        })
    }
})


//update status
router.put("/:id/status", async (req: Request, res: Response): Promise<void> => {   
    try {
        const { status } = req.body
        if(status == "deployed"){
            const { LAT, LON } = req.body
            const resolt = await beeperService.deployedBeeper(req.params.id, status, LAT, LON)
            if (resolt) {
                res.status(200).json(resolt)
            } else {
                throw new Error("Beepers not found")
            }
        } else {
        const resolt = await beeperService.updateBeeperStatus(req.params.id, status)    
        if (resolt) {
            res.status(200).json(resolt)
        } else {
            throw new Error("Beepers not found")
        }}
    } catch (err) {
        res.status(400).json({
            err: true,
            Message: err || "Some Error"
        })
    }
})


//delete beeper
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const resolt = await beeperService.deleteBeeper(req.params.id)
        if (resolt) {
            res.status(200).json(resolt)
        } else {
            throw new Error("Beeper deleted!")
        }
    } catch (err) {
        res.status(400).json({
            err: true,
            Message: err || "Some Error"
        })
    }
})


export default router