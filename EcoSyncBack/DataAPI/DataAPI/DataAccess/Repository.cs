using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace DataAPI.DataAccess;

    public class Repository<DBEntity, ModelEntity> : IRepository<DBEntity, ModelEntity>
      where DBEntity : class, new()
      where ModelEntity : class, new()

    {
        private DbSet<DBEntity> _set;
        protected EFModels.EcoSyncContext _context;
        protected ILogger _logger;
        protected readonly IMapper _mapper;
        public Repository(EFModels.EcoSyncContext context, ILogger logger, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _logger = logger;
            _set = _context.Set<DBEntity>();
        }


        public virtual async Task<IEnumerable<ModelEntity>> Get(string includeTables = "")
        {
            try
            {
                List<DBEntity> query = null;
                if (String.IsNullOrEmpty(includeTables))
                {
                    query = await _set.AsNoTracking().ToListAsync();
                }
                else
                {
                    query = await _set.Include(includeTables).AsNoTracking().ToListAsync();
                }

                return _mapper.Map<ModelEntity[]>(query);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public virtual async Task<ModelEntity> Insert(ModelEntity entity)
        {
            DBEntity dbEntity = _mapper.Map<DBEntity>(entity);
            _set.Add(dbEntity);
            try
            {
                await _context.SaveChangesAsync();
                ModelEntity newEntity = _mapper.Map<ModelEntity>(dbEntity);
                return newEntity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }

        }

        public virtual async Task<ModelEntity> Update(ModelEntity entity, long idEntity)
        {
            DBEntity dbEntity = _set.Find(idEntity);


            if (dbEntity == null)
            {
                return null;
            }
            _mapper.Map(entity, dbEntity);
            if (!_context.ChangeTracker.HasChanges())
            {
                return entity;
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return null;
            }
            return _mapper.Map<ModelEntity>(dbEntity);

        }

        public virtual async Task<bool> Delete(long idEntity)
        {
            DBEntity dbEntity = _set.Find(idEntity);
            
            if (dbEntity == null)
            {
                return false;
            }
            _set.Remove(dbEntity);
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }
    }
