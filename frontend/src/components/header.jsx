const Header = () => {
  return (
    <header className="">
      <nav className="navigationContainer">
        <div className="sideLogo">
          <ul>
            <li>
              <a href="#top">FINE AIR</a>
            </li>
          </ul>
          <span>SKY IS THE LIMIT</span>
        </div>

        <div className="search">
          <input
            type="search"
            placeholder="Search tail number, aircraft or airport..."
          />
        </div>

        <div>
          <button className="openNavbar" onClick="openNavbar()">
            &#9776;
          </button>
        </div>

        <div className="closeNavbar">
          <button className="closeNavbar" onClick="closeNavbar()">
            &#9932;
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
