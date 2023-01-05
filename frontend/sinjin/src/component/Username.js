import axios from "axios"

export default function Username(){
    const jwtToken = localStorage.getItem('jwt')
    if (!jwtToken){
      return
    }
    axios({
    method:'get',
    url: `http://localhost:4000/accounts/user/`,
    headers: {Authorization: `Bearer ${jwtToken}`},
  })
  .then(res => {
    return res.data.name
  })
  }