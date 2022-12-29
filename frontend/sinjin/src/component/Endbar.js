
export default function Endbar(){
    return(
      <div className="container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-muted">© 신진데사</p>
          <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          </a>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-muted">Home</a>
            </li>
            <li className="nav-item"><a href="mypg" className="nav-link px-2 text-muted">My page</a></li>
            <li className="nav-item"><a href="service" className="nav-link px-2 text-muted">Service</a></li>
          </ul>
          </footer>
      </div>
    )
  }
  