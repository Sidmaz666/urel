"use server"
import {redirect} from "next/navigation"
import connect from "@/config/connect"
import Hash from "@/models/hash"
import RedirectMiddleMan from "@/components/redirect_middleman"


export default async function Redirect({params}){
  await connect()
  const hash = params.redirect_hash
  if(!hash || hash.length < 2) return (<RedirectMiddleMan text={"Invalid URL!"}/>)
  const checkExist = await Hash.findOne({ hash })
  if(!checkExist) return (<RedirectMiddleMan text={"URL Doesn't Exist!"}/>)
  const url = new URL(checkExist.url);
  const searchParams = new URLSearchParams(url.search);
  for (const [key, value] of searchParams.entries()) {
    searchParams.set(key, encodeURIComponent(value));
  }
  url.search = searchParams.toString();
  const encodedUrl = url.toString();
  redirect(encodedUrl);
}
