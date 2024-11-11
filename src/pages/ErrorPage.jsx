import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="errorPage">
      <h1>Oh no, this route doesn&apos;t exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
