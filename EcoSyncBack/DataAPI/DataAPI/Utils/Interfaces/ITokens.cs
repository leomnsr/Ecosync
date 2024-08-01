using System.Security.Claims;

namespace DataAPI.Utils.Interfaces;

public interface ITokens
{
    public string GenerateJwtToken(Dbo.User user);
    public string GenerateRefreshToken();
    public ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    public int GetUserIdFromRequest(HttpRequest request);
}