using Dotnet_Boxing_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Dotnet_Boxing_Academy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;

        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));
        }

        [HttpPost("addacademy")]
        public IActionResult Addacademy(AcademyModel academyModel)
        {
            try
            {
                string query = "INSERT INTO Academy (academyName, contactNumber, imageUrl, emailId,academyLocation, academyDescription) " +
                               "VALUES (@academyName, @contactNumber, @imageUrl, @emailId,@academyLocation, @academyDescription)";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@academyName", academyModel.academyName);
                    command.Parameters.AddWithValue("@contactNumber", academyModel.contactNumber);
                    command.Parameters.AddWithValue("@imageUrl", academyModel.imageUrl);
                    command.Parameters.AddWithValue("@emailId", academyModel.emailId);
                    command.Parameters.AddWithValue("@academyLocation", academyModel.academyLocation);
                    command.Parameters.AddWithValue("@academyDescription", academyModel.academyDescription);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                        return Ok("Added successfully");
                    else
                        return BadRequest("Failed to add ");
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
        [HttpGet("getdetails")]
        public IActionResult GetAcademyDetails()
        {
            try
            {
                string query = "SELECT * FROM Academy";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    _connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    List<AcademyModel> academies = new List<AcademyModel>();

                    while (reader.Read())
                    {
                        AcademyModel academy = new AcademyModel
                        {
                            id = reader.GetInt32(reader.GetOrdinal("id")),
                            academyName = reader.GetString(reader.GetOrdinal("academyName")),
                            contactNumber = reader.GetString(reader.GetOrdinal("contactNumber")),
                            imageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                            emailId = reader.GetString(reader.GetOrdinal("emailId")),
                            academyLocation = reader.GetString(reader.GetOrdinal("academyLocation")),
                            academyDescription = reader.GetString(reader.GetOrdinal("academyDescription")),                           
                        };

                        academies.Add(academy);
                    }

                    _connection.Close();
                    return Ok(new { Status = "Success", Result = academies });
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the service academydetails");
            }
        }
        
    [HttpDelete("deleteacademy/{id}")]
    public IActionResult DeleteAcademy(int id)
    {
        try
        {
            string query = "DELETE FROM Academy WHERE id = @Id";

            using (SqlCommand command = new SqlCommand(query, _connection))
          {
            command.Parameters.AddWithValue("@Id", id);
            _connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
            _connection.Close();

            if (rowsAffected > 0)
            {
                return Ok("Academy deleted successfully");
            }
            else
            {
                return NotFound("Academy not found");
            }
          }
        }
        catch (SqlException ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting ");
        }
       }
       [HttpPut("update/{id}")]
public IActionResult UpdateAcademy(int id, [FromBody] AcademyModel updatedData)
{
    try
    {
        string query = "UPDATE Academy SET academyName = @academyName, contactNumber = @contactNumber, " +
                       "imageUrl = @imageUrl, emailId = @emailId, " +
                       "academyLocation = @academyLocation, academyDescription = @academyDescription " +
                       "WHERE id = @id";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@academyName", updatedData.academyName);
            command.Parameters.AddWithValue("@contactNumber", updatedData.contactNumber);
            command.Parameters.AddWithValue("@imageUrl", updatedData.imageUrl);
            command.Parameters.AddWithValue("@emailId", updatedData.emailId);
            command.Parameters.AddWithValue("@academyLocation", updatedData.academyLocation);
            command.Parameters.AddWithValue("@academyDescription", updatedData.academyDescription);
            command.Parameters.AddWithValue("@id", id);

            _connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
            _connection.Close();

            if (rowsAffected > 0)
                return Ok("Academy updated successfully");
            else
                return NotFound("Academy not found");
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the academy details");
    }
}
[HttpGet("getdetails/{id}")]
public IActionResult GetAcademyDetails(int id)
{
    try
    {
        string query = "SELECT * FROM Academy WHERE id = @id";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@id", id);
            _connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            if (reader.Read())
            {
                AcademyModel academy = new AcademyModel
                {
                    academyName = reader.GetString(reader.GetOrdinal("academyName")),
                    contactNumber = reader.GetString(reader.GetOrdinal("contactNumber")),
                    imageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                    emailId = reader.GetString(reader.GetOrdinal("emailId")),
                    academyLocation = reader.GetString(reader.GetOrdinal("academyLocation")),
                    academyDescription = reader.GetString(reader.GetOrdinal("academyDescription"))
                };

                _connection.Close();
                return Ok(new { Status = "Success", Result = academy });
            }
            else
            {
                _connection.Close();
                return NotFound("Academy not found");
            }
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the academy details");
    }
}
        [HttpPost("addcourse")]
        public IActionResult Addcourse(CourseModel courseModel)
        {
            try
            {
                string query = "INSERT INTO course (coursename, courseduration, coursetimings, numberofstudents,coursedescription) " +
                               "VALUES (@coursename, @courseduration, @coursetimings, @numberofstudents,@coursedescription)";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@coursename", courseModel.coursename);
                    command.Parameters.AddWithValue("@courseduration", courseModel.courseduration);
                    command.Parameters.AddWithValue("@coursetimings", courseModel.coursetimings);
                    command.Parameters.AddWithValue("@numberofstudents", courseModel.numberofstudents);
                    command.Parameters.AddWithValue("@coursedescription", courseModel.coursedescription);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                        return Ok("Added successfully");
                    else
                        return BadRequest("Failed to add ");
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
        [HttpGet("getcourse")]
public IActionResult GetCourse()
{
    try
    {
        string query = "SELECT * FROM course";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            _connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<CourseModel> courses = new List<CourseModel>();

            while (reader.Read())
            {
                CourseModel course = new CourseModel
                {
                    id = reader.GetInt32(reader.GetOrdinal("id")),
                    coursename = reader.GetString(reader.GetOrdinal("coursename")),
                    courseduration = reader.GetString(reader.GetOrdinal("courseduration")),
                    coursetimings = reader.GetString(reader.GetOrdinal("coursetimings")),
                    numberofstudents = reader.GetString(reader.GetOrdinal("numberofstudents")),
                    coursedescription = reader.GetString(reader.GetOrdinal("coursedescription"))
                };

                courses.Add(course);
            }

            _connection.Close();
            return Ok(new { Status = "Success", Result = courses });
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the course details");
    }
}
[HttpPut("updatecourse/{id}")]
public IActionResult UpdateCourse(int id, [FromBody] CourseModel updatedData)
{
    try
    {
        string query = "UPDATE course SET coursename = @coursename, courseduration = @courseduration, " +
                       "coursetimings = @coursetimings, numberofstudents = @numberofstudents, " +
                       "coursedescription = @coursedescription WHERE id = @id";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@coursename", updatedData.coursename);
            command.Parameters.AddWithValue("@courseduration", updatedData.courseduration);
            command.Parameters.AddWithValue("@coursetimings", updatedData.coursetimings);
            command.Parameters.AddWithValue("@numberofstudents", updatedData.numberofstudents);
            command.Parameters.AddWithValue("@coursedescription", updatedData.coursedescription);
            command.Parameters.AddWithValue("@id", id);

            _connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
            _connection.Close();

            if (rowsAffected > 0)
                return Ok(new { Status = "Success" });
            else
                return NotFound("Course not found");
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the course details");
    }
}
[HttpGet("getcourse/{id}")]
public IActionResult GetCourseById(int id)
{
    try
    {
        string query = "SELECT * FROM course WHERE id = @id";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@id", id);

            _connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            if (reader.Read())
            {
                CourseModel course = new CourseModel
                {
                    id = reader.GetInt32(reader.GetOrdinal("id")),
                    coursename = reader.GetString(reader.GetOrdinal("coursename")),
                    courseduration = reader.GetString(reader.GetOrdinal("courseduration")),
                    coursetimings = reader.GetString(reader.GetOrdinal("coursetimings")),
                    numberofstudents = reader.GetString(reader.GetOrdinal("numberofstudents")),
                    coursedescription = reader.GetString(reader.GetOrdinal("coursedescription"))
                };

                _connection.Close();
                return Ok(new { Status = "Success", Result = course });
            }

            _connection.Close();
            return NotFound("Course not found");
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the course details");
    }
}
[HttpDelete("deletecourse/{id}")]
public IActionResult DeleteCourse(int id)
{
    try
    {
        string query = "DELETE FROM course WHERE id = @id";

    
            using (SqlCommand command = new SqlCommand(query, _connection))
            {
                _connection.Open();
                command.Parameters.AddWithValue("@id", id);

                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    return Ok(new { Status = "Success", Message = "Course deleted successfully" });
                }
                else
                {
                    return NotFound(new { Status = "Error", Message = "Course not found" });
                }
            }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the course");
    }
}
[HttpPost("addstudent")]
public IActionResult AddStudent(StudentModel studentModel)
{
    try
    {
        string query = "INSERT INTO student (coursename, firstName, lastName, gender, fatherName, phoneNumber1, phoneNumber2, motherName, emailId, age, houseNo, streetName, pincode, state, nationality) " +
                       "VALUES (@courseName, @firstName, @lastName, @gender, @fatherName, @phoneNumber1, @phoneNumber2, @motherName, @emailId, @age, @houseNo, @streetName, @pincode, @state, @nationality)";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@coursename", studentModel.coursename);
            command.Parameters.AddWithValue("@firstName", studentModel.firstName);
            command.Parameters.AddWithValue("@lastName", studentModel.lastName);
            command.Parameters.AddWithValue("@gender", studentModel.gender);
            command.Parameters.AddWithValue("@fatherName", studentModel.fatherName);
            command.Parameters.AddWithValue("@phoneNumber1", studentModel.phoneNumber1);
            command.Parameters.AddWithValue("@phoneNumber2", studentModel.phoneNumber2);
            command.Parameters.AddWithValue("@motherName", studentModel.motherName);
            command.Parameters.AddWithValue("@emailId", studentModel.emailId);
            command.Parameters.AddWithValue("@age", studentModel.age);
            command.Parameters.AddWithValue("@houseNo", studentModel.houseNo);
            command.Parameters.AddWithValue("@streetName", studentModel.streetName);
            command.Parameters.AddWithValue("@pincode", studentModel.pincode);
            command.Parameters.AddWithValue("@state", studentModel.state);
            command.Parameters.AddWithValue("@nationality", studentModel.nationality);

            _connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
            _connection.Close();

            if (rowsAffected > 0)
                return Ok("Added successfully");
            else
                return BadRequest("Failed to add student");
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, ex);
    }
}
[HttpGet("getstudent")]
public IActionResult GetStudent()
{
    try
    {
        List<StudentModel> students = new List<StudentModel>();
        string query = "SELECT * FROM student";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            _connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                StudentModel student = new StudentModel
                {
                    id = (int)reader["id"],
                    coursename = reader["coursename"].ToString(),
                    firstName = reader["firstName"].ToString(),
                    lastName = reader["lastName"].ToString(),
                    gender = reader["gender"].ToString(),
                    fatherName = reader["fatherName"].ToString(),
                    phoneNumber1 = reader["phoneNumber1"].ToString(),
                    phoneNumber2 = reader["phoneNumber2"].ToString(),
                    motherName = reader["motherName"].ToString(),
                    emailId = reader["emailId"].ToString(),
                    age = (int)reader["age"],
                    houseNo = reader["houseNo"].ToString(),
                    streetName = reader["streetName"].ToString(),
                    pincode = reader["pincode"].ToString(),
                    state = reader["state"].ToString(),
                    nationality = reader["nationality"].ToString()
                };

                students.Add(student);
            }

            _connection.Close();
                    return Ok(new { Status = "Success", Result = students});
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, ex);
    }
}
[HttpDelete("deletestudent/{id}")]
public IActionResult DeleteStudent(int id)
{
    try
    {
        // Perform the deletion operation based on the student ID
        string query = "DELETE FROM student WHERE id = @id";
        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@id", id);
            _connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
            _connection.Close();

            if (rowsAffected > 0)
            {
                return Ok(new { Status = "Success" });
            }
            else
            {
                return NotFound(new { Status = "Error", Message = "Student not found" });
            }
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, ex);
    }
}

         [HttpGet("getstudent/{id}")]
        public IActionResult GetStudentById(int id)
        {
            try
            {
                string query = "SELECT * FROM student WHERE id = @id";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    _connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        StudentModel student = new StudentModel
                        {
                            id = (int)reader["id"],
                            coursename = reader["coursename"].ToString(),
                            firstName = reader["firstName"].ToString(),
                            lastName = reader["lastName"].ToString(),
                            gender = reader["gender"].ToString(),
                            fatherName = reader["fatherName"].ToString(),
                            phoneNumber1 = reader["phoneNumber1"].ToString(),
                            phoneNumber2 = reader["phoneNumber2"].ToString(),
                            motherName = reader["motherName"].ToString(),
                            emailId = reader["emailId"].ToString(),
                            age = (int)reader["age"],
                            houseNo = reader["houseNo"].ToString(),
                            streetName = reader["streetName"].ToString(),
                            pincode = reader["pincode"].ToString(),
                            state = reader["state"].ToString(),
                            nationality = reader["nationality"].ToString()
                        };

                        _connection.Close();
                        return Ok(new { Status = "Success", Result = student });
                    }
                    else
                    {
                        _connection.Close();
                        return NotFound(new { Status = "Error", Message = "Student not found" });
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(500, new { Status = "Error", Message = ex.Message });
            }
        }
        [HttpPut("updatestudent/{id}")]
