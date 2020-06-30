using System;
using System.Collections.Generic;
using System.Text;

namespace SYSTEM_SHIELD.REPOSITORY.Entities
{
    public class VitimaBasic : BaseEntity
    {

        public string NomeCompleto { get; set; }
       
        public string Rg_CPF { get; set; }
        public string Endereco { get; set; }
        public string Contato { get; set; }
        
        public string Email { get; set; }
       
        public string RedeSocial { get; set; }
        public string ContatoRecado { get; set; }
        public bool Ativo { get; set; }
    }
}
