import { useState } from "react";

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
      <footer>
        <div className="footerContainer">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button onClick={getEmail}></button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
