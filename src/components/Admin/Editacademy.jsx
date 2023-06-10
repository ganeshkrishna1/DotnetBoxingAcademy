import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom'
function Editacademy() {
    const [values, setValues] = useState({
		academyName: '',
		contactNumber: '',
		imageUrl: '',
		emailId: '',
		academyLocation: '',
    academyDescription:''
	})

    const navigate = useNavigate();

	const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:8081/editacademy', values)
		.then(res => {
			navigate('/academy')
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
            <h2>Edit Academy</h2>
			<form onSubmit={handleSubmit}>
			<div className="mb-3">
					<input type="text" className="form-control" id="editAcademyName" name="academyName" placeholder='Enter Academy name' autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" id="editContactNumber" name='contactNumber' placeholder='Enter the Contact number' autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="url" className="form-control" id="editimageUrl" name='imageUrl' placeholder="Enter the academy Image Url" autoComplete='off'
				 onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="email" className="form-control" id="editEmailId" name='emailId' placeholder="Enter the academy email" autoComplete='off'
					onChange={handleInput}/>
				</div>
                <div className="mb-3">
					<input type="text" className="form-control" id="editAcademyLocation" name='academyLocation' placeholder='Enter Academy Location'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
                    <textarea className="form-control" id="editAcademyDescription" name='academyDescription' rows="3" placeholder="Enter Academy description" autoComplete="off"
                    onChange={handleInput}></textarea>
				</div>
				<div className="mb-3">
					<button type="submit" id='addButton' className="btn btn-success w-10">Update Academy</button>
				</div>
			</form>

            </div>
        </div>
        </div>
    )
}
export default Editacademy;