using AutoMapper;
using DataAPI.DataAccess.EFModels;
using DataAPI.DataAccess.Interfaces;
using House = DataAPI.Dbo.House;

namespace DataAPI.DataAccess;

public class HouseRepository :  Repository<EFModels.House, Dbo.House>, IHouseRepository
{
    public HouseRepository(EcoSyncContext context, ILogger<HouseRepository> logger, IMapper mapper) : base(context, logger, mapper)
    {
    }

    public House? GetHouseByUserId(long userId)
    {
        var result = _context.Houses.FirstOrDefault(x => x.UserId == userId);
        return _mapper.Map<Dbo.House>(result);
    }
}