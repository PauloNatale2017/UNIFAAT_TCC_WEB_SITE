using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using SYSTEM_SHIELD.REPOSITORY.Entities;

namespace SYSTEM_SHIELD.REPOSITORY.ModuloEnvios
{
    public class SendEmail
    {
        public bool EnvioDeEmails (List<VitimaBasic> entity, List<Vagas> vagasdados,string de)
        {

            string subject = "MATER DEY CADASTRO DE USUARIO";

            string body = @"<div style='background-color: lightpink;height: 244px;width: 500px;text-align: center;font-size: large;font-weight: bold;color: white;font-family: initial;text-shadow: black 4px 7px 5px;'>CANDIDATO A VAGA " + vagasdados[0].NomeVaga + "<br>"
                           + "   <span> NOME CANDIDATO:" + entity[0].NomeCompleto + "</span>"
                           + "    <hr> "
                           + "    CONTATO:" + entity[0].Contato + "<br>"
                           + "    <br><span>CONTATO PARA RECADO:" + entity[0].ContatoRecado + "</span>"
                           + "    <br><span>PARA A VAGA DESCRIÇÃO:" + vagasdados[0].Descricao+ "</span><br>"
                           + "    <br><span>CADA UM FAZENDO A SUA PARTE..</span>"
                           + "   <br> <span>VIOLENCIA E CRIME NÃO ACEITE..</span>"
                           + "    <hr>"
                           + "    <br> <span>DISK DENUNCIA TELL (11) 1111-1111..</span>"
                           + "</div>";

            try
            {
                //Instância classe email
                MailMessage mail = new MailMessage();
                mail.To.Add("paulo000natale@gmail.com");
                mail.From = new MailAddress(vagasdados[0].EmailDeContato);
                mail.Subject = subject;
                string Body = body;
                mail.Body = Body;
                mail.IsBodyHtml = true;

                //Instância smtp do servidor, neste caso o gmail.
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = new System.Net.NetworkCredential
                ("paulo000natale", "P@ulo82929262");// Login e senha do e-mail.
                smtp.EnableSsl = true;
                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                throw ex;
            }            

            return true;

        }
    }
}
