import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

function Enrollform() {
  const [values, setValues] = useState({
    coursename:'',
    firstName: '',
    lastName: '',
    gender: '',
    fatherName: '',
    phoneNumber1: '',
    phoneNumber2: '',
    motherName: '',
    emailId: '',
    age: '',
    houseNo: '',
    streetName: '',
    areaName: '',
    pincode: '',
    state: '',
    nationality: '',

  });

  const navigate = useNavigate();
  useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedUser');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  }, []);
    function HandleLogout(){
      navigate('/login');
      localStorage.removeItem('authenticatedUser');
      localStorage.removeItem('authenticatedAdmin');
    }
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8081/enrollform', values)
      .then((res) => {
        navigate('/enrolledcourse');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body">
      <div>
        <br />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
        <div className="container">
          <a className="navbar-brand">Boxing academy</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/Viewacademy" className="nav-link active" id="adminAcademy" aria-current="page">
                  Academy
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Enrolledcourse" className="nav-link" id="adminCourse">
                  Enrolled Course
                </Link>
              </li>
            </ul>
            <Link to="/login">
              <a className="logout" id="logout" onClick={HandleLogout}>
                Logout
              </a>
            </Link>
          </div>
        </div>
        <Outlet />
      </nav>
      <br></br>
      <br></br>
      <br></br><br></br>
      <div className="d-flex justify-content-center align-items-center addpage">
        <div className="p-1 rounded w-50 border addform">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
              <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="coursename"
                    name="coursename"
                    placeholder="Enter course name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="gender"
                    name="gender"
                    placeholder="Enter male or female"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="fatherName"
                    name="fatherName"
                    placeholder="Enter your father's name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber1"
                    name="phoneNumber1"
                    placeholder="Enter phone number"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber2"
                    name="phoneNumber2"
                    placeholder="Enter alternate number"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="motherName"
                    name="motherName"
                    placeholder="Enter your mother's name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    placeholder="Enter email Id"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="col">
                <h4>Address information</h4>
                <div className="mb-3">
                  House No:
                  <input
                    type="text"
                    className="form-control"
                    id="houseNo"
                    name="houseNo"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  Street Name:
                  <input
                    type="text"
                    className="form-control"
                    id="streetName"
                    name="streetName"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  Area Name:
                  <input
                    type="text"
                    className="form-control"
                    id="areaName"
                    name="areaName"
                    placeholder=""
                    autoComplete="off"
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  Pin Code:
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  State:
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  Nationality:
                  <input
                    type="text"
                    className="form-control"
                    id="nationality"
                    name="nationality"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <center>
              <button type="submit" id="enrollNowButton" className="btn btn-success ">
                Enroll now
              </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Enrollform;
