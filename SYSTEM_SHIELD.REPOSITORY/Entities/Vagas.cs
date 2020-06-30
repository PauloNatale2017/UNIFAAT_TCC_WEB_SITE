using System;
using System.Collections.Generic;
using System.Text;

namespace SYSTEM_SHIELD.REPOSITORY.Entities
{
    public class Vagas : BaseEntity
    {
        public string NomeVaga { get; set; }
        public string ValorSalario { get; set; }
        public string Descricao { get; set; }
        public string InformacoeAdicionais { get; set; }
        public string AvisosDaEmpresa { get; set; }
        public string EmailDeContato { get; set; }
        public string Restricoes { get; set; }
        public int IdEmpresa { get; set; }

    }
}
