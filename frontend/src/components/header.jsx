const Header = () => {
  return (
    <header>
      <nav className="navigationContainer">
        <div className="sideLogo">
          <ul>
            <li>
              <a href="#top">Fine</a>
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

        <div className="hamburgerButton"></div>
      </nav>
    </header>
  );
};

export default Header;
