using AutoMapper;
using DataAPI.DataAccess.Interfaces;
using DataAPI.Utils.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DataAPI.Controllers
{
    [Route("api/data/[controller]")]
    [ApiController]
    public class ConsumptionController : ControllerBase
    {
        private readonly ITokens _tokens;
        private readonly IConsumptionRepository _consumptionRepository;
        private readonly IMapper _mapper;
        public ConsumptionController(ITokens tokens, IConsumptionRepository consumptionRepository, IMapper mapper)
        {
            _tokens = tokens;
            _consumptionRepository = consumptionRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Authorize]
        public IActionResult GetConsumption()
        {
            var userId = _tokens.GetUserIdFromRequest(Request);
            if (userId < 0)
            {
                return StatusCode(422, "Unable to parse the header");
            }
            
            var consumption = _consumptionRepository.GetConsumptionByUserId(userId);
            if (consumption == null)
            {
                return StatusCode(404, "Consumption not found");
            }
            
            return Ok(_mapper.Map<Schemas.ConsumptionSchema>(consumption));
        }
        
        [HttpPatch]
        [Authorize]
        public async Task<IActionResult> UpdateConsumption(Schemas.ConsumptionSchema consumption)
        {
            var userId = _tokens.GetUserIdFromRequest(Request);
            if (userId < 0)
            {
                StatusCode(422, "Unable to parse the header");
            }
            
            var existingConsumption = _consumptionRepository.GetConsumptionByUserId(userId);
            if (existingConsumption == null)
            {
                return StatusCode(404, "Consumption not found");
            }
            
            existingConsumption.Electricity = consumption.Electricity ?? existingConsumption.Electricity;
            existingConsumption.Water = consumption.Water ?? existingConsumption.Water;
            existingConsumption.CityGas = consumption.CityGas ?? existingConsumption.CityGas;
            existingConsumption.PropaneGas = consumption.PropaneGas ?? existingConsumption.PropaneGas;
            existingConsumption.BottleGas = consumption.BottleGas ?? existingConsumption.BottleGas;
            existingConsumption.BottleQuantity = consumption.BottleQuantity ?? existingConsumption.BottleQuantity;
            
            await _consumptionRepository.Update(existingConsumption, userId);
            return NoContent();
        }
    }
}
