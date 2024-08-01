using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAPI.DataAccess.EFModels;

[Table("consumptions")]
public class Consumption
{
    [Key, ForeignKey("User")]
    [Column("userid")]
    public long UserId { get; set; }
    
    [Column("electricity")]
    public double Electricity { get; set; }
    
    [Column("water")]
    public double Water { get; set; }
    
    [Column("citygas")]
    public double CityGas { get; set; }
    
    [Column("propanegas")]
    public double PropaneGas { get; set; }
    
    [Column("bottlegas")]
    public double BottleGas { get; set; }
    
    [Column("bottlequantity")]
    public double BottleQuantity { get; set; }
    
    public User User { get; set; }
}