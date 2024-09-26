import fs from "fs/promises"
import Beeper from "../model/beeperModel.js"
import { getFileData, saveFileData } from "../config/fileDataLayer"
import statusesList from "../enum/statusesEnum.js";

export default class beeperService{



    public static async createBeeper(newBeeperName: string): Promise<boolean|void>{
        console.log(newBeeperName);
        
        const beeper: Beeper =  new Beeper(newBeeperName)

        let beepers: Beeper[] = await getFileData<Beeper>("beeper") as Beeper[]
        if(!beepers) beepers = []
        beepers.push(beeper)

        return await saveFileData("beeper", beepers)
    }


    public static async getAllBeepers(): Promise<Beeper[]|void>{

        let beepers: Beeper[] = await getFileData<Beeper>("beeper") as Beeper[]
        if(!beepers) beepers = []

        return beepers
    }


    public static async getBeeperById(beeperId: string): Promise<Beeper|undefined>{
        let beepers: Beeper[] = await getFileData<Beeper>("beeper") as Beeper[]

        if (!beepers) beepers = []
        
        const beeper = beepers.find(p => p.id == beeperId)
        
        return beeper
    }


    public static async getBeeperByStatus(beeperStatus: string): Promise<Beeper[]|undefined>{
        let allBeepers: Beeper[] = await getFileData<Beeper>("beeper") as Beeper[]

        if (!allBeepers) allBeepers = []
        
        const beepers = allBeepers.filter(p => p.status == beeperStatus)
        
        return beepers
    }


    public static async updateBeeperStatus(beeperId: string, status: string): Promise<Beeper|string|undefined>{
        const statusIndex:number = statusesList.indexOf(status)
        const isValidStatus:boolean = statusesList.includes(status)
        if (!isValidStatus) {
            throw new Error("Invalid status");
        }
        let beepers: Beeper[] = await getFileData<Beeper>("beeper") as Beeper[]
        if (!beepers) beepers = []      
        const beeper = beepers.find(p => p.id == beeperId)   
        if(beeper) {
            const beeperIndex:number = statusesList.indexOf(beeper.status)
            if(statusIndex >= beeperIndex){
                beeper.status = status
                await saveFileData("beeper", beepers)
            } else {
                return "invalid status"
            }
        }
        return beeper
    }


    public static async moveBeeperStatus(beeperId: string): Promise<Beeper|string|undefined>{
        let beepers: Beeper[] = await getFileData<Beeper>("beeper") as Beeper[]
        if (!beepers) beepers = []      
        const beeper = beepers.find(p => p.id == beeperId)   
        if(beeper) {
            const beeperIndex:number = statusesList.indexOf(beeper.status)
            beeper.status = statusesList[beeperIndex + 1]
            await saveFileData("beeper", beepers)
        } else {
                return "invalid status"
        }
        return beeper
    }


    public static async deployedBeeper(beeperId: string, status: string, lat: number, lon: number): Promise<Beeper|string|undefined>{
        const statusIndex:number = statusesList.indexOf(status)
        const isValidStatus:boolean = statusesList.includes(status)
        
        if (!isValidStatus) {
            throw new Error("Invalid status");
        }
        let beepers: Beeper[] = await getFileData<Beeper>("beeper") as Beeper[]
        if (!beepers) beepers = []      
        const beeper = beepers.find(p => p.id == beeperId)   
        if(beeper) {
            const beeperIndex:number = statusesList.indexOf(beeper.status)
            const inLocation: boolean = await this.checkLocation(lat, lon)
            if((statusIndex >= beeperIndex) && inLocation){                
                console.log(inLocation)
                beeper.status = status
                beeper.latitude = lat
                beeper.longitude = lon
                await saveFileData("beeper", beepers)
                setTimeout(() =>this.bombBeeper(beeper, beepers), 3000) 
            } else {
                return "invalid status or location"
            }
        }
        return beeper
    }


    public static async bombBeeper(beeper: Beeper, beepers: Beeper[]):Promise<void>{
        beeper.status = statusesList[statusesList.length -1]   
        beeper.detonated_at = new Date()     
        await saveFileData("beeper", beepers)
    }    


    public static async deleteBeeper(beeperId: string): Promise<Beeper|undefined>{
        let beepers: Beeper[] = await getFileData<Beeper>("beeper") as Beeper[]

        if (!beepers) beepers = []
        
        const beeper = beepers.find(p => p.id == beeperId)
        const newBeepers = beepers.filter(p => p.id != beeperId)
        await saveFileData("beeper", newBeepers)

        return beeper
    }


    public static async checkLocation(lat: number, lon: number): Promise<boolean>{
        const inlat: boolean = lat > 33.01048 && lat < 34.6793
        const inlon: boolean = lon > 35.04438 && lon < 36.59793
        return inlat && inlon
    }

}