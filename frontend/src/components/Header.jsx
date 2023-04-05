import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
function Header() {
  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link>Infocom </Link>
      </div>
      <ul>
        {localStorage.getItem("token") ? (
          <li>
            <Link onClick={logout}>
              <FaSignOutAlt></FaSignOutAlt> LogOut
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt></FaSignInAlt> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser></FaUser> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
