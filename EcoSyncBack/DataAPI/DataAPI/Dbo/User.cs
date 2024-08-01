namespace DataAPI.Dbo;

public class User : IObjectWithId
{
    public long Id { get; set; }
    
    public string UserName { get; set; }
    
    public string Email { get; set; }
    
    public string Password { get; set; }
    
    public House House { get; set; }
    
    public Consumption Consumption { get; set; }
}