import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import "../Viewacademy.css";
import { useNavigate } from "react-router-dom";

function Viewacademy() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Admin/getdetails")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setOriginalData(res.data.Result);
          setFilteredData(res.data.Result); // Initialize filteredData with original data
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);
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

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredResults = originalData.filter((item) =>
      item.academyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <>
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
                  <Link
                    to="/Viewacademy"
                    className="nav-link active"
                    id="adminAcademy"
                    aria-current="page"
                  >
                    Academy
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Enrolledcourse"
                    className="nav-link"
                    id="adminCourse"
                  >
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
        <div></div>
      </div>
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input
            id="searchInput"
            type="text"
            placeholder="Type here to search Academy"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />
          <button
            className="btn btn-success w-10"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="template_Container">
          {filteredData.length > 0 ? (
            filteredData.map((val) => {
              return (
                <div className="template" key={val.id}>
                <Link to={'/enrollcourse'}>
                     <img src={val.imageUrl} alt="" />
                </Link>     
                 <center><h3>{val.academyName}</h3></center><br></br>
                  <h4 className="place">Place: {val.academyLocation}   ⭐⭐⭐⭐⭐</h4>
                </div>
              );
            })
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Viewacademy;
