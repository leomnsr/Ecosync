using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using DataAPI.DataAccess.EFModels;
using DataAPI.DataAccess.Interfaces;
using DataAPI.Schemas;
using DataAPI.Utils.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RefreshToken = DataAPI.Dbo.RefreshToken;

namespace DataAPI.Controllers
{
    [Route("api/data/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly ITokens _tokens;
        
        // Inject IUserRepository via constructor
        public AuthController(IUserRepository userRepository, IRefreshTokenRepository refreshTokenRepository, ITokens tokens)
        {
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
            _tokens = tokens;
        }

        private string HashPassword(string password)
        {
            using SHA256 sha256Hash = SHA256.Create();
            // Convert the input string to a byte array and compute the hash.
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Convert byte array to a string
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            password = builder.ToString();

            return password;
        }
        
        /// <summary>
        /// Authenticates a user and generates a JWT token and a refresh token.
        /// </summary>
        /// <param name="user">The user to authenticate, containing the email and password.</param>
        /// <returns>A JWT token and a refresh token if the authentication is successful; otherwise, an Unauthorized status code.</returns>
        /// <response code="200">Returns a JWT token and a refresh token if the authentication is successful.</response>
        /// <response code="401">Returns an Unauthorized status code if the authentication is unsuccessful.</response>
        [HttpPost("login")]
        [ProducesResponseType(200, Type = typeof(Tokens))]
        [ProducesResponseType(401, Type = typeof(MessageSchema))]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Login(LoginUserSchema user)
        {
            var registeredUser = _userRepository.GetByEmail(user.Email);
            if (registeredUser == null || HashPassword(user.Password) != registeredUser.Password)
            {
                return Unauthorized(new MessageSchema { message = "Invalid email or password." });
            }

            var token = _tokens.GenerateJwtToken(registeredUser);
            string refreshToken = _tokens.GenerateRefreshToken();

            await _refreshTokenRepository.Delete(registeredUser.Id);
            
            await _refreshTokenRepository.Insert(new RefreshToken
            {
                Id = registeredUser.Id,
                refresh_token = refreshToken
            });
            
            return Ok(new Tokens{ jwt = token, refreshToken = refreshToken }); 
        }

        /// <summary>
        /// Logs out the user
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Returns an OK status code if the user is successfully logged out.</response>
        /// <response code="401">Returns an Unauthorized status code if the user is not authorized.</response>
         [HttpPost("logout")]
         [ProducesResponseType(200)]
         [ProducesResponseType(401, Type = typeof(MessageSchema))]
         [ProducesDefaultResponseType]
         [Authorize]
         public async Task<IActionResult> Logout()
         {
             var idClaim = _tokens.GetUserIdFromRequest(Request);

             if (idClaim < 0)
             {
                 return StatusCode(422, "Unable to parse the header");
             }
             
             await _refreshTokenRepository.Delete(idClaim);
             return Ok();
         }

        /// <summary>
        /// Regiser a new user
        /// </summary>
        /// <param name="user">The user to create containing the first name, last name, email and password</param>
        /// <returns>A confirmation that the user has been created</returns>
        /// <response code="201">Returns a confirmation that the user has been created</response>
        /// <response code="400">Returns a Bad Request status code if the user is missing any fields or one of them is invalid</response>
        /// <response code="409">Returns a Conflict status code if the email already exists</response>
        [HttpPost("register")]
        [ProducesResponseType(201, Type = typeof(MessageSchema))]
        [ProducesResponseType(400, Type = typeof(MessageSchema))]
        [ProducesResponseType(409, Type = typeof(MessageSchema))]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Register(RegisterUserSchema user)
        {
            // check empty fields
            if (user.Email.Trim() == "" || user.Password.Trim() == "" || user.UserName.Trim() == "")
            {
                return BadRequest(new MessageSchema {message = "All fields are required."});
            }
            
            // check for valid email
            if (!Regex.IsMatch(user.Email, @"^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$"))
            {
                return BadRequest(new MessageSchema {message = "Invalid email address."});
            }
            
            // check if email already exists
            var existingUser = _userRepository.GetByEmail(user.Email);
            if (existingUser != null)
            {
                return Conflict(new MessageSchema {message = "Email already exists."});
            }
            
            user.Password = HashPassword(user.Password);
            var createdUser = await _userRepository.CreateNewUser(user);
            
            if (createdUser == null)
            {
                return BadRequest("Error occurred while registering the user.");
            }
            
            return Created("", new MessageSchema {message = "User registered successfully."});
        }
        
        /// <summary>
        /// Generates a new JWT token and refresh token
        /// </summary>
        /// <param name="tokens">The expired jwt and the corresponding refresh token</param>
        /// <returns>A new jwr and refresh token</returns>
        /// <response code="200">Returns a new JWT token and refresh token</response>
        /// <response code="400">Returns a Bad Request status code if the jwt or refresh token is invalid</response>
        [HttpPost("refresh")]
        [ProducesResponseType(200, Type = typeof(Tokens))]
        [ProducesResponseType(400, Type = typeof(MessageSchema))]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Refresh(Tokens tokens)
        {
            var principal = _tokens.GetPrincipalFromExpiredToken(tokens.jwt);
            var idToSTring = principal.Identity?.Name;
            
            try
            {
               
                long id = Int32.Parse(idToSTring!);
                var savedRefreshToken = _refreshTokenRepository.GetSavedRefreshTokenByIdAndRefreshToken(id, tokens.refreshToken);
                
                if (savedRefreshToken.refresh_token != tokens.refreshToken)
                {
                    return Unauthorized( new MessageSchema { message = "Invalid Refresh Token"});
                }

                var user = _userRepository.GetById(id);
                var newJwtToken = _tokens.GenerateJwtToken(user!);
                var newRefreshToken = _tokens.GenerateRefreshToken();

                await _refreshTokenRepository.Update(new RefreshToken
                {
                    refresh_token = newRefreshToken,
                    Id = id
                }, id);

                return Ok(new Tokens { jwt = newJwtToken, refreshToken = newRefreshToken });
            }
            
            catch (FormatException)
            {
                return BadRequest(new MessageSchema { message = "Invalid Refresh Token"});
            }
        }
       
    }
}
