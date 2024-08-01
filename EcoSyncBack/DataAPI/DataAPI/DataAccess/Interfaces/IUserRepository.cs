using DataAPI.Schemas;

namespace DataAPI.DataAccess.Interfaces;

public interface IUserRepository : IRepository<EFModels.User, Dbo.User>
{
    Dbo.User? GetByEmail(string email);
    Dbo.User? GetById(long id);
    Task<Dbo.User> CreateNewUser(RegisterUserSchema user);
}