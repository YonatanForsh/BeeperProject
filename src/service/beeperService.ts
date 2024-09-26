import fs from "fs/promises"
import Beeper from "../model/beeperModel.js"
import { getFileData, saveFileData } from "../config/fileDataLayer"
import statusEnum from "../enum/statusesEnum.js";

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


    public static async updateBeeperStatus(beeperId: string): Promise<Beeper|undefined>{
        let beepers: Beeper[] = await getFileData<Beeper>("beeper") as Beeper[]

        if (!beepers) beepers = []
        
        const beeper = beepers.find(p => p.id == beeperId)

        if(beeper) beeper.status = statusEnum.assembled
        
        return beeper
    }
}