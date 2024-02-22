import QRReader from "qrcode-reader"
import Jimp from "jimp"

export async function POST(req){
   const {url} = await req.json()
   if(!url) return Response.json(
     {
       status: false,
       message: "Invaid Data URL!"
     }
   )
      const img = await Jimp.read(Buffer.from(url.split(",")[1],"base64"))
      const qr = new QRReader();
      const value = await new Promise((resolve, reject) => {
	qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
	qr.decode(img.bitmap);
      });
      return Response.json({
	  status: true, message: "Read QR Successfully!",
	  value
      })
}

