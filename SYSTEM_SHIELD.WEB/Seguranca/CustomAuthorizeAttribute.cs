using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SYSTEM_SHIELD.WEB.Seguranca
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute, IAsyncAuthorizationFilter
    {
        public enum Permissao
        {  
            Menu
        }
        public Permissao[] _permissoes;
        public async Task OnAuthorizationAsync(AuthorizationFilterContext authorizationFilterContext)
        {
            //How can I access the Controller instance here
            //Not just the controller name, I need the actual instance
        }

    }
}
