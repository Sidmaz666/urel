"use client"
import { useState } from "react"
import {FaClipboard, FaClipboardCheck, FaTrash} from "react-icons/fa"
import axios from "axios";

export default function LinkContainer({data,setDelete}) {
 const [copySuccess, setCopySuccess] = useState('');
 const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess(false);
    }
  };
  const deleteLink = async data => {
	await axios.get(`/api/url/delete/${data}`)    
    	const saved_ = localStorage.getItem("stored_hash")
    	const new_hash = []
    	saved_.split(",").forEach((hash) => {
	  if(hash !== data) new_hash.push(hash)
	})
        localStorage.setItem("stored_hash", new_hash.join())
	setDelete(data)
  }
  return (
	     <div key={data} 
	     className="bg-gray-100 w-full 
	     flex justify-between items-center
	     rounded-md">
	     <span className="p-2 font-semibold
    	      hover:text-gray-500
	      md:text-2xl text-sm">
	    <a 
    	     target="_blank"
	     href={
	       `${window.location.origin}/${data}`
	     }>
	       {window.location.origin}/{data}
	     </a>
	     </span>
	    <div className="flex space-x-2">
	     <button className="p-2
    	      hover:text-gray-500
	      md:text-2xl text-sm"
 	      onClick={() => {
		deleteLink(data)
	      }}
	     >
		<FaTrash/>
    	     </button>
	     <button className="p-2
    	      hover:text-gray-500
	      md:text-2xl text-sm"
 	      onClick={() => {
		copyToClipBoard(
		  `${window.location.origin}/${data}`
		)
	      }}
	     >
	     {
	       copySuccess == '' ? 
		<FaClipboard/>
	       :
		<FaClipboardCheck/>
	     }
	     </button>
	    </div>
	   </div>
  )
}

