namespace DataAPI.Dbo;

public class RefreshToken : IObjectWithId
{
    public string refresh_token { get; set; }
    public long Id { get; set; }
}                   