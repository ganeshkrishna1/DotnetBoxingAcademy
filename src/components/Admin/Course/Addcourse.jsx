import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom'
function Addcourse(){
    const [values, setValues] = useState({
		coursename: '',
		courseduration: '',
		coursetimings: '',
		numberofstudents: '',
		coursedescription: ''
	})

    const navigate = useNavigate();

	const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('http://localhost:8081/addcourse', values)
		.then(res => {
			navigate('/admincourse')
		})
		.catch(err => console.log(err));
    }

    return(
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
         <div className='d-flex justify-content-center align-items-center vh-100 addpage'>
            <div className='p-1 rounded w-25 border addform'>
			<form onSubmit={handleSubmit}>
        <div>
          <h2>Add Course</h2><br></br>
        </div>
			<div className="mb-3">
					<input type="text" className="form-control" id="courseName" name="coursename" placeholder='Enter the course name' autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" id="courseDuration" name='courseduration' placeholder='Enter the course duration' autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" id="courseTiming" name='coursetimings' placeholder="Enter the course Timing" autoComplete='off'
					required onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" id="courseEnrolled" name='numberofstudents' placeholder="Enter number of students enrolled for the course" autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
                    <textarea className="form-control" id="courseDescription" name='coursedescription' rows="3" placeholder="Enter the course description" autoComplete="off"
                    onChange={handleInput}></textarea>
				</div>
				<div className="mb-3">
					<button type="submit" id='addCourse' className="btn btn-success w-10">Add course</button>
				</div>
			</form>

            </div>
        </div>
        </div>
    )
}
export default Addcourse;