using ForumAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ForumAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IConfiguration _config;
        public AccountController(IConfiguration config)
        {
            _config = config;
        }

        // registerar en ny användare
        [HttpPost]
        public IActionResult Register([FromBody] RegisterModel value)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ForumContext())
                {
                    if (db.Accounts.FirstOrDefault(x => x.Username == value.Username) != null)
                        return BadRequest("Username already exists.");
                    else
                    {
                        db.Accounts.Add(new AccountModel()
                        {
                            Username = value.Username,
                            Password = value.Password
                        });
                        db.SaveChanges();
                        return Ok();
                    }
                }
            }
            else return BadRequest();
        }

        // loggar in en användare och genererar en token till densamme
        [HttpPost("Login")]
        public IActionResult Login(AccountModel model)
        {
            using (var db = new ForumContext())
            {
                var user = db.Accounts.FirstOrDefault(x => x.Username.ToLower() == model.Username.ToLower() &&
                                                      x.Password.ToLower() == model.Password.ToLower());
                if (user != null)
                {
                    var token = GenerateToken(user);
                    return Ok(token);
                }
                else
                    return NotFound("User not found.");
            }
        }

        // tokengenerator
        private string GenerateToken(AccountModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {   
                //lägger till ett username som claimant i tokenen
                new Claim(ClaimTypes.NameIdentifier, user.Username)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                                             _config["Jwt:Audience"],
                                             claims,
                                             expires: DateTime.Now.AddMinutes(15),
                                             signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //[HttpGet]
        //public IActionResult IsAlreadySigned()
        //{
        //    using (var db = new ForumContext())
        //    {
        //        if (db.Accounts.FirstOrDefault(x => x.Username == "abs") != null)
        //            return BadRequest("Username already exists.");
        //    }

        //    return NotFound();
        //}

                            // hämtar ett användarnamn
        [HttpGet("Profile")]
        [Authorize]
        public IActionResult Profile()
        {
            var user = GetUser();
            //if (user != null)
            //{
            //    using (var db = new ForumContext())
            //    {
            //        var posts = db.Posts.Where(x => x.Account.Username == user.Username).ToList();
            //    }
            //}

            return Ok(user);
        }

        // DARK WIZARDRY resultatet är att vi får ut ett username till frontenden
        private AccountModel GetUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;
                var userName = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                return new AccountModel
                {
                    Username = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value
                };
            }

            return null;

        }
    }
}
