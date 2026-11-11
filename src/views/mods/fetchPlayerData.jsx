import apiRequest from 'components/apiRequest'
import db from 'components/db'
export default async function fetchPlayerData(allyCode, discordId, force = false){
  if(!allyCode) return

  let data
  if(!force) data = await db.get(`${allyCode}-mods`)
  if(!data?.player) data = await apiRequest({ method: 'getPlayer', dId: discordId, data: { allyCode: allyCode } })
  if(data?.player) await db.set(`${allyCode}-mods`, data)
  return data
}
