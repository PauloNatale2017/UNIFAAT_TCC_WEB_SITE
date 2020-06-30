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
        [Get("/externalgerperfill/{idusuario}")]
        Task<List<Perfil>> GetPerfil(string IdUsuario);

        [Get("/externalemailusuario/{idusuario}")]
        Task<List<VitimaBasic>> GetEmailUsuario(string IdUsuario);

        [Get("/externalvagasusuario/{idusuario}")]
        Task<List<Vagas>> GetVagasEmpresaUsuario(string IdUsuario);
    }
}
