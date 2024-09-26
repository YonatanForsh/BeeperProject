import statusesList from "../enum/statusesEnum"
import { v4 } from "uuid"


export default class Beeper {
    public id: string
    public status:string
    public created_at: Date
    public detonated_at: Date | null
    public latitude: number
    public longitude: number
    constructor(
        public name: string
    ) {
        this.id = v4()
        this.status = statusesList[0]
        this.created_at = new Date()
        this.detonated_at = null
        this.latitude = 0
        this.longitude = 0
    }
  
}

