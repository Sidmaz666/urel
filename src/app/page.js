"use client"
import {useState} from 'react';
import {FaPlus} from 'react-icons/fa'
import FormContainer from '@/components/form_container';
import SavedLinks from '@/components/saved_links';

export default function Main() {
  const [isForm,setForm] = useState(false)
  return (
  <main className="flex justify-start flex-col
    items-start min-h-screen bg-gray-200
    ">
     <div className="py-2 px-4 bg-gray-100 w-full
     text-gray-600
     flex justify-between items-center">
        <button onClick={() => {
	  setForm(true)
	  }
	}
    	className="bg-blue-100 rounded-full p-1
	 hover:text-gray-500
	">
		<FaPlus/>
   	</button>
	<span 
    	className="text-3xl font-mono
    	font-extrabold">UReL</span>
    </div>
	{
	  isForm ? <FormContainer setForm={setForm}/> : <SavedLinks/>
	}
  </main>
  );
}
