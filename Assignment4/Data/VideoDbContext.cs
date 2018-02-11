using Microsoft.EntityFrameworkCore;
using Assignment1.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Assignment1.Data {

    public class VideoDbContext : IdentityDbContext<User> {
        public DbSet<Video> Videos {get; set;}
        public VideoDbContext(DbContextOptions<VideoDbContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);
        }
    }

}