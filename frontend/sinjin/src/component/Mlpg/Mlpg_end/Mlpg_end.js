/* eslint-disable no-restricted-globals */

import axios from "axios";

export default function Endcontext() {
  const handleClick = () => {
    if (confirm("93772048024204로 입금해주세요!") === true) {
      if (confirm("정말 입금 완료하셨습니까?") === true) {
        axios.get('http://localhost:4000/api/transaction/12/1')
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
  return (
    <div className="px-4 py-5 my-5 text-center">
    <h1 className="display-5 fw-bold">함께 하시겠습니까?</h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">혼자하는 투자가 아닙니다.<br/>저희와 함께 떠나는 여정<br/> 여러분의 행복한 금융생활을 위해 노력하겠습니다.</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button onClick={handleClick} type="button" className="btn btn-primary btn-lg">입금신청하기</button>
      </div>
    </div>
  </div>
  );
}
