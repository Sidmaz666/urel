import axios from "axios"
import {useState} from "react"
import {FaArrowLeft} from "react-icons/fa"
import FileBase from "react-file-base64"
import isUrl from "is-url"

export default function QRRead({setForm}) {
  const [isDisplay,setDisplay] = useState(false)
  const [valueDisplay,setDisplayValue] = useState("")
  const [isBase64,setBase64] = useState("")
  const handleForm = async (e) => {
    e.preventDefault()
    const payload = isBase64
    if(!payload || payload.length <= 0) return
    const data = { url: payload }
    try {
    const req = await axios.post(
      "/api/qr/read",
      data
    )
    const res = await req.data
    const {message,value} = res
    setDisplay(true)
    setDisplayValue({message,value:value.result})
    } catch (error) {
	setBase64("")	
    }
  }
  const handleClose = () => {
	setDisplay(false)
  }
  return(
   <>
   <form onSubmit={handleForm} className="flex flex-col w-full">
    <div className="mb-5">
    {
      isBase64.length > 0 ?
      <div className="w-full flex justify-center">
	<img src={isBase64} className="px-2 mb-3 size-[300px]" alt="Preview!"/>
      </div>
      : null
    }
    <label htmlFor="url" className="block mb-2 text-sm font-medium
    text-gray-700">Upload QR(Required)</label>
     <FileBase type="file" 
      multiple={false} onDone={({ base64 }) => setBase64(base64)} onChange={(e) => e.target.files[0]} />
  </div>
    <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800
    focus:ring-4 focus:outline-none focus:ring-blue-300
    font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
      Submit
    </button>
    {
      isDisplay ?
       <div className="w-screen h-screen z-[60] absolute top-0 left-0
        flex justify-center items-center flex-col bg-gray-200">
      	<button className="absolute top-2 left-3 p-1 bg-blue-200 text-gray-600 text-xl rounded-full overflow-hidden hover:text-gray-400"
	onClick={handleClose}
     	>
      		<FaArrowLeft/>
      	</button>
         <span className="mb-5">{valueDisplay.message}</span>
      	 <span className="p-2 bg-gray-300 rounded-md">
		{
		  isUrl(valueDisplay.value) ?
		  <a href={valueDisplay.value}>{valueDisplay.value}</a>
		  :
		  <span>{valueDisplay.value}</span>
		}
         </span>
      </div>
      : null
    }
   </form>
   </>
   )
}


