import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import bytraitlogo from "../../assets/bytrait_logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate("/");
  };

  const renderMenuItems = () => {
    if (user.role === "student") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/myjobs">My Jobs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-campus">My Campus</Link>
          </li>
        </>
      );
    }

    if (user.role === "company") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/company/job-list">Jobs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/company/job-post">Post Job</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/company/companyprofile">Profile</Link>
          </li>
        </>
      );
    }

    if (user.role === "TPO") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/campus/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/campus/post-job">Post Job</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/campus/manage-jobs">Manage Jobs</Link>
          </li>
        </>
      );
    }

    if (user.role === "admin") {
      return (<>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/company-request">Request</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/manage-industry">Industry</Link>
        </li>
      </>);
    }

    return null;
  };

  return (
    <>
      <nav className="container navbar navbar-expand-lg navbar-light bg-white px-3 rounded-pill my-4 shadow-sm">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={bytraitlogo} width="130" alt="ByTrait Logo" />
          </Link>

          <button
            className="navbar-toggler p-0 border rounded d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end d-none d-lg-flex">
            <ul className="navbar-nav align-items-center">
              {renderMenuItems()}

              {user.role === "company" ? (
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://img.icons8.com/bubbles/100/000000/administrator-male.png"
                      alt="profile"
                      className="rounded-circle"
                      style={{ width: "35px", height: "35px" }}
                    />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li>
                      <a
                        className="dropdown-item"
                        href={`https://myprofile.bytrait.com/`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Profile
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={bytraitlogo} width="150" alt="ByTrait Logo" />
          </Link>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body navbar-collapse">
          <ul className="navbar-nav text-center">
            {renderMenuItems()}

            {user.role === "company" ? (
              <li className="nav-item mt-3">
                <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href={`https://myprofile.bytrait.com/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Profile
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
