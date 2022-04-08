using JobSearch.DTOs;
using JobSearch.Entities;
using JobSearch.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;

namespace JobSearch.Controllers
{
    [ApiController]
    [Route("employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository employeeRepository;

        public EmployeeController(IEmployeeRepository _employeeRepository)
        {
            employeeRepository = _employeeRepository;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return Ok(employeeRepository.GetAllEmployees());
        }

        [HttpGet("job/{job_title}")]
        public IActionResult GetEmployeesByJobTitle(string job_title)
        {
            return Ok(employeeRepository.GetByJobTitle(job_title));
        }

        [HttpGet("country/{country}")]
        public IActionResult GetEmployeesByCountry(string country)
        {
            return Ok(employeeRepository.GetByCountry(country));
        }

        [HttpGet("language/{language}")]
        public IActionResult GetEmployeesByLanguage(string language)
        {
            return Ok(employeeRepository.GetByLanguage(language));
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] EmployeeDTO employee)
        {
            employeeRepository.AddEmployee(employee);

            return CreatedAtAction("GetAllEmployees", employee);
        }

    }
}
