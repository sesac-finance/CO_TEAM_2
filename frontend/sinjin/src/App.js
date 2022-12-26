import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a href='home' className='homelogo'><h1>🐳신진데사</h1></a>
    
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a href="home" className="nav-link px-2 link-dark">Home</a></li>
            <li><a href="service" className="nav-link px-2 link-dark">Service</a></li>
            <li><a href="mypg" className="nav-link px-2 link-dark">My Page</a></li>
            <li><a href="faqs" className="nav-link px-2 link-dark">FAQs</a></li>
            <li><a href="about" className="nav-link px-2 link-dark">About</a></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <button type="button" className="btn btn-outline-primary me-2"><a className='loginbut' href='login'>Login</a></button>
            <button type="button" className="btn btn-primary"><a className='signupbut' href='signup'>Sign-up</a></button>
          </div>
        </header>
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p class="col-md-4 mb-0 text-muted">© 신진데사</p>
        <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        </a>
    
        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item">
            <a href="home" class="nav-link px-2 text-muted">Home</a>
          </li>
          <li class="nav-item"><a href="faqs" class="nav-link px-2 text-muted">FAQs</a></li>
          <li class="nav-item"><a href="about" class="nav-link px-2 text-muted">About</a></li>
        </ul>
        </footer>
      </div>
  );
}

export default App;
