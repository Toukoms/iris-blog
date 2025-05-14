import { FaGithub } from "react-icons/fa";

function LoginBtn() {
  return (
    <button type="button" className="btn btn-primary btn-outline">
      <FaGithub /> <span>Login</span>
    </button>
  );
}

export default LoginBtn;
