import axios from "axios"
export function uploadDocument(file, url){
    return axios.
    put(url,file).
    then((res)=>{
        return res
    }).
    catch((err)=>{
       return err
    })
}