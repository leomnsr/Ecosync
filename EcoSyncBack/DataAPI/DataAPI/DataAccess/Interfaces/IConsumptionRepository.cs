namespace DataAPI.DataAccess.Interfaces;

public interface IConsumptionRepository : IRepository<EFModels.Consumption, Dbo.Consumption>
{
    Dbo.Consumption? GetConsumptionByUserId(long userId);
}