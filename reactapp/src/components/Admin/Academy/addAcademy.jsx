import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';

function Addacademy() {
  const [values, setValues] = useState({
    academyName: '',
    contactNumber: '',
    imageUrl: '',
    emailId: '',
    academyLocation: '',
    academyDescription: ''
  });

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedAdmin');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/api/Admin/addacademy', values)
      .then((res) => {
        navigate('/academy');
      })
      .catch((err) => console.error(err.response));
  };

  function handleLogout() {
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
  }

  return (
    <div className="body">
      <div>
        <br />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
        <div className="container-fluid">
          <a className="navbar-brand">Boxing academy</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/academy" className="nav-link active" id="adminAcademy" aria-current="page">
                  Academy
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Admincourse" className="nav-link" id="adminCourse">
                  Course
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Adminstudents" className="nav-link" id="adminStudents">
                  Students
                </Link>
              </li>
            </ul>
            <Link to="/login">
              <a className="logout" id="logout" onClick={handleLogout}>
                Logout
              </a>
            </Link>
          </div>
        </div>
        <Outlet />
      </nav>
      <div className="d-flex justify-content-center align-items-center vh-100 addpage">
        <div className="p-1 rounded w-25 border addform">
          <h2>Add Academy</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="academyName"
                name="academyName"
                placeholder="Enter Academy name"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter the Contact number"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                placeholder="Enter the academy Image Url"
                autoComplete="off"
                required
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="emailId"
                placeholder="Enter the academy email"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="academyLocation"
                name="academyLocation"
                required
                placeholder="Enter Academy Location"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                id="academyDescription"
                name="academyDescription"
                rows="3"
                placeholder="Enter Academy description"
                autoComplete="off"
                onChange={handleInput}
              ></textarea>
            </div>
            <div className="mb-3">
              <button type="submit" id="addButton" className="btn btn-success w-10">
                Add Academy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addacademy;
