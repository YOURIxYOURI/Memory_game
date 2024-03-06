using MemoryGame_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryGame_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public IConfiguration _configuration { get; }
        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpGet("{name},{pass}")]
        public async Task<ActionResult<User>> LoginUser(string name, string pass)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(pass))
            {
                return BadRequest(string.Empty);
            }
            else
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Name == name);
                if (user == null)
                {
                    return BadRequest("hasło lub email nie poprawne");
                }
                if (user.Password != pass)
                {
                    return BadRequest("hasło lub email nie poprawne");
                }
                return user;
            }
        }

        [HttpPost("{name},{confpass},{pass}")]
        public async Task<ActionResult<User>> CreateUser(string name, string confpass, string pass)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(confpass) || string.IsNullOrEmpty(pass))
            {
                return BadRequest(string.Empty);
            }
            else
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Name == name);
                if (user == null)
                {
                    if (confpass == pass)
                    {
                        _context.Users.Add(new User { Name = name, Password = pass });
                        _context.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("sprawdź poprawność hasła");
                    }

                }
                else
                {
                    return BadRequest("taki użytkownik już istnieje");
                }
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
