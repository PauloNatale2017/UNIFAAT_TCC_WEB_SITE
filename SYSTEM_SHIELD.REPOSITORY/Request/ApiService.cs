﻿using Refit;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SYSTEM_SHIELD.REPOSITORY.Entities;

namespace SYSTEM_SHIELD.REPOSITORY.Request
{
    public class ApiService : IApiService
    {
        public async Task<List<Perfil>> GetPerfil(string IdUsuario)
        {
            var retornoApi = new List<Perfil>();

            try
            {
                var retornoPerfil = RestService.For<IApiService>("http://localhost:5001/api/external/");
                retornoApi = await retornoPerfil.GetPerfil(IdUsuario);
          
            }
            catch(Exception ex)
            {
                throw ex;
            }

            return retornoApi;

        }
    }
}
