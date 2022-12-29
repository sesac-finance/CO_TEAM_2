import mainimg from './mainimg.png'

export default function Mainpg(){
    return(
    <div>
        <div className="mainimg">
            <img src={mainimg} alt="mainimage" style={{width:'100%'}}></img>
        </div>
        {/* <div className='modeldetail'>
            <div className='modeldetail_1'>
                <h3>모델 1</h3>
                <p>모델 1은 머신러닝 기술을 사용한 모델을 사용한 모델입니다. </p>
                <a href='model/1' className='modeldetail_1'><button className='btn btn-primary btn-lg'>상세보기</button></a>
            </div>
            <div className='modeldetail_box'>
                <div className='modeldetail_box_1'>
                    <h3>수익률</h3>
                    <p>수익률은 전체의</p>
                    <h2>35%</h2>
                    <p>입니다.</p>
                    
                </div>
                <div className='modeldetail_box_2'>
                    <h3>유저수</h3>
                    <p>이 모델을 사용하고있는 유저수는</p> 
                    <h2>120만명</h2>
                    <p>입니다.</p>
                </div>
                <div className='modeldetail_box_3'>
                    <h3>유저들의 평균 수익률</h3>
                    <p>이 모델을 사용하고있는 유저들의 평균수익률은 </p>
                    <h2>23%</h2>
                    <p>입니다.</p>
                </div>
                <div className='modeldetail_box_4'>
                    <h3>유저들의 평균 투자금</h3>
                    <p>이 모델을 사용하고있는 유저들의 평균투자금은 </p>
                    <h2>312만원</h2>
                    <p>입니다.</p>
                </div>
                
            </div>
        </div> */}

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
                    <p className="text-muted">모델의 평균 수익률은 <br /><strong style={{color:'black', fontSize:'24px'}}>30%</strong> 입니다.</p>
                </div>

                <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        
                    </div>
                    <h4 className="fw-semibold mb-0">유저수</h4>
                    <p className="text-muted">이 모델을 사용하고 있는 유저의 수는 <br /><strong style={{color:'black', fontSize:'24px'}}>200만명</strong> 입니다.</p>
                </div>

                <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        
                    </div>
                    <h4 className="fw-semibold mb-0">유저들의<br></br> 평균 수익률</h4>
                    <p className="text-muted">이 모델을 사용하여 함께 투자하고 계신 유저분들의 평균 수익률은 <br /><strong style={{color:'black', fontSize:'24px'}}>23%</strong> 입니다.</p>
                </div>

                <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        
                    </div>
                    <h4 className="fw-semibold mb-0">유저들의<br></br> 평균 투자금액</h4>
                    <p className="text-muted">이 모델을 사용하는 유저들의 평균 투자금액은 <br /><strong style={{color:'black', fontSize:'24px'}}>329만원</strong> 입니다.</p>
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
            <p className="text-muted">모델의 평균 수익률은 <br /><strong style={{color:'black', fontSize:'24px'}}>22%</strong> 입니다.</p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              
            </div>
            <h4 className="fw-semibold mb-0">유저수</h4>
            <p className="text-muted">이 모델을 사용하고 있는 유저의 수는 <br /><strong style={{color:'black', fontSize:'24px'}}>230만명</strong> 입니다.</p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              
            </div>
            <h4 className="fw-semibold mb-0">유저들의<br></br> 평균 수익률</h4>
            <p className="text-muted">이 모델을 사용하여 함께 투자하고 계신 유저분들의 평균 수익률은 <br /><strong style={{color:'black', fontSize:'24px'}}>33%</strong> 입니다.</p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              
            </div>
            <h4 className="fw-semibold mb-0">유저들의<br></br> 평균 투자금액</h4>
            <p className="text-muted">이 모델을 사용하는 유저들의 평균 투자금액은 <br /><strong style={{color:'black', fontSize:'24px'}}>619만원</strong> 입니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
        

    </div>
    )
  }