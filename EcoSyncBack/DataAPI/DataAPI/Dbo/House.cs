using DataAPI.Enums;

namespace DataAPI.Dbo;

public class House
{
    public long UserId { get; set; }
    
    public int HouseArea { get; set; }
    
    public HouseType HouseType { get; set; }
    
    public int Inhabitants { get; set; }
    
    public string LinkyNumber { get; set; }
    
    public User User { get; set; }
}