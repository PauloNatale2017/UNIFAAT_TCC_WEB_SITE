using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SYSTEM_SHIELD.REPOSITORY.Entities
{
    public class Login : BaseEntity
    {
        [Required(ErrorMessage = "Usuario e obrigatorio.")]
        public string EmailUser { get; set; }
        [Required(ErrorMessage = "Senha obrigatoria.")]
        public string Password { get; set; }
    }
}
