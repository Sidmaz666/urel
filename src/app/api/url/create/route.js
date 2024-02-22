import generateHash from "@/utils/gnerate_hash";
import connect from "@/config/connect";
import Hash from "@/models/hash";

async function checkHash(){
  const hash = generateHash(7)
  const exists = await Hash.findOne({ hash })
  if(!exists) {
    return hash
  } else {
    checkHash()
  }
}

 export async function POST(req){
   const {url,hash_slug} = await req.json()
   if(!url) return Response.json(
     {
       status: false,
       message: "Invaid URL!"
     }
   )
   await connect()
   let hash
   if(!hash_slug){
     hash = await checkHash()
   } else {
    const exists = await Hash.findOne({ hash: hash_slug })
    if(exists) {
      return Response.json({
	status: false, message: "Hash Already Exists!"
      })
    } else {
      hash = hash_slug
    }
   }
   const newHash = new Hash({
     hash, url
   })
   newHash.save()
   return Response.json({
     status:true,  message: "Successfully Generated Short URL!",
     url, hash
   })
}
