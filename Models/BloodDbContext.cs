using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodDonation.Models
{
    public class BloodDbContext : DbContext
    {
        public BloodDbContext(DbContextOptions<BloodDbContext> options) : base(options)
        {

        }
        public DbSet<BloodGroup> BloodGroups { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<BloodRequest> BloodRequests { get; set; }
        public DbSet<DonateBlood> DonateBloods { get; set; }
        public DbSet<BloodStock> BloodStocks { get; set; }
    }
}
