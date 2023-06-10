import React, { useEffect,useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import "./Adminacademy.css";
function Adminacademy() {
  const [data,setData]=useState([])
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
      axios.get('http://localhost:8081/getdetails')
      .then(res=>{
        if(res.data.Status==="Success"){
          console.log(res.data.Result)
          setData(res.data.Result);
        }else(
          alert("Error")
        )
      })
      .catch(err=>console.log(err));
  },[])

  const handleSearch = (event) => {
    event.preventDefault();
    // Filter the data based on the search query
    const filteredData = data.filter(item =>
      item.academyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
  };
  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
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
                <a className="logout" id='logout'>Logout</a>    
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
          <button className="btn btn-success w-10" type="submit" onClick={handleSearch}>Search</button>
        </div>
        <div className="template_Container">
          {data.length > 0 ? (
            data.map((val) => {
              return (
                <div className="template" key={val.id} id="AcademyGrid">
                  <img src={val.imageUrl} alt="" />
                  <h3>{val.academyName}  </h3>
                  <p className="place">Place: {val.academyLocation} </p>
                  <button onClick={e => handleDelete(val.id)} id="deleteAcademy" class="deleteButton" type="button">Delete</button>
                  <Link to='/editacademy' id="editAcademy" class="editButton" type="button">Edit</Link>
                </div>
              );
            })
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
      <center>
      <Link to='/addacademy' type='button' id='addacademybutton' className="btn btn-success w-10">
      ⊕Add Academy
      </Link>
      </center>
    </>
  );
}

export default Adminacademy;
