import React, { useEffect,useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import "../Adminacademy.css";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
function Adminstudent() {
    const [originalData, setOriginalData] = useState([]);
    const [data, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=>{
      axios.get('http://localhost:8081/getstudents')
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
    const handleSearch = (event) => {
        event.preventDefault();
        const filteredResults = originalData.filter((item) =>
          item.id.toString().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filteredResults);
      };
  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/deletestudents/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }
  function HandleLogout(){
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
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
      </div>
      <br></br><br></br>
      <div className="template_Container">
  <div className="row justify-content-center mb-3">
    <div className="col-lg-8 col-md-10 col-sm-12">
      <div className="input-group">
        <input
          id="searchStudent"
          type="text"
          className="form-control"
          placeholder="Type here student ID to search"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <button className="btn btn-success" type="submit" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  </div>
        <br></br>
  {data.length > 0 ? (
    <center>
    <table className="gridTable">
      <thead>
        <tr>
          <th>Student Id</th>
          <th>Student name</th>
          <th>Enrolled Course</th>
          <th>Mobile number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((val) => (
          <tr key={val.id}>
            <td>{val.id} </td>
            <td>{val.firstName} </td>
            <td>{val.coursename}</td>
            <td>{val.phoneNumber1}</td>
            <td>
              <Link to={`/editstudent/${val.id}`} id="adminEditStudent"><FaEdit/></Link>
              <button id= "adminDeleteStudent" onClick={() => handleDelete(val.id)}><FaTrash/></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </center>
  ) : (
    <p>No results found.</p>
  )}
</div>
<br></br>
      <center>
      <Link to='/addstudent' type='button' id='addStudent' className="btn btn-success w-10">
      ⊕Add Student
      </Link>
      </center>
    </>
  );
}

export default Adminstudent;
