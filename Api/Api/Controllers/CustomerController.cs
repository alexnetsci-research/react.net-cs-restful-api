using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Api.Models;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase 
    { 
        private readonly IConfiguration _configuration; 

        public CustomerController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [EnableCors(origins: "http://localhost:3000/", headers: "*", methods: "*")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select id, first_name, last_name, email from dbo.Customers";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RestfulApiCon");
            SqlDataReader sqlReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    sqlReader = myCommand.ExecuteReader();
                    table.Load(sqlReader);

                    sqlReader.Close();
                    myCon.Close();
                }
            } 
            return new JsonResult(table); 
        } 

        [HttpPost] 
        public JsonResult Post(Customer customer)
        {
            string query = @"
                    insert into dbo.Customers values 
                    ( 
                        '" + customer.first_name + @"', 
                        '" + customer.last_name + @"',
                        '" + customer.email + @"'
                    )";
            DataTable table = new DataTable(); 
            string sqlDataSource = _configuration.GetConnectionString("RestfulApiCon");
            SqlDataReader sqlReader; 
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    sqlReader = myCommand.ExecuteReader();
                    table.Load(sqlReader);

                    sqlReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Customer customer)
        {
            string query = @"
                    update dbo.Customers set 
                    first_name = '" + customer.first_name + @"', 
                    last_name = '" + customer.last_name + @"',
                    email = '" + customer.email + @"' 
                    where id = " + customer.id + @"
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RestfulApiCon");
            SqlDataReader sqlReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    sqlReader = myCommand.ExecuteReader();
                    table.Load(sqlReader);

                    sqlReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Customers
                    where id = " + id + @"
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RestfulApiCon");
            SqlDataReader sqlReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    sqlReader = myCommand.ExecuteReader();
                    table.Load(sqlReader);

                    sqlReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    } 
} 
 