public IActionResult UpdateStudent(int id, [FromBody] StudentModel updatedStudent)
{
    try
    {
        string query = "UPDATE student SET coursename = @coursename, firstName = @firstName, lastName = @lastName, " +
                       "gender = @gender, fatherName = @fatherName, phoneNumber1 = @phoneNumber1, phoneNumber2 = @phoneNumber2, " +
                       "motherName = @motherName, emailId = @emailId, age = @age, houseNo = @houseNo, " +
                       "streetName = @streetName, pincode = @pincode, state = @state, nationality = @nationality " +
                       "WHERE id = @id";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@id", id);
            command.Parameters.AddWithValue("@coursename", updatedStudent.coursename);
            command.Parameters.AddWithValue("@firstName", updatedStudent.firstName);
            command.Parameters.AddWithValue("@lastName", updatedStudent.lastName);
            command.Parameters.AddWithValue("@gender", updatedStudent.gender);
            command.Parameters.AddWithValue("@fatherName", updatedStudent.fatherName);
            command.Parameters.AddWithValue("@phoneNumber1", updatedStudent.phoneNumber1);
            command.Parameters.AddWithValue("@phoneNumber2", updatedStudent.phoneNumber2);
            command.Parameters.AddWithValue("@motherName", updatedStudent.motherName);
            command.Parameters.AddWithValue("@emailId", updatedStudent.emailId);
            command.Parameters.AddWithValue("@age", updatedStudent.age);
            command.Parameters.AddWithValue("@houseNo", updatedStudent.houseNo);
            command.Parameters.AddWithValue("@streetName", updatedStudent.streetName);
            command.Parameters.AddWithValue("@pincode", updatedStudent.pincode);
            command.Parameters.AddWithValue("@state", updatedStudent.state);
            command.Parameters.AddWithValue("@nationality", updatedStudent.nationality);

            _connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
            _connection.Close();

            if (rowsAffected > 0)
            {
                return Ok(new { Status = "Success", Message = "Student updated successfully" });
            }
            else
            {
                return NotFound(new { Status = "Error", Message = "Student not found" });
            }
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(500, new { Status = "Error", Message = ex.Message });
    }
}

        
    }
}


