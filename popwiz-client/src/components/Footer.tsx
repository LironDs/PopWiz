import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <footer className="border-top w-100 position-fixed bottom-0 bg-dark text-light text-center py-1">
        <div>
          Created by Liron David-Shiloah &copy;
          <img
            src="/logo-no-background.svg"
            alt="logo Sniffle"
            style={{ width: "180px", marginLeft: "20px" }}
          />
          <span style={{ marginLeft: "15px" }}>Follow us:</span>
          <i className="bi bi-twitter-x" style={{ marginLeft: "5px" }}></i>
          <i className="bi bi-instagram" style={{ margin: "15px" }}></i>
          <i className="bi bi-facebook"></i>
        </div>
      </footer>
    </>
  );
};

export default Footer;
