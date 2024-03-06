using System.Collections.Generic;
using System.Reflection.Emit;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using MemoryGame_API.Models;

namespace MemoryGame_API
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration configuration)
        : base(options) { _configuration = configuration; }

        public IConfiguration _configuration { get; }
        public DbSet<User> Users { get; set; }
        public DbSet<Score> Scores { get; set; }
        public void ConfigureServices(IServiceCollection services, DbContextOptionsBuilder dbContextOptionsBuilder)
        {

            services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(_configuration.GetConnectionString("MySqlConnection"), ServerVersion.AutoDetect(_configuration.GetConnectionString("MySqlConnection"))));
            dbContextOptionsBuilder.UseLazyLoadingProxies();
        }
        public void OnModelCreating(ModelBuilder optionsbuilder)
        {
            base.OnModelCreating(optionsbuilder);
        }
    }
}
