export default function getTimeSince(ms) {
  if(!ms) return 'unknown'
  let diff = Date.now() - ms
  let str = ''
  if(diff < 1000) return '1 S'
  if(diff >= 86400000){
    let days = Math.floor(diff / 86400000)
    str += `${days} D `
    diff = diff - (days * 86400000)
  }
  if(diff >= 3600000){
    let hours = Math.floor(diff / 3600000)
    str += `${hours} H `
    diff = diff - (hours * 3600000)
  }
  if(diff >= 60000){
    let mins = Math.floor(diff / 60000)
    str += `${mins} M `
    diff = diff - (mins * 60000)
  }
  if(diff >= 1000){
    str += `${Math.floor(diff / 1000)} S`
  }
  return str
}
