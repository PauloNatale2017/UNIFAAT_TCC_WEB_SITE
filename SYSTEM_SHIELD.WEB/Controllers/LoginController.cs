

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;



using SYSTEM_SHIELD.DATAACCESSLAYER.DataContext;
using SYSTEM_SHIELD.REPOSITORY.Entities;

namespace SYSTEM_SHIELD.WEB.Controllers
{

    [Route("api/login")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly AplicationDbContext _db;
        public LoginController(AplicationDbContext db)
        {
            _db = db;
        }

        public class UserLogin
        {
            public string User { get; set; }
            public string Password { get; set; }

        }

        [Route("loginUsers")]
        [HttpPost]
        public async Task<string> GetLoginUsers(UserLogin request)
        {
            try
            {
                var returns = _db.Login.Where(d=>d.EmailUser == request.User && d.Password == request.Password).SingleOrDefault();
                return "A";
            }
            catch (Exception ex)
            {
                var erro = ex;
                return "";
            }

        }


    }
}