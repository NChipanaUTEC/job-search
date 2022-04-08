using JobSearch.DTOs;
using JobSearch.Entities;
using System.Collections.Generic;

namespace JobSearch.Repositories
{
    public interface IEmployeeRepository
    {
        void AddEmployee(EmployeeDTO employee);
        IEnumerable<Employee> GetAllEmployees();
        IEnumerable<Employee> GetByCountry(string country);
        IEnumerable<Employee> GetByJobTitle(string jobTitle);
        IEnumerable<Employee> GetByLanguage(string language);
    }
}