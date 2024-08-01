namespace DataAPI.Schemas;

public class ConsumptionSchema
{
    public long? UserId { get; set; }
    public double? Electricity { get; set; }
    public double? Water { get; set; }
    public double? CityGas { get; set; }
    public double? PropaneGas { get; set; }
    public double? BottleGas { get; set; }
    public double? BottleQuantity { get; set; }
}