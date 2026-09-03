import "../header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
            type="text"
            placeholder="Search tail number, aircraft or airport..."
          />
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
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
