using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace SYSTEM_SHIELD.REPOSITORY.ModuloEnvios
{
    public class SendEmail
    {
        public bool EnvioDeEmails (string de,string para)
        {

            string subject = "MATER DEY CADASTRO DE VAGAS";
            string body = @"<div style='background-color:red;height:100px;width:250px'>teste</div>";

            //var client = new SmtpClient("smtp.gmail.com", 587){
            //    Credentials = new NetworkCredential("paulo000natale@gmail.com", "P@ulo82929262"),
            //    EnableSsl = true                
            //};
            //client.Send("paulo000natale@gmail.com", "paulo000natale@gmail.com", subject = " teste subject", body = "teste body");

            try
            {
                //Instância classe email
                MailMessage mail = new MailMessage();
                mail.To.Add(de == "" ? "paulo000natale@gmail.com" : de);
                mail.From = new MailAddress(para == "" ? "paulo000natale@gmail.com" : para);
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
