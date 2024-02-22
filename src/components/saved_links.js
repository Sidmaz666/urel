"use client"
import { useState, useEffect } from "react"
import LinkContainer from "./link_container"

export default function SavedLinks() {
 const [isData,setData] = useState("")
 const [isDelete,setDelete] = useState("")
  useEffect(() => {
    set_data()
  },[])
  useEffect(() => {
    if(isDelete.length > 1){
      	set_data()
    }
  },[isDelete])
  const set_data = () => {
	const saved_ = localStorage.getItem("stored_hash") || false
    	if(saved_){
	  setData(saved_.split(",").reverse())
	} else {
	  setData("null")
	}
  }
  return (
    <div className="py-2 px-4 space-y-2
    w-full
    text-gray-600 flex flex-col
    justify-start items-center">
    {
	isData && typeof isData !== "string" && isData.length > 0 ?
         isData.map((data) => {
	   return(
	     <LinkContainer key={data} data={data} setDelete={setDelete}/>
	   )
	 })
      	: isData == "null" ? "No Saved Links!" : "Loading..."
    }
    </div>
  )
}
