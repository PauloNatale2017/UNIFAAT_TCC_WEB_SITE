using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SYSTEM_SHIELD.REPOSITORY.Entities
{
    public class Perfil : BaseEntity
    {
        [JsonProperty("NomePerfil")]
        public string NomePerfil { get; set; }

        [JsonProperty("IdSistema")]
        public string IdSistema { get; set; }

        [JsonProperty("AccessPerfil")]
        public string AccessPerfil { get; set; }

        [JsonProperty("ActionsPerfil")]
        public string ActionsPerfil { get; set; }

        [JsonProperty("Id")]
        public string Id { get; set; }

        [JsonProperty("CreateDate")]
        public string CreateDate { get; set; }

        [JsonProperty("UpdateDate")]
        public string UpdateDate { get; set; }

    }
}
