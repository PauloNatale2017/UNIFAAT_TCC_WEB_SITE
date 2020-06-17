using Refit;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SYSTEM_SHIELD.REPOSITORY.Entities;

namespace SYSTEM_SHIELD.REPOSITORY.Request
{
    public interface IApiService
    {
        [Get("/externalgerperfill/{IdUsuario}")]
        Task<List<Perfil>> GetPerfil(string IdUsuario);
    }
}
