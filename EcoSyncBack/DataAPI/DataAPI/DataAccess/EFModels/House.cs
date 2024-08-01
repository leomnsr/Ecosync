using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataAPI.Enums;
using Microsoft.EntityFrameworkCore;

namespace DataAPI.DataAccess.EFModels;

[Table("houses")]
public class House
{
    [Key, ForeignKey("User")]
    [Column("userid")]
    public long UserId { get; set; }
    
    [Column("housearea")]
    public int HouseArea { get; set; }
    
    [Column("housetype")]
    public HouseType HouseType { get; set; }
    
    [Column("inhabitants")]
    public int Inhabitants { get; set; }
    
    [Column("linkynumber")]
    public string LinkyNumber { get; set; }
    
    public User User { get; set; }
}