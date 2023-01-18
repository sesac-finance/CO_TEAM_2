import { useEffect, useState } from 'react'
import mainimg from './mainimg.png'
import axios from 'axios'

export default function Mainpg(){
  const [mlcont, setMlcont] = useState()
  useEffect(()=>{
    if (!mlcont) { axios.get('http://3.35.49.211/api/modelinfo/1')
    .then((res) => {
        setMlcont(res.data)
        console.log('부부',res.data)
    })}
})
  const [mlaveprf,setMlaveprf]= useState()
  const [mltotaluser,setMltotaluser] = useState()
  const [mluserave, setMluserave] = useState()
  const [mlavemoney, setMlavemoney] = useState()

  useEffect(() => {
    if (mlcont) {
    setMlaveprf(mlcont.mod_rtr)
    setMltotaluser(mlcont.user_count)
    setMluserave(mlcont.user_avg)
    setMlavemoney(mlcont.user_pri)
  }else{
    }
  })
  const [dlcont, setDlcont] = useState()
  useEffect(()=>{
    if (!dlcont) { axios.get('http://3.35.49.211/api/modelinfo/2')
    .then((res) => {
        setDlcont(res.data)
        console.log('부부',res.data)
    })}
})
  const [dlaveprf, setDlaveprf] = useState();
  const [dltotaluser, setDltotaluser] = useState();
  const [dluserave, setDluserave] = useState();
  const [dlavemoney, setDlavemoney] = useState();

  useEffect(() => {
    if (dlcont) {
      setDlaveprf(dlcont.mod_rtr);
      setDltotaluser(dlcont.user_count);
      setDluserave(dlcont.user_avg);
      setDlavemoney(dlcont.user_pri);
    } else {
    }
  });

    return(
    <div>
        <div className="mainimg">
            <img src={mainimg} alt="mainimage" style={{width:'100%'}}></img>
        </div>

    <div className="container px-4 py-5">
        <h2 className="pb-2 border-bottom">신진데사가 만든 모델</h2>

        <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
            <div className="col d-flex flex-column align-items-start gap-2">
            <h3 className="fw-bold">로보어드바이저-ML</h3>
            <p className="text-muted">이 모델은 머신러닝을 사용한 모델로서 여러분의 자산을 AI와 함께 관리해드립니다.</p>
            <a href="model/ml" className="btn btn-primary btn-lg">상세보기</a>
        </div>

         <div className="col">
            <div className="row row-cols-1 row-cols-sm-2 g-4">
                <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        
                    </div>
                    <h4 className="fw-semibold mb-0">수익률</h4>
                    <p className="text-muted">모델의 평균 수익률은 <br /><strong style={{color:'black', fontSize:'24px'}}>{mlaveprf}%</strong> 입니다.</p>
                </div>

                <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        
                    </div>
                    <h4 className="fw-semibold mb-0">유저수</h4>
                    <p className="text-muted">이 모델을 사용하고 있는 유저의 수는 <br /><strong style={{color:'black', fontSize:'24px'}}>{mltotaluser}명</strong> 입니다.</p>
                </div>

                <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        
                    </div>
                    <h4 className="fw-semibold mb-0">유저들의<br></br> 평균 수익률</h4>
                    <p className="text-muted">이 모델을 사용하여 함께 투자하고 계신 유저분들의 평균 수익률은 <br /><strong style={{color:'black', fontSize:'24px'}}>{mluserave}%</strong> 입니다.</p>
                </div>

                <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        
                    </div>
                    <h4 className="fw-semibold mb-0">유저들의<br></br> 평균 투자금액</h4>
                    <p className="text-muted">이 모델을 사용하는 유저들의 평균 투자금액은 <br /><strong style={{color:'black', fontSize:'24px'}}>{mlavemoney}만원</strong> 입니다.</p>
                </div>
            </div>
        </div>
    </div>
    <hr></hr>
  <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
      <div className="col d-flex flex-column align-items-start gap-2">
        <h3 className="fw-bold">로보어드바이저-DL</h3>
        <p className="text-muted">이 모델은 딥러닝을 사용한 모델로서 여러분의 자산을 AI와 함께 관리해드립니다.</p>
        <a href="model/dl" className="btn btn-primary btn-lg">상세보기</a>
      </div>

      <div className="col">
        <div className="row row-cols-1 row-cols-sm-2 g-4">
          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
            
            </div>
            <h4 className="fw-semibold mb-0">수익률</h4>
            <p className="text-muted">모델의 평균 수익률은 <br /><strong style={{color:'black', fontSize:'24px'}}>{dlaveprf}%</strong> 입니다.</p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              
            </div>
            <h4 className="fw-semibold mb-0">유저수</h4>
            <p className="text-muted">이 모델을 사용하고 있는 유저의 수는 <br /><strong style={{color:'black', fontSize:'24px'}}>{dltotaluser}명</strong> 입니다.</p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              
            </div>
            <h4 className="fw-semibold mb-0">유저들의<br></br> 평균 수익률</h4>
            <p className="text-muted">이 모델을 사용하여 함께 투자하고 계신 유저분들의 평균 수익률은 <br /><strong style={{color:'black', fontSize:'24px'}}>{dluserave}%</strong> 입니다.</p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              
            </div>
            <h4 className="fw-semibold mb-0">유저들의<br></br> 평균 투자금액</h4>
            <p className="text-muted">이 모델을 사용하는 유저들의 평균 투자금액은 <br /><strong style={{color:'black', fontSize:'24px'}}>{dlavemoney}만원</strong> 입니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
        

    </div>
    )
  }