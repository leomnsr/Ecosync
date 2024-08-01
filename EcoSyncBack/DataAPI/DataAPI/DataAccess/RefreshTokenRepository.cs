using AutoMapper;
using DataAPI.DataAccess.EFModels;
using DataAPI.DataAccess.Interfaces;
using RefreshToken = DataAPI.Dbo.RefreshToken;

namespace DataAPI.DataAccess;

public class RefreshTokenRepository : Repository<EFModels.RefreshToken, Dbo.RefreshToken>, IRefreshTokenRepository
{
    public RefreshTokenRepository(EcoSyncContext context, ILogger<RefreshTokenRepository> logger, IMapper mapper) : base(context, logger, mapper)
    {
        
    }


    public RefreshToken GetSavedRefreshTokenByIdAndRefreshToken(long id, string refreshToken)
    {
        var result = _context.RefreshTokens.FirstOrDefault(x => x.Id == id && x.refresh_token == refreshToken);
        return _mapper.Map<Dbo.RefreshToken>(result);
    }

    public RefreshToken GetSavedRefreshTokenById(long id)
    {
        var result = _context.RefreshTokens.FirstOrDefault(x => x.Id == id);
        return _mapper.Map<RefreshToken>(result);
    }
}