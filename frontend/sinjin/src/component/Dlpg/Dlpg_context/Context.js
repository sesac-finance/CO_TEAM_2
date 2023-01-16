import { useEffect, useState } from "react";

export default function Context({ data }) {
  const [modelaveprf, setModelaveprf] = useState();
  const [modeltotaluser, setModeltotaluser] = useState();
  const [modeluserave, setModeluserave] = useState();
  const [modelavemoney, setModelavemoney] = useState();

  useEffect(() => {
    if (data) {
      setModelaveprf(data.mod_rtr);
      setModeltotaluser(data.user_count);
      setModeluserave(data.user_avg);
      setModelavemoney(data.user_pri);
    } else {
    }
  });
  return (
    <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
      <div className="col d-flex flex-column align-items-start gap-2">
        <h3 className="fw-bold">로보어드바이저-DL</h3>
        <p className="text-muted">
          이 모델은 머신러닝을 사용한 모델로서 여러분의 자산을 AI와 함께
          관리해드립니다.
        </p>
      </div>

      <div className="col">
        <div className="row row-cols-1 row-cols-sm-2 g-4">
          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
            <h4 className="fw-semibold mb-0">수익률</h4>
            <p className="text-muted">
              모델의 평균 수익률은 <br />
              <strong style={{ color: "black", fontSize: "24px" }}>
                {modelaveprf}%
              </strong>{" "}
              입니다.
            </p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
            <h4 className="fw-semibold mb-0">유저수</h4>
            <p className="text-muted">
              이 모델을 사용하고 있는 유저의 수는 <br />
              <strong style={{ color: "black", fontSize: "24px" }}>
                {modeltotaluser}명
              </strong>{" "}
              입니다.
            </p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
            <h4 className="fw-semibold mb-0">
              유저들의<br></br> 평균 수익률
            </h4>
            <p className="text-muted">
              이 모델을 사용하여 함께 투자하고 계신 유저분들의 평균 수익률은{" "}
              <br />
              <strong style={{ color: "black", fontSize: "24px" }}>
                {modeluserave}%
              </strong>{" "}
              입니다.
            </p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
            <h4 className="fw-semibold mb-0">
              유저들의<br></br> 평균 투자금액
            </h4>
            <p className="text-muted">
              이 모델을 사용하는 유저들의 평균 투자금액은 <br />
              <strong style={{ color: "black", fontSize: "24px" }}>
                {modelavemoney}원
              </strong>{" "}
              입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
