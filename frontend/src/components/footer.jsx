import { useState } from "react";
import "../footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [thanksRespons, setRespons] = useState("");

  const getEmail = () => {
    setEmail(email);
    setRespons(". Tack för att du skrev!");
    console.log(email + thanksRespons);
  };

  return (
    <div>
      <section>
        <div className="footerContainer">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button onClick={getEmail}></button>
        </div>
      </section>

      <footer>
        <nav className="footerNavigationContainer">
          <div className="footerSiteLogo">
            <ul>
              <li>
                <a href="#top">
                  <span className="fineAir">FINE AIR</span>
                  <span className="slogan">SKY IS THE LIMIT</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footerLinks">
            <ul>
              <li>
                <a href="#">Live Map</a>
                <a href="#">Aircraft</a>
                <a href="#">Airports</a>
                <a href="#">Alerts</a>
                <a href="#">About</a>
                <a href="#">Privacy</a>
              </li>
            </ul>
          </div>

          <div className="copyright">
            <span>© 2026 Fine Air</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
