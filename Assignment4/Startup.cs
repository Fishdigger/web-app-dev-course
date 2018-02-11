using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System.IO;
using Assignment1.Services;
using Microsoft.AspNetCore.Routing;
using Assignment1.Data;
using Microsoft.EntityFrameworkCore;
using Assignment1.Entities;
using Microsoft.AspNetCore.Identity;

namespace Assignment1
{
    public class Startup
    {
        public Startup (IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true);

            if (env.IsDevelopment()) builder.AddUserSecrets<Startup>();

            this.Configuration = builder.Build();
        }

        public IConfiguration Configuration {get; set;}

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddSingleton(provider => Configuration);
            services.AddSingleton<IMessageService, ConfigurationMessageService>();
            services.AddSingleton<IVideoDataService, SqlVideoDataService>();

            var conn = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<VideoDbContext>(options => options.UseSqlServer(conn));
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<VideoDbContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IMessageService msg)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseFileServer();

            app.UseIdentity();

            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}"
                );
            });

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync(msg.GetMessage());
            });
        }
    }
}
