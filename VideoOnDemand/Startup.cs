using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VideoOnDemand.Data;
using VideoOnDemand.Models;
using VideoOnDemand.Services;
using VideoOnDemand.Repositories;
using VideoOnDemand.Entities;
using VideoOnDemand.Models.DTOModels;

namespace VideoOnDemand
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
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Add application services.
            services.AddTransient<IEmailSender, EmailSender>();

            services.AddMvc();
            services.AddSingleton<IReadRepository, SqlReadRepository>();
            var config = new AutoMapper.MapperConfiguration(cfg =>{
                cfg.CreateMap<Video, VideoDTO>();
                cfg.CreateMap<Download, DownloadDTO>()
                    .ForMember(
                        dest => dest.DownloadUrl,
                        src => src.MapFrom(s => s.Url)
                    )
                    .ForMember(
                        dest => dest.DownloadTitle,
                        src => src.MapFrom(s => s.Title)
                    );
                cfg.CreateMap<Instructor, InstructorDTO>()
                    .ForMember(dest => dest.InstructorAvatar, src => src.MapFrom(s => s.Thumbnail))
                    .ForMember(dest => dest.InstructorDescription, src => src.MapFrom(s => s.Description))
                    .ForMember(dest => dest.InstructorName, src => src.MapFrom(s => s.Name));
                cfg.CreateMap<Course, CourseDTO>()
                    .ForMember(dest => dest.CourseId, src => src.MapFrom(s => s.Id))
                    .ForMember(dest => dest.CourseDescription, src => src.MapFrom(s => s.Description))
                    .ForMember(dest => dest.CourseImageUrl, src => src.MapFrom(s => s.ImageUrl))
                    .ForMember(dest => dest.CourseTitle, src => src.MapFrom(s => s.Title));
                cfg.CreateMap<Module, ModuleDTO>()
                    .ForMember(dest => dest.ModuleTitle, src => src.MapFrom(s => s.Title));
            });
            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ApplicationDbContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            DbInitializer.Initialize(dbContext);
        }
    }
}
