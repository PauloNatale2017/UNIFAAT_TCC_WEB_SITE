using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SYSTEM_SHIELD.REPOSITORY.ModuloEnvios;
using SYSTEM_SHIELD.REPOSITORY.Request;
using SYSTEM_SHIELD.WEB2.Models;

namespace SYSTEM_SHIELD.WEB2.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        //[Authorize]
        public IActionResult Index()
        {           
            return View();
        }
        
        public IActionResult Usuarios()
        {
            return View();
        }

        public IActionResult LoginUsuarios()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        
        [Authorize]
        public IActionResult Secret()
        {
            return View();
        }

        public IActionResult Authenticate()
        {
            var grandmaClaims = new List<Claim>(){
                new Claim(ClaimTypes.Name,"Paulo"),
                new Claim(ClaimTypes.Email,"paulo000natale@gmail.com"),
                new Claim("Grandma.Says","Very nice boy.")
            };

            var licenseClaim = new List<Claim>(){
                 new Claim(ClaimTypes.Name,"Paulo"),
                 new Claim("DrivingLicense","A+")
            };

            var grandmaIdentity = new ClaimsIdentity(grandmaClaims, "Grandma Identity");
            var licenseIdentity = new ClaimsIdentity(licenseClaim, "Governament");

            var userPrincipal = new ClaimsPrincipal(new[] { grandmaIdentity, licenseIdentity });

            HttpContext.SignInAsync(userPrincipal);

            return RedirectToAction("Index");
        }
        
        #region METODOS DO LAYOUT


        public IActionResult Relatorios()
        {
            return View();
        }


        public IActionResult Chat()
        {
            return View();
        }


        public IActionResult Automacao()
        {
            return View();
        }


        public IActionResult Parceiros()
        {
            return View();
        }


        public IActionResult Vagas()
        {
            return View();
        }

        [HttpPost]
        public void Vagas(string From,string Para)
        {
            SendEmail email = new SendEmail();
            email.EnvioDeEmails(From, Para);
        }


        public IActionResult Ocorrencias()
        {
            return View();
        }


        public IActionResult Alertas()
        {
            return View();
        }


        #endregion

        public class request
        {
            public string VagaId { get; set; }
            public string UsuarioId { get; set; }
            public string Email { get; set; }
        }

        [HttpPost]
        [EnableCors("AllowOrigin")]
        public async Task<bool> EnviarEmail(string Email,string IdUsuario,string VagaId)
        {

            //RequestApis request = new RequestApis();
            //var usuarios =  request.RequestApiUsers();

            SendEmail envio = new SendEmail();
            var retornoEnvio =  envio.EnvioDeEmails(Email, Email);

            return true;
        }


    }
}
