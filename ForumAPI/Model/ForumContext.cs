using Microsoft.EntityFrameworkCore;

namespace ForumAPI.Model
{
    public class ForumContext : DbContext
    {
        public DbSet<PostModel> Posts { get; set; }
        public DbSet<AccountModel> Accounts { get; set; }

        public string DbPath { get; set; }

        public ForumContext()
        {
            DbPath = "Forum.db";
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source={DbPath}");
        }
    }
}
