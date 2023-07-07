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


    }
}
