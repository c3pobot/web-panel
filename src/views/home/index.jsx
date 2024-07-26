import GetCookie from 'components/cookies'
import ButtonNav from 'components/buttonNav'
export default function Home() {
  let botLink = GetCookie('botLink')
  if(botLink !== "true"){
    ButtonNav('/allyCodes')
  }
  return (
    <div>Comming Soon (tm)</div>
  )
}
