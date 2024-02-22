export default function RedirectMiddleMan({text}){
  return(
    <main className="flex justify-center items-center w-screen h-screen bg-gray-900">
	<span className="text-xl font-semibold font-mono text-slate-400">{text ? text : "Loading..."}</span>
    </main>
  )
}
