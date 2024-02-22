import isUrl from "is-url"
import axios from "axios"

export default function ShortLinkForm({setForm}) {
  const handleForm = async (e) => {
    e.preventDefault()
    const url = e.target[0].value
    if(!isUrl(url)) return
    const slug = e.target[1].value
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
    <div className="mb-5">
    <label htmlFor="url" className="block mb-2 text-sm font-medium
    text-gray-700">Enter Link(Required)</label>
    <input type="text" name="url"
    className="bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    placeholder="https://somelink.com" autoComplete="off" required />
  </div>
    <div className="mb-5">
    <label htmlFor="slug" className="block mb-2 text-sm font-medium
    text-gray-700">Enter Slug(Optional)</label>
    <input type="text" name="slug"
    className="bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    placeholder="pokemon" autoComplete="off"/>
  </div>
    <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800
    focus:ring-4 focus:outline-none focus:ring-blue-300
    font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
      Submit
    </button>
   </form>
   )
}
