/* eslint-disable no-restricted-globals */

import axios from "axios";
import { useState } from "react";

export default function Endcontext() {
  // const [prc_pri, setPrc_pri] = useState()
  // const [mod_id, setMod_id] = useState()

  const handleInClick = () => {
      const mod_id = prompt('입금 희망하는 모델을 적어주세요! ML 모델이라면 1을 DL 모델이라면 2를 입력해주세요!')
      console.log(mod_id)
      if (confirm("93772048024204로 입금해주세요!") === true) {
        if (confirm("정말 입금 완료하셨습니까?") === true) {
          axios({
            method:'get',
            url:'http://3.35.49.211/api/transaction/'+mod_id,
            headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
          })
          .then((res)=>{
            if(res.data==='success'){
              alert('입금처리완료!!')
              console.log(res.data)
            }else{
              console.log(res.data)
            }
            alert("이용해주셔서 감사합니다!❤️");
          })
        } else {
          alert("다음에 또 만나요~");
        }
      } else {
        alert("다음에 또 만나요~");
      }
    };
  const handleOutClick = () => {
    if (confirm("출금을 하시겠습니까?") === true) {
      var prc_pri = prompt('출금하시고싶으신 금액을 적어주세요.  ex) 2000000')
      if (prc_pri === true) {
        
        console.log(prc_pri)
        var mod_id =prompt("출금 희망하는 모델을 적어주세요! ML 모델이라면 1을 DL 모델이라면 2를 입력해주세요!")
        if (mod_id === true) {
          console.log(mod_id)
          axios({
            url: 'http://3.35.49.211/api/withdraw/',
            method: 'post',
            headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
            data: {
              mod_id:mod_id,
              prc_pri:prc_pri
            }
          })
          console.log(mod_id, prc_pri)
          .then(function a(response) { 
            console.log(response) 
          })
          .catch(function (error) {
            console.log(error);
          });
        } else {
          alert("다음에 또 만나요~~");
        }
      } else {
        alert("다음에 또 만나요~");
      }
    } else {
      alert("다음에 또 만나요~");
    }
  };
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">입금 / 출금</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          입금을 원하시면 입금신청을
          <br /> 출금을 원하시면 출금신청을 해주세요
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button
            onClick={handleInClick}
            type="button"
            className="btn btn-primary btn-lg"
          >
            입금신청하기
          </button>
          <button
            onClick={handleOutClick}
            type="button"
            className="btn btn-primary btn-lg"
          >
            출금신청하기
          </button>
        </div>
      </div>
    </div>
  );
}
