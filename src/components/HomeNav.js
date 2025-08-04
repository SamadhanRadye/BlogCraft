// Enhanced HomeNav.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomeNav() {
 
  const [DARK, setDARK] = React.useState("Dark");

  const HandleOnClick = () => {
    if (DARK === "Dark") {
      setDARK("Light");
      document.body.style.backgroundColor = "#343a40";
      document.body.style.color = "white";
    } else {
      setDARK("Dark");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "black";
    }
  };
   
  return (
    <nav className="navbar navbar-expand-lg bg-info fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          📝 BlogCraft
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/">🏠 Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">ℹ️ About</Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ✍️ Blog Tools
              </a>
              <ul className="dropdown-menu" style={{ backgroundColor: "#8aacc4ff" }}>
                <li><Link className="dropdown-item" to="/blog-editor">📝 Write New Blog</Link></li>
                <li><Link className="dropdown-item" to="/my-blogs">📚 My Blogs</Link></li>
                <li><Link className="dropdown-item" to="/editText">📄 Text Editor</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/courses">🎓 Courses</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <span className="nav-link disabled" aria-disabled="true">🛠️ Services</span>
            </li>

          </ul>

          <form className="d-flex" role="search">
            <div className="form-check form-switch pe-3 pt-2">
                <input className="form-check-input" type="checkbox" value="" id="checkNativeSwitch" onClick={HandleOnClick} />
                <label className="form-check-label" htmlFor="checkNativeSwitch">{DARK}</label>
            </div>
            <input className="form-control me-2" type="search" placeholder="Search blogs..." aria-label="Search" />
            <button className="btn btn-outline-white" style={{ backgroundColor: "#8aacc4ff" }} type="submit">🔍</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default HomeNav;