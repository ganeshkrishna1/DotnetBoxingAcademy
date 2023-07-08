import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';

function AddStudent() {
  const [values, setValues] = useState({
    coursename: '',
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
    pincode: '',
    state: '',
    nationality: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedAdmin');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, []);

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/Admin/addstudent', values);
      if (response.status === 200) {
        navigate('/adminstudents');
      } else {
        console.log('Unexpected response:', response);
      }
    } catch (error) {
      const { data } = error.response;
      console.log(data.errors); // Access specific validation errors
      console.log(data.title);    }
  };

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
  };

  return (
    <div className="body">
      <div>
        <br />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Boxing academy
          </Link>
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
            <Link to="/login" className="logout" id="logout" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
        <Outlet />
      </nav>
      <br />
      <br />
      <br />
      <br />
      <div className="d-flex justify-content-center align-items-center addpage">
        <div className="p-1 rounded w-50 border addform">
          <form onSubmit={handleSubmit}>
            <center>
              <h2>Add Student</h2>
              <br />
            </center>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <center>
                <button type="submit" id="enrollNowButton" className="btn btn-success">
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

export default AddStudent;
