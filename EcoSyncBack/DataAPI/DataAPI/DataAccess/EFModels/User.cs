using System.ComponentModel.DataAnnotations.Schema;

namespace DataAPI.DataAccess.EFModels;

[Table("users")]
public class User
{
    [Column("id")]
    public long Id { get; set; }
    
    [Column("username")]
    public string UserName { get; set; }
    
    [Column("email")]
    public string Email { get; set; }
    
    [Column("password")]
    public string Password { get; set; }
    
    public House House { get; set; }
    
    public Consumption Consumption { get; set; }
}