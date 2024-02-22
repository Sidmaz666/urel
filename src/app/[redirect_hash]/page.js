"use server"
import {redirect} from "next/navigation"
import connect from "@/config/connect"
import Hash from "@/models/hash"
import RedirectMiddleMan from "@/components/redirect_middleman"

export default async function Redirect({params}){
  const hash = params.redirect_hash
  if(!hash || hash.length < 2) return (<RedirectMiddleMan text={"Invalid URL!"}/>)
  await connect()
  const checkExist = await Hash.findOne({ hash })
  if(!checkExist) return (<RedirectMiddleMan text={"URL Doesn't Exist!"}/>)
  redirect(checkExist.url)
}