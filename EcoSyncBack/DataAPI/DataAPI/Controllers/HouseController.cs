using AutoMapper;
using DataAPI.DataAccess.Interfaces;
using Microsoft.AspNetCore.Mvc;
using DataAPI.Utils.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace DataAPI.Controllers
{
    [Route("api/data/[controller]")]
    [ApiController]
    public class HouseController : ControllerBase
    {
        private readonly ITokens _tokens;
        private readonly IHouseRepository _houseRepository;
        private readonly IMapper _mapper;
        public HouseController(ITokens tokens, IHouseRepository houseRepository, IMapper mapper)
        {
            _tokens = tokens;
            _houseRepository = houseRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Authorize]
        public IActionResult GetHouse()
        {
            var userId = _tokens.GetUserIdFromRequest(Request);
            if (userId < 0)
            {
                return StatusCode(422, "Unable to parse the header");
            }
            
            var house = _houseRepository.GetHouseByUserId(userId);
            if (house == null)
            {
                return StatusCode(404, "House not found");
            }
            
            return Ok(_mapper.Map<Schemas.HouseSchema>(house));
        }
        
        [HttpPatch]
        [Authorize]
        public async Task<IActionResult> UpdateHouse(Schemas.HouseSchema house)
        {
            var userId = _tokens.GetUserIdFromRequest(Request);
            if (userId < 0)
            {
                return StatusCode(422, "Unable to parse the header");
            }
            
            var existingHouse = _houseRepository.GetHouseByUserId(userId);
            if (existingHouse == null)
            {
                return StatusCode(404, "House not found");
            }
            
            existingHouse.HouseArea = house.HouseArea ?? existingHouse.HouseArea;
            existingHouse.HouseType = house.HouseType ?? existingHouse.HouseType;
            existingHouse.Inhabitants = house.Inhabitants ?? existingHouse.Inhabitants;
            existingHouse.LinkyNumber = house.LinkyNumber ?? existingHouse.LinkyNumber;
            
            await _houseRepository.Update(existingHouse, userId);
            
            return NoContent();
        }
    }
}
