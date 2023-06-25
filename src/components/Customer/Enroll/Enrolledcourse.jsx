import React, { useEffect,useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
function Enrolledcourse() {
  const [data,setData]=useState([])
  useEffect(()=>{
      axios.get('http://localhost:8081/enrolledcourse')
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
                    to="/enrolledcourse"
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
        
        <div className="template_ContainerEnroll">
          {data.length > 0 ? (
            data.map((val) => {
              const joinedDate = new Date(val.date).toLocaleDateString("en-GB");
              const courseEndDate = new Date(val.endDate).toLocaleDateString("en-GB");
              return (
                <div className="template1" key={val.id} id="enrolledCourse">
                  <h4>Course name : {val.coursename}  </h4>
                  <h4>Joined date : {joinedDate}  </h4>
                  <h4>Course end date : 25/12/2023  </h4>
                  <button id="enrolledCourse" class="enrolledCourse" type="button">My learning</button>
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

export default Enrolledcourse;
