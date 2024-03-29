using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SYSTEM_SHIELD.REPOSITORY.ModuloEnvios;
using SYSTEM_SHIELD.REPOSITORY.Request;

namespace SYSTEM_SHIELD.WEB2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
             services.AddCors(options => {
                 options.AddPolicy("AllowAnyOrigin", builder => builder
                 .AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader());
             });

            services.AddAuthentication().AddGoogle(optionsGoogle => {
                 IConfigurationSection googleAuthNSection = Configuration.GetSection("Authentication:Google");
                 optionsGoogle.ClientId = "362174138108-civl5uco5beooo9fvl561roqj00f34eo.apps.googleusercontent.com";
                 optionsGoogle.ClientSecret = "NtWqvy19YHGnsHrwzg-luRrW";
             });

            services.AddAuthentication("CookieAuth").AddCookie("CookieAuth", Config =>
            {
                Config.Cookie.Name = "Access.Cookie";
                Config.LoginPath = "/Home/LoginUsuarios";
            });

            //.AddGoogle(optionsGoogle => {

            //    IConfigurationSection googleAuthNSection = Configuration.GetSection("Authentication:Google");

            //    optionsGoogle.ClientId = "362174138108-civl5uco5beooo9fvl561roqj00f34eo.apps.googleusercontent.com";
            //    optionsGoogle.ClientSecret = "NtWqvy19YHGnsHrwzg-luRrW";                
            //});

            services.AddTransient<IApiService, ApiService>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors();

            //who are you?
            app.UseAuthentication();

            //are you allowed?
            app.UseAuthorization();
           
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute(); ;
                //endpoints.MapControllerRoute(
                //    name: "default",
                //    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }


    }
}
