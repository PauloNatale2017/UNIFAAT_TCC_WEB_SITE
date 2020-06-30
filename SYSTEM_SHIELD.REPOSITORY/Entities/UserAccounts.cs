using System;
using System.Collections.Generic;
using System.Text;

namespace SYSTEM_SHIELD.REPOSITORY.Entities
{
    public class UserAccounts : BaseEntity
    {
        public int IdLogin { get; set; }
        
        public string NomeCompleto { get; set; }
        public string Idade { get; set; }
        public string Endereco { get; set; }
        public string Contato { get; set; }
        public string Cpf { get; set; }
        public string Cidade { get; set; }
        public Login UsuarioAccesso { get; set; }
    }
}
