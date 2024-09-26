import fs from "fs/promises"



export const getFileData = async <T> (resource: string): Promise<T[] | void> => {
    try{
        console.log("dirname is: " +  __dirname);
        
        const strData: string = await fs.readFile(`${__dirname}/../../Data/${resource}.json`, `utf-8`)
        const parseData: T[] = JSON.parse(strData)
        return parseData
    } catch (err) {
        console.log(err);
    }
}


export const saveFileData = async <T> (resource: string, data:T[]) => {
    try{
        const stringifyData: string = JSON.stringify(data)
        await fs.writeFile(`${__dirname}/../../Data/${resource}.json`, stringifyData, {
            encoding: "utf-8"
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}