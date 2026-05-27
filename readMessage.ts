type conversations={
  data:{
    id:string
  }[]
}
function readToken(){
    const token2 =
  process.env.FACEBOOK_KEY
  return token2
}
async function readConversation(id: string) {
  
  const url = `https://graph.facebook.com/v20.0/${id}/conversations?fields=id,updated_time,participants&access_token=${readToken()}`;
  const res = await fetch(url);
  const data:conversations = await res.json() as conversations
  // console.log(data);
  // console.log(url)
  return data;
}
async function readMessage(id:string){

  const data=await readConversation(id)
  let i=0
  const out=[]
  // console.log(data.data)
  while(i<data.data.length){
    const res=await fetch(`https://graph.facebook.com/v20.0/${data.data[i++].id}/messages?fields=id,message,created_time,from&access_token=${readToken()}`)
    const tem = await res.json()
    out.push(tem)
    console.log(tem)

  }
  return readConversation

}
import { Router } from "express";
const router=Router()
router.get('/message/:id',async(req,res)=>{
    const data=await readMessage(req.params.id)
    res.status(200).json(data)
})



export default router