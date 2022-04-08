namespace JobSearch.DTOs
{
    public record EmployeeDTO
    {
        public string FullName { get; init; }
        public string EmailAddress { get; init; }
        public string Country { get; init; }
        public string PhoneNumber { get; init; }
        public string Language { get; init; }
        public string JobTitle { get; init; }
        public string JobSkill { get; init; }
    }
}
