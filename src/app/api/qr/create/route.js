import QRCode from "qrcode"

export async function POST(req){
   const {url} = await req.json()
   if(!url) return Response.json(
     {
       status: false,
       message: "Invaid URL!"
     }
   )
      const qr = await QRCode.toDataURL(url)
      return Response.json({
	status: true, message: "QR Created!",
	qr
    })
}


