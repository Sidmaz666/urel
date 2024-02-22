import connect from "@/config/connect";
import Hash from "@/models/hash";

 export async function GET(req){
   const hash = await req.url.split("delete/")[1]
   if(!hash) return Response.json(
     {
       status: false,
       message: "Invaid hash!"
     }
   )
    await connect()
    const exists = await Hash.findOne({ hash })
    if(!exists) return Response.json({
	status: false, message: "Hash doesn't exist!"
    })
   await Hash.deleteOne({ hash })
   return Response.json({
     status: true,
     message: `Hash:${hash} deleted!`
   })
}
