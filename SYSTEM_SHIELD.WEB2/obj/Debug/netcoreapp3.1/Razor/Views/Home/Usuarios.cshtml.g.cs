#pragma checksum "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "68a7190c0cf6cca1c97e456c3cd6702a329d6b1b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Usuarios), @"mvc.1.0.view", @"/Views/Home/Usuarios.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\_ViewImports.cshtml"
using SYSTEM_SHIELD.WEB2;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\_ViewImports.cshtml"
using SYSTEM_SHIELD.WEB2.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"68a7190c0cf6cca1c97e456c3cd6702a329d6b1b", @"/Views/Home/Usuarios.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c137865556675954b41b54f8b510a356dfd9b83a", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Usuarios : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
  
    ViewData["Title"] = "Usuarios";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">\r\n\r\n<div class=\"container\" style=\"display:inline-flex; margin: 20px 1px 1px 20px;\">\r\n");
#nullable restore
#line 10 "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
     for (int i = 0; i < 5; i++)
    {
         var nameperfil = "perfil"+i.ToString()+".jpg";

#line default
#line hidden
#nullable disable
            WriteLiteral("         <div class=\"row\">\r\n");
#nullable restore
#line 14 "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
              for (int o = 0; o < 1; o++)
             {                

#line default
#line hidden
#nullable disable
            WriteLiteral("                 <div class=\"w3-card-4\" style=\"width: 100%; margin: 1px 36px 10px 1px;cursor:pointer\">\r\n                     <img");
            BeginWriteAttribute("src", " src=\"", 581, "\"", 613, 2);
            WriteAttributeValue("", 587, "/images/perfil/", 587, 15, true);
#nullable restore
#line 17 "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
WriteAttributeValue("", 602, nameperfil, 602, 11, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" alt=\"Alps\" style=\"width:100%\">\r\n                     <div class=\"w3-container w3-center\">\r\n                         <p>ATIBAIA / VIOL TIPO ");
#nullable restore
#line 19 "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
                                           Write(i.ToString());

#line default
#line hidden
#nullable disable
            WriteLiteral("</p>\r\n                     </div>\r\n                 </div>\r\n");
#nullable restore
#line 22 "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
             }

#line default
#line hidden
#nullable disable
            WriteLiteral("            \r\n         </div>\r\n");
#nullable restore
#line 25 "C:\Users\paulo\source\repos\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
     
    }

#line default
#line hidden
#nullable disable
            WriteLiteral("</div>\r\n\r\n");
            WriteLiteral("\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
