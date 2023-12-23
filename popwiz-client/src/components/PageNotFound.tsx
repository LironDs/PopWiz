import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  return (
    <>
      <div className="container" style={{ textAlign: "center", minHeight: "73vh" }}>
        <h1>How did you got here?...</h1>
        <h2>
          I do believe you got lost. <br /> Click on the extremely cool Batman to head back home!
        </h2>
        <div>
          <Link to={"/"}>
            <img src="/batman_pnf.png" alt="Batman" width={400} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
