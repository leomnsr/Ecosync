using AutoMapper;
using DataAPI.DataAccess.EFModels;
using DataAPI.DataAccess.Interfaces;
using Consumption = DataAPI.Dbo.Consumption;

namespace DataAPI.DataAccess;

public class ConsumptionRepository : Repository<EFModels.Consumption, Dbo.Consumption>, IConsumptionRepository
{
    public ConsumptionRepository(EcoSyncContext context, ILogger<ConsumptionRepository> logger, IMapper mapper) : base(context, logger, mapper)
    {
    }

    public Consumption? GetConsumptionByUserId(long userId)
    {
        var consumption = _context.Consumptions.FirstOrDefault(c => c.UserId == userId);
        return _mapper.Map<Consumption>(consumption);
    }
}