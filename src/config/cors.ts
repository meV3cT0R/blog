export const allowedOrigins = ["https://localhost:5173","https://localhost:3000"]

export const corsOption = {
    origin : (origin :string | undefined,callback: (err:Error |null,allow:boolean)=>void)=> {
        if(origin==undefined || allowedOrigins.includes(origin)){
            callback(null,true)
        }else {
            callback(new Error("Not Allowed"),false)
        }
    },
    optionsSuccesStatus : 200
}