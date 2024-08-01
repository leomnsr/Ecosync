using System.ComponentModel.DataAnnotations.Schema;

namespace DataAPI.DataAccess.EFModels;

[Table("refresh_tokens")]
public class RefreshToken
{
    [Column("id")]
    public long Id { get; set; }
    
    [Column("refresh_token")]
    public string refresh_token { get; set; }
}