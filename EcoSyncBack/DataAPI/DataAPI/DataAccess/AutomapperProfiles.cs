using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace DataAPI.DataAccess;

public class AutomapperProfiles : Profile
{
    public AutomapperProfiles()
    {
        // EFModels <=> Dbo
        CreateMap<Dbo.User, EFModels.User>()
            .ForMember(dest => dest.House, opt => opt.MapFrom(src => src.House))
            .ForMember(dest => dest.Consumption, opt => opt.MapFrom(src => src.Consumption))
            .ReverseMap();
        CreateMap<Dbo.House, EFModels.House>()
            .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
            .ReverseMap();
        CreateMap<Dbo.Consumption, EFModels.Consumption>()
            .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
            .ReverseMap();
        
        CreateMap<Dbo.RefreshToken, EFModels.RefreshToken>().ReverseMap();
        
        // Schemas <=> Dbo
        CreateMap<Schemas.RegisterUserSchema, Dbo.User>().ReverseMap();
        CreateMap<Schemas.HouseSchema, Dbo.House>().ReverseMap();
        CreateMap<Schemas.ConsumptionSchema, Dbo.Consumption>().ReverseMap();
    }
}
