using AutoMapper;
using DataAPI.DataAccess.EFModels;
using DataAPI.DataAccess.Interfaces;
using DataAPI.Enums;
using DataAPI.Schemas;
using Consumption = DataAPI.Dbo.Consumption;
using House = DataAPI.Dbo.House;
using User = DataAPI.Dbo.User;

namespace DataAPI.DataAccess;

public class UserRepository : Repository<EFModels.User, Dbo.User>, IUserRepository
{
    public UserRepository(EcoSyncContext context, ILogger<UserRepository> logger, IMapper mapper) : base(context, logger, mapper)
    {
    }

    public Dbo.User? GetByEmail(string email)
    {
        var result = _context.Users.FirstOrDefault(x => x.Email == email);
        return _mapper.Map<Dbo.User>(result);
    }

    public User? GetById(long id)
    {
        var result = _context.Users.FirstOrDefault(x => x.Id == id);
        return _mapper.Map<Dbo.User>(result);
    }

    public async Task<User> CreateNewUser(RegisterUserSchema user)
    {
        var newUser = _mapper.Map<Dbo.User>(user);
        newUser.House = new House { HouseArea = 0, HouseType = HouseType.House, Inhabitants = 1, LinkyNumber = "" };
        newUser.Consumption = new Consumption();
        return await Insert(newUser);
    }
}