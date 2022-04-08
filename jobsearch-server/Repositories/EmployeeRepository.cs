using JobSearch.DTOs;
using JobSearch.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace JobSearch.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly List<Employee> employees;
        public EmployeeRepository()
        {
            string json = File.ReadAllText("10000.json");
            employees = JsonConvert.DeserializeObject<List<Employee>>(json);
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            return employees.Take(100);
        }

        public IEnumerable<Employee> GetByJobTitle(string jobTitle)
        {
            return employees.FindAll(e => e.JobTitle.ToLower().Contains(jobTitle.ToLower()));
        }

        public IEnumerable<Employee> GetByCountry(string country)
        {
            return employees.FindAll(e => e.Country.ToLower() == country.ToLower());
        }

        public IEnumerable<Employee> GetByLanguage(string language)
        {
            return employees.FindAll(e => e.Language.ToLower() == language.ToLower());
        }

        public void AddEmployee(EmployeeDTO employee)
        {
            Employee _employee = new()
            {
                ID = employees.Max(e => e.ID) + 1,
                FullName = employee.FullName,
                JobTitle = employee.JobTitle,
                Country = employee.Country,
                EmailAddress = employee.EmailAddress,
                PhoneNumber = employee.PhoneNumber,
                JobSkill = employee.JobSkill,
                Language = employee.Language
            };
            employees.Add(_employee);
            string json = JsonConvert.SerializeObject(employees);
            File.WriteAllText("10000.json", json);
        }

    }
}
