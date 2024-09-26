import exp, { Express } from "express"
import beeperController from "./src/controller/beeperController"
import "dotenv/config"


const app: Express = exp()

app.use(exp.json())
app.use("/api/beepers", beeperController)
app.listen(process.env.PORT, (): void => console.log(`welcome to my localhost ${process.env.PORT}`))

