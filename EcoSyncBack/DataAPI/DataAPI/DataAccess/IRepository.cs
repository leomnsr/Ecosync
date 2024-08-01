namespace DataAPI.DataAccess;

public interface IRepository<DBEntity, ModelEntity>
{
    Task<IEnumerable<ModelEntity>> Get(string includeTables = "");
    Task<ModelEntity> Insert(ModelEntity entity);
    Task<ModelEntity> Update(ModelEntity entity, long idEntity);
    Task<bool> Delete(long idEntity);
}
