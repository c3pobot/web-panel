import { SetCookie } from './cookies'
import DB from 'components/db'
export default async function SetAuth(obj = {}) {
  if(obj.data){
    for(let i in obj.data){
      if(i && obj.data[i]){
        if(i !== 'webProfile') await DB.set(i, obj.data[i])
      }
    }
  }
  let allyCodes = await DB.get('allyCodes')
  if(allyCodes && allyCodes?.length > 0) await SetCookie('botLink', true, true)
  await SetCookie('discordId', obj.encryptedId, true)
}
