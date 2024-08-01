using DataAPI.DataAccess.EFModels;

namespace DataAPI.DataAccess.Interfaces;

public interface IRefreshTokenRepository : IRepository<EFModels.RefreshToken, Dbo.RefreshToken>
{
    public Dbo.RefreshToken GetSavedRefreshTokenByIdAndRefreshToken(long id, string refreshToken);
    public Dbo.RefreshToken GetSavedRefreshTokenById(long id);
}