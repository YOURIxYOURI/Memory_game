using MemoryGame_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace MemoryGame_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        private readonly AppDbContext _context;
        public IConfiguration _configuration { get; }
        public ScoreController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Score>>> GetScores()
        {
            return await _context.Scores.Include(a => a.User).ToListAsync();
        }
        [HttpPost("{points},{moves},{userid}")]
        public async Task<ActionResult> CreateScore(int points, int moves, int userid)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userid);
            if (user == null || string.IsNullOrEmpty(moves.ToString()) || string.IsNullOrEmpty(points.ToString()))
            {
                return BadRequest(string.Empty); ;
            }
            var sc = new Score { Moves = moves, Points = points, User = user };
            _context.Scores.Add(sc);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteScore(int id)
        {
            if (string.IsNullOrEmpty(id.ToString()))
            {
                return BadRequest(string.Empty);
            }
            else
            {
                var sc = await _context.Scores.FindAsync(id);
                if (sc == null)
                {
                    return NotFound();
                }
                _context.Scores.Remove(sc);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
