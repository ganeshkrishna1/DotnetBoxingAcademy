import React, { useEffect,useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import "../Adminacademy.css";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Admincourse() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=>{
      axios.get('http://localhost:8080/api/Admin/getcourse')
      .then(res=>{
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
		const isAuthenticated = localStorage.getItem('authenticatedAdmin');
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
      item.coursename.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
  };
  const handleDelete = (id) => {
    axios.delete('http://localhost:8080/api/admin/deletecourse/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <div className='body'>
        <div><br/></div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
          <div className="container-fluid">
            <a className="navbar-brand">Boxing academy</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link to="/academy" className="nav-link active" id='adminAcademy' aria-current="page">Academy</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Admincourse" className="nav-link" id='adminCourse'>Course</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Adminstudents" className="nav-link" id='adminStudents'>Students</Link>
                </li>
              </ul>
              <Link to="/login">
                <a className="logout" id='logout' onClick={HandleLogout}>Logout</a>    
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
            id="searchCourse"
            type="text"
            placeholder="Type here to search Course"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />
          <button className="btn btn-success w-10" type="submit" onClick={handleSearch}>Search</button>
        </div>
        <div className="template_Container">
          {data.length > 0 ? (
            data.map((val) => {
              return (
                <div className="template1" key={val.id} id="CourseGrid">
                  <h4>Course name : {val.coursename}  </h4>
                  <h4>Course Duration : {val.courseduration}  </h4>
                  <h4>Course Available timings : {val.coursetimings}  </h4>
                  <h4>Number of students : {val.numberofstudents}  </h4>
                  <h4>Course Description : {val.coursedescription}  </h4>

                  <button onClick={e => handleDelete(val.id)} id="deleteCourse" class="deleteCourse" type="button"><FaTrash/></button>
                  <Link to={`/editcourse/`+val.id} id="editCourse" class="editCourse" type="button"><FaEdit/></Link>
                </div>
              );
            })
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
      <center>
      <Link to='/addcourse' type='button' id='addCourse' className="btn btn-success w-10">
      ⊕Add Course
      </Link>
      </center>
    </>
  );
}

export default Admincourse;
