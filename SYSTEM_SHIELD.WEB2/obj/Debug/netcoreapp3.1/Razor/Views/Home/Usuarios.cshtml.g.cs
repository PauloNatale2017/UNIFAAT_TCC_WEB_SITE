#pragma checksum "C:\Users\paulo\OneDrive\Área de Trabalho\REPOSITOR_TCC\WEB_S\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ce3be2e7f71730de3d6643cc63bbce52984538e6"
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
#line 1 "C:\Users\paulo\OneDrive\Área de Trabalho\REPOSITOR_TCC\WEB_S\SYSTEM_SHIELD.WEB2\Views\_ViewImports.cshtml"
using SYSTEM_SHIELD.WEB2;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\paulo\OneDrive\Área de Trabalho\REPOSITOR_TCC\WEB_S\SYSTEM_SHIELD.WEB2\Views\_ViewImports.cshtml"
using SYSTEM_SHIELD.WEB2.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ce3be2e7f71730de3d6643cc63bbce52984538e6", @"/Views/Home/Usuarios.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c137865556675954b41b54f8b510a356dfd9b83a", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Usuarios : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "C:\Users\paulo\OneDrive\Área de Trabalho\REPOSITOR_TCC\WEB_S\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
  
    ViewData["Title"] = "Usuarios";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">\r\n\r\n<div class=\"container\" style=\"display:inline-flex; margin: 20px 1px 1px 20px;\">\r\n");
#nullable restore
#line 10 "C:\Users\paulo\OneDrive\Área de Trabalho\REPOSITOR_TCC\WEB_S\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
     for (int i = 0; i < 5; i++)
    {
        var nameperfil = "perfil" + i.ToString() + ".jpg";

#line default
#line hidden
#nullable disable
            WriteLiteral("        <div class=\"row\">\r\n");
#nullable restore
#line 14 "C:\Users\paulo\OneDrive\Área de Trabalho\REPOSITOR_TCC\WEB_S\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
             for (int o = 0; o < 5; o++)
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <div class=\"w3-card-4\" style=\"width: 100%; margin: 1px 36px 10px 1px;cursor:pointer\" data-toggle=\"modal\" data-target=\"#myModal\">\r\n                    <img");
            BeginWriteAttribute("src", " src=\"", 606, "\"", 638, 2);
            WriteAttributeValue("", 612, "/images/perfil/", 612, 15, true);
#nullable restore
#line 17 "C:\Users\paulo\OneDrive\Área de Trabalho\REPOSITOR_TCC\WEB_S\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
WriteAttributeValue("", 627, nameperfil, 627, 11, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" alt=\"Alps\" style=\"width:100%\">\r\n                    <div class=\"w3-container w3-center\">\r\n                        <p>ATIBAIA</p>\r\n                    </div>\r\n                </div>\r\n");
#nullable restore
#line 22 "C:\Users\paulo\OneDrive\Área de Trabalho\REPOSITOR_TCC\WEB_S\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"
            }

#line default
#line hidden
#nullable disable
            WriteLiteral("        </div>\r\n");
#nullable restore
#line 24 "C:\Users\paulo\OneDrive\Área de Trabalho\REPOSITOR_TCC\WEB_S\SYSTEM_SHIELD.WEB2\Views\Home\Usuarios.cshtml"

    }

#line default
#line hidden
#nullable disable
            WriteLiteral(@"</div>


<!-- The Modal -->
<div class=""modal fade"" id=""myModal"">
    <div class=""modal-dialog modal-xl"">
        <div class=""modal-content"">

            <!-- Modal Header -->
            <div class=""modal-header"">
                <h4 class=""modal-title"">DADOS PESSOAIS</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"">&times;</button>
            </div>

            <!-- Modal body -->
            <div class=""modal-body"">
               DADOS CONTIDOS EM BANCO DE DADOS
            </div>

            <!-- Modal footer -->
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-secondary"" data-dismiss=""modal"">FECHAR</button>
            </div>

        </div>
    </div>
</div>

");
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
