"use client"
import {useState} from "react"
import { FaXmark } from "react-icons/fa6";
import ShortLinkForm from "./url_short_form";
import QRGenerate from "./qr_generate_form";
import QRRead from "./qr_read_form";
import CustomPageForm from "./custom_page_form";

export default function FormContainer({setForm}){
  const [formType,setFormType] = useState(0)
  const handleSelectChange = (e) => {
    setFormType(e.target.value)
  }
  return(
  <main className="absolute left-0 top-0 z-50 w-screen h-screen 
    flex justify-center items-center flex-col
    bg-gray-200">
     <div className="absolute top-0 left-0 py-2 px-4 w-full
     text-gray-600
     flex justify-end items-center">
    	<button
         onClick={() => {setForm(false)}}
         className="bg-blue-100 rounded-full p-1
    	 text-xl
	 hover:text-gray-500
	    ">
		<FaXmark/>
    	</button>
	</div>
    	<div className="max-w-sm flex flex-col space-y-5">
	<select
        className="bg-gray-50 border 
    	border-gray-300 text-gray-700
    	font-semibold
    	text-xl rounded-lg focus:ring-blue-500
    	focus:border-blue-500 block w-full p-2.5"
    	onChange={handleSelectChange}
        defaultValue={0}>
	  <option value={0}>Generate Short Link</option>
	  <option value={1}>Generate QR Code</option>
	  <option value={2}>Read QR Code</option>
	  <option value={3}>Create Custom Page</option>
	</select>
       {
	 formType == 0 ? <ShortLinkForm setForm={setForm}/> : null ||
	 formType == 1 ? <QRGenerate setForm={setForm}/> : null ||
	 formType == 2 ? <QRRead setForm={setForm}/> : null ||
	 formType == 3 ? <CustomPageForm setForm={setForm} /> : null
       }
    	</div>
    </main>
  )
}
