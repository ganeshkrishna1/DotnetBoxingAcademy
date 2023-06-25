import React, { useEffect,useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
function Enrollcourse() {
  const [data,setData]=useState([])
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
      axios.get('http://localhost:8081/getcourses')
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
      item.coursename.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
  };


  return (
    <>
      <div className='body'>
        <div><br/></div>
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
                  <Link to={`/enrollform/`+val.id} id="editCourse" class="enrollCourse" type="button">Enroll course</Link>
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

export default Enrollcourse;
