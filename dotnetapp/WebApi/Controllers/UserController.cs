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
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));
        }

       [HttpPost("enrollcourse")]
public IActionResult Enrollcourse(StudentModel studentModel)
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


    }
}
