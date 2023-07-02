import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate ,useParams} from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom'
function Editcourse(){
    const [values, setValues] = useState({
		coursename: '',
		courseduration: '',
		coursetimings: '',
		numberofstudents: '',
		coursedescription: ''
	})

    const navigate = useNavigate();
    const {id} = useParams();
	const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }
	// const handleInput = event => {
	// 	const { name, value } = event.target;
	// 	setValues(prev => ({ ...prev, [name]: value }));
	//   };
  useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedAdmin');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  }, []);
    // useEffect(()=> {
	// 	axios.get('http://localhost:8081/getcourse/'+id)
	// 	.then(res => {
	// 		setValues({...values, coursename: res.data.Result[0].coursename,
	// 			courseduration: res.data.Result[0].courseduration,
	// 			coursetimings: res.data.Result[0].coursetimings,
	// 			numberofstudents: res.data.Result[0].numberofstudents,
    //             coursedescription:res.data.Result[0].coursedescription
	// 		})
	// 	})
	// 	.catch(err =>console.log(err));
	// }, [id,values])

	useEffect(() => {
		axios
		  .get('http://localhost:8081/getcourse/' + id)
		  .then(res => {
			const {
			  coursename,
			  courseduration,
			  coursetimings,
			  numberofstudents,
			  coursedescription,
			} = res.data.Result[0];
	
			setValues({
				coursename,
				courseduration,
				coursetimings,
				numberofstudents,
				coursedescription,
			});
		  })
		  .catch(err => console.log(err));
	  }, [id]);

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:8081/updatecourse/'+id, values)
		.then(res => {
			if(res.data.Status === "Success") {
				navigate('/admincourse')
			}
		})
		.catch(err => console.log(err));
	}
	function HandleLogout(){
        navigate('/login');
        localStorage.removeItem('authenticatedUser');
        localStorage.removeItem('authenticatedAdmin');
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
                <a className="logout" id='logout' onClick={HandleLogout}>Logout</a>    
              </Link>
            </div>                
          </div>
          <Outlet />
        </nav>
         <div className='d-flex justify-content-center align-items-center vh-100 addpage'>
            <div className='p-1 rounded w-25 border addform'>
			<form onSubmit={handleSubmit}>
			<div className="mb-3">
					<input type="text" value = {values.coursename} className="form-control" id="editCourseName" name="coursename" placeholder='Enter the course name' autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="text" value = {values.courseduration} className="form-control" id="editCourseDuration" name='courseduration' placeholder='Enter the course duration' autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="text" value = {values.coursetimings} className="form-control" id="editCourseTiming" name='coursetimings' placeholder="Enter the course Timing" autoComplete='off'
					required onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="text" value = {values.numberofstudents} className="form-control" id="editCourseEnrolled" name='numberofstudents' placeholder="Enter number of students enrolled for the course" autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
                    <textarea value = {values.coursedescription} className="form-control" id="editCourseDescription" name='coursedescription' rows="3" placeholder="Enter the course description" autoComplete="off"
                    onChange={handleInput}></textarea>
				</div>
				<div className="mb-3">
					<button type="submit" id='updateCourse' className="btn btn-success w-10">Update course</button>
				</div>
			</form>

            </div>
        </div>
        </div>
    )
}
export default Editcourse;