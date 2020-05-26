using System;
using System.Collections.Generic;
using System.Text;

namespace SYSTEM_SHIELD.REPOSITORY.ModuloEnvios
{
    public interface ISendEmail
    {
        bool EnvioDeEmails(string de, string para);
    }
}
