using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace MvcMovie.Models {

    public static class SeedData {
        public static void Initialize(IServiceProvider serviceProvider) {
            //What in the fucking hell is this garbage?
            //If it wasn't so colorful in my editor, I'd be angry
            using (var context = new MvcMovieContext(serviceProvider.GetRequiredService<DbContextOptions<MvcMovieContext>>())) {
                if (context.Movie.Any()) return;

                context.Movie.AddRange(
                    new Movie {
                        Title = "When Harry Met Sally",
                        ReleaseDate = DateTime.Parse("1989-1-11"),
                        Genre = "Romatic Comedy",
                        Price = 7.99M,
                        Rating = "R"
                    },
                    new Movie {
                        Title = "Ghostbusters ",
                        ReleaseDate = DateTime.Parse("1984-3-13"),
                        Genre = "Comedy",
                        Price = 8.99M,
                        Rating = "PG-13"
                    },
                    new Movie {
                        Title = "Ghostbusters 2",
                        ReleaseDate = DateTime.Parse("1986-2-23"),
                        Genre = "Comedy",
                        Price = 9.99M,
                        Rating = "PG-13"
                    },
                    new Movie {
                        Title = "Rio Bravo",
                        ReleaseDate = DateTime.Parse("1959-4-15"),
                        Genre = "Western",
                        Price = 3.99M,
                        Rating = "PG"
                    }
                );

                context.SaveChanges();
            }
        }
    }

}