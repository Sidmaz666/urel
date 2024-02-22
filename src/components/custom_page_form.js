import isUrl from "is-url"
import axios from "axios"
import { useState } from "react"

export default function CustomPageForm({setForm}) {
  const [isMessage,setMessage] = useState("")
  const [isBackground,setBackground] = useState("flower")
  const [isIndex,setIndex] = useState(undefined)
  const handleForm = async (e) => {
    e.preventDefault()
    const url = `${window.location.origin}/a?message=${isMessage}&background=${isBackground}&i=${isIndex}`
    if(isMessage.length < 2) return
    const slug = e.target[3].value
    const data = { url }
    if(slug && slug.length > 2){
      data.hash_slug = slug
    }
    const req = await axios.post(
      "/api/url/create",
      data
    )
    const res = await req.data
    const items_ = localStorage.getItem("stored_hash")
    if(!items_ || items_.length < 2){
      localStorage.setItem("stored_hash",`${res.hash}`)
    } else {
      localStorage.setItem("stored_hash",`${items_},${res.hash}`)
    }
    setForm(false)
  }
  return(
   <form onSubmit={handleForm} className="flex flex-col w-full">
    <div className="mb-5 flex justify-center italic">
    <a target="_blank"
    href={`${window.location.origin}/a?message=${isMessage}&background=${isBackground}&i=${isIndex}`}
    className="block mb-2 text-sm font-medium  text-blue-600 ">
	  Preview Link
    </a>
    </div>
    <div className="mb-5">
    <label htmlFor="message" className="block mb-2 text-sm font-medium
    text-gray-700">Enter Message/Text/Content(Required)</label>
    <input type="text" name="message"
    onChange={(e) => {setMessage(e.target.value)}}
    className="bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    placeholder="Hello, How are you doing?" autoComplete="off" required />
  </div>
    <div className="mb-5">
    <label htmlFor="background" className="block mb-2 text-sm font-medium
    text-gray-700">Enter Background Keyword(Optional)</label>
    <input type="text" name="background"
    onChange={(e) => {setBackground(e.target.value)}}
    className="bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    placeholder="flower,rose,sky" autoComplete="off"/>
  </div>
    <div className="mb-5">
    <label htmlFor="index" className="block mb-2 text-sm font-medium
    text-gray-700">Enter Background Index(Optional)</label>
    <input type="number" name="index"
    onChange={(e) => {setIndex(e.target.value)}}
    className="bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    placeholder="Random" autoComplete="off"/>
  </div>
    <div className="mb-5">
    <label htmlFor="slug" className="block mb-2 text-sm font-medium
    text-gray-700">Enter Slug(Optional)</label>
    <input type="text" name="slug"
    className="bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    placeholder="pokemon" autoComplete="off" />
  </div>
    <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800
    focus:ring-4 focus:outline-none focus:ring-blue-300
    font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
      Submit
    </button>
   </form>
   )
}

