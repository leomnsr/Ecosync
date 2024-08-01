using Microsoft.EntityFrameworkCore;
using DataAPI.DataAccess.EFModels;

namespace DataAPI.DataAccess.EFModels;

public class EcoSyncContext : DbContext
{
    public EcoSyncContext(DbContextOptions<EcoSyncContext> options)
        : base(options)
    {
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var name = Environment.GetEnvironmentVariable("POSTGRES_DB");
        var host = Environment.GetEnvironmentVariable("POSTGRES_HOST");
        var port = Environment.GetEnvironmentVariable("POSTGRES_PORT");
        var user = Environment.GetEnvironmentVariable("POSTGRES_USER");
        var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");

        optionsBuilder.UseNpgsql($"Host={host};Port={port};Database={name};Username={user};Password={password}");
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>().Property(u => u.Id).ValueGeneratedOnAdd();
    }

    public virtual DbSet<User> Users { get; set; } = null!;
    
    public virtual DbSet<House> Houses { get; set; } = null!;
    
    public virtual DbSet<Consumption> Consumptions { get; set; } = null!;
    public virtual DbSet<RefreshToken> RefreshTokens { get; set; } = null!;

public DbSet<DataAPI.DataAccess.EFModels.House> House { get; set; } = default!;
}