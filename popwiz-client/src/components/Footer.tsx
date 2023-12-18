import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <div>
        <div className="footer">
          <div className="col">
            <h5>Account</h5>
            <hr />

            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>User Profile</li>
              <li>Cart</li>
            </ul>
          </div>
          <div className="col">
            <h5>Account</h5>
            <hr />

            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>User Profile</li>
              <li>Cart</li>
            </ul>
          </div>
          <div className="col">
            <h5>Account</h5>
            <hr />

            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>User Profile</li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
