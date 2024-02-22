import axios from "axios"
import {useState} from "react"
import {FaArrowLeft} from "react-icons/fa"

export default function QRGenerate({setForm}) {
  const [isDisplay,setDisplay] = useState(false)
  const [valueDisplay,setDisplayValue] = useState("")
  const handleForm = async (e) => {
    e.preventDefault()
    const payload = e.target[0].value
    if(!payload || payload.length <= 0) return
    const data = { url: payload }
    const req = await axios.post(
      "/api/qr/create",
      data
    )
    const res = await req.data
    const {message,qr} = res
    setDisplay(true)
    setDisplayValue({message,qr})
  }
  const handleClose = () => {
	setDisplay(false)
  }
  return(
   <>
   <form onSubmit={handleForm} className="flex flex-col w-full">
    <div className="mb-5">
    <label htmlFor="url" className="block mb-2 text-sm font-medium
    text-gray-700">Enter Data(Required)</label>
    <input type="text" name="url"
    className="bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    placeholder="message/link/etc" autoComplete="off" required />
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
	 <img src={valueDisplay.qr} alt="QR Code"/>
      </div>
      : null
    }
   </form>
   </>
   )
}

