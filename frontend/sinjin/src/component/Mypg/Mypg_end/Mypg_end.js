/* eslint-disable no-restricted-globals */

export default function Endcontext() {
  const handleInClick = () => {
    if (confirm("39939334 \n국민은행  \n으로 입금해주세요!") === true) {
      if (confirm("정말 입금 완료하셨습니까?") === true) {
        alert("이용해주셔서 감사합니다!❤️");
      } else {
        alert("다음에 또 만나요~");
      }
    } else {
      alert("다음에 또 만나요~");
    }
  };
  const handleOutClick = () => {
    if (confirm("출금을 하시겠습니까?") === true) {
      if (prompt("출금하시고싶으신 금액을 적어주세요. ex) 2000000")) {
        if (prompt("받으실 계좌의 은행정보를 입력해주세요")) {
          if (prompt("출금을 원하시는 금액을 입력해주세요!")) {
            alert(
              "출금까지 5일이 소요됩니다!\n문의를 원하시면 \n010-8615-0745로 전화주세요"
            );
          } else {
            alert("다음에 또 만나요~");
          }
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
