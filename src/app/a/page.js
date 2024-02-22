export const fetchCache = 'force-no-store';
import gis from "async-g-i-s";
import axios from "axios";

export async function generateMetadata({ searchParams }){
  return {
    title: searchParams?.message || "No Message",
    description: searchParams?.message || "No Message"
  }
}

async function getImage(image,index=undefined){
    try {
	const imageUrl = image[index !== undefined ? index : Math.floor(Math.random() * image.length )].url
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });
        const dataURL = `data:${response.headers['content-type']};base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
        return dataURL;
    } catch (error) {
      return await getImage(image)
    }
}

export default async function CustomMessage({searchParams}){
  const background = searchParams?.background || "flower" 
  const image_search = await gis(background)
  const image = await getImage(image_search,searchParams?.i || undefined)
  return (
     <div
    	style={{
	  backgroundImage: `url(${image})`,
	  backgroundPositionY: "top",
	  backgroundRepeat: "no-repeat",
	  backgroundSize : "cover"
	}}
    	className="w-screen h-screen flex bg-gray-900 justify-center items-center overflow-hidden">
    	<span className="w-full break-words text-center capitalize 
    	  font-semibold text-2xl text-slate-100 bg-black/80 px-2 py-2">
	    {searchParams.message && searchParams.message || "No message" }
    	</span>
    </div>
 )
}
