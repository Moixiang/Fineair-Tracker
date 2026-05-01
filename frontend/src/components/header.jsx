import "../header.css";

const Header = () => {
  return (
    <header>
      <nav className="navigationContainer">
        <div className="siteLogo">
          <ul>
            <li>
              <a href="#top">
                <span className="fineAir">FINE AIR</span>
                <span className="slogan">SKY IS THE LIMIT</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="searchBar">
          <input
            type="search"
            placeholder="Search tail number, aircraft or airport..."
          />
        </div>

        <div>
          {/*<button className="openNavbar" onClick="openNavbar()">
            &#9776;
          </button>*/}
          <button className="openNavbar">&#9776;</button>
        </div>

        <div className="closeNavbar">
          {/* <button className="closeNavbar" onClick="closeNavbar()">
            &#9932;
          </button>*/}
          <button className="closeNavbar">&#9932;</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
