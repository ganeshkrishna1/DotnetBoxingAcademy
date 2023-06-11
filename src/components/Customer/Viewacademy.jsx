import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import "./Viewacademy.css";

function Viewacademy() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/getdetails")
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
                <a className="logout" id="logout">
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
                  <img src={val.imageUrl} alt="" />
                  <h3>{val.academyName}</h3>
                  <p className="place">Place: {val.academyLocation}</p>
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
