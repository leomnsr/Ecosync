namespace DataAPI.DataAccess.Interfaces;

public interface IHouseRepository: IRepository<EFModels.House, Dbo.House>
{
    Dbo.House? GetHouseByUserId(long userId);
}