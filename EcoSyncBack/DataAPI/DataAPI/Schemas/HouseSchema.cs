using DataAPI.Enums;

namespace DataAPI.Schemas;

public class HouseSchema
{
    public long? UserId { get; set; }
    public int? HouseArea { get; set; }
    public HouseType? HouseType { get; set; }
    public int? Inhabitants { get; set; }
    public string? LinkyNumber { get; set; }
}