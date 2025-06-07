import { createClient } from "@supabase/supabase-js"

const url = "https://eiofvghmdzspvewawxhf.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpb2Z2Z2htZHpzcHZld2F3eGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNjg4OTgsImV4cCI6MjA2NDg0NDg5OH0.Vj3lZSmCbcLMpSNLpf3oVFEJnV2OZsfISjMzhMg3p_U"

const supabase = createClient(url,key)

export default function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve, reject)=>{

            if(file == null){
                reject("No file selected")
                return
            }

            const timestamp = new Date().getTime()
            const newName = timestamp+file.name

            supabase.storage.from("images").upload(newName, file, {
                upsert:false,
                cacheControl:"3600"
            }).then(()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
            }).catch(
                ()=>{
                    reject("Error occured in supabase connection")
                }
            )
        }
    )

    return mediaUploadPromise

}