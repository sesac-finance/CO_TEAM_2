import mainimg from './mainimg.png'

export default function Mainpg(){
    return(
    <div>
        <div className="mainimg">
            <img src={mainimg} alt="mainimage" style={{width:'100%'}}></img>
        </div>
        

    </div>
    )
  }