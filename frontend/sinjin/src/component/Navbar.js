export default function Navbar(){
    return(
      <div className="container">
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href='/' className='homelogo'><h2>🐳신진데사</h2></a>
      
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/" className="nav-link px-2 link-dark">Home</a></li>
              <li><a href="service" className="nav-link px-2 link-dark">Service</a></li>
              <li><a href="mypg" className="nav-link px-2 link-dark">My Page</a></li>
              <li><a href="model/ml" className="nav-link px-2 link-dark">ML model</a></li>
              <li><a href="model/dl" className="nav-link px-2 link-dark">DL model</a></li>
            </ul>
      
            <div className="col-md-3 text-end">

              <a className='loginbut' href='login'><button type="button" className="btn btn-outline-primary me-2">Login</button></a>
              <a className='signupbut' href='signup'><button type="button" className="btn btn-primary">Sign-up</button></a>
            </div>
          </header>
      </div>
    )
  }