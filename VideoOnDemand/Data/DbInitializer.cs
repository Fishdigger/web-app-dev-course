using System.Collections.Generic;
using System.Linq;
using VideoOnDemand.Entities;

namespace VideoOnDemand.Data {

    public class DbInitializer {
        public static void Initialize(ApplicationDbContext context) {
            var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

            if (context.Instructors.Any()) return;
            var instructors = new List<Instructor> {
              new Instructor {
                  Name = "John Doe",
                  Description = description.Substring(20, 50),
                  Thumbnail = "/images/Ice-Age-Scrat-icon.png"
              },
              new Instructor {
                  Name = "Jane Doe",
                  Description = description.Substring(30, 40),
                  Thumbnail = "/images/Ice-Age-Scrat-icon.png"
              }
            };
            context.Instructors.AddRange(instructors);
            context.SaveChanges();

            var courses = new List<Course> {
                new Course {
                    InstructorId = 1,
                    Title = "Course 1",
                    Description = description,
                    ImageUrl = "/images/course-small.jpg",
                    MarqueeImageUrl = "/images/laptop.jpg"
                },
                new Course {
                    InstructorId = 2,
                    Title = "Course 2",
                    Description = description,
                    ImageUrl = "/images/course-small.jpg",
                    MarqueeImageUrl = "/images/laptop.jpg"
                },
                new Course {
                    InstructorId = 1,
                    Title = "Course 3",
                    Description = description,
                    ImageUrl = "/images/course-small.jpg",
                    MarqueeImageUrl = "/images/laptop.jpg"
                }
            };
            context.Courses.AddRange(courses);
            context.SaveChanges();

            var userCourses = new List<UserCourse> {
                new UserCourse {
                    UserId = "4ad684f8-bb70-4968-85f8-458aa7dc19a3",
                    CourseId = 1
                },
                new UserCourse {
                    UserId = "4ad684f8-bb70-4968-85f8-458aa7dc19a3",
                    CourseId = 3
                }
            };
            context.UserCourses.AddRange(userCourses);
            context.SaveChanges();

            var modules = new List<Entities.Module> {
                new Entities.Module {CourseId = 1, Title = "Module 1"},
                new Entities.Module {CourseId = 1, Title = "Module 2"},
                new Entities.Module {CourseId = 2, Title = "Module 3"}
            };
            context.Modules.AddRange(modules);
            context.SaveChanges();

            var videos = new List<Video> {
                new Video {
                    Id = 1,
                    ModuleId = 1,
                    CourseId = 1,
                    Position = 1,
                    Title = "Video 1 Title",
                    Description = description.Substring(10, 40),
                    Duration = 50,
                    Thumbnail = "/images/video1.jpg",
                    Url = "https://www.youtube.com/watch?v=BJFyzpBcaCY"
                },
                new Video {
                    Id = 2,
                    ModuleId = 1,
                    CourseId = 1,
                    Position = 2,
                    Title = "Video 2 Title",
                    Description = description.Substring(20, 40),
                    Duration = 45,
                    Thumbnail = "/images/video2.jpg",
                    Url = "https://youtube.com/watch?v=BJFyzpBcaCY"
                },
                new Video {
                    Id = 3,
                    ModuleId = 1,
                    CourseId = 1,
                    Position = 3,
                    Title = "Video 3 Title",
                    Description = description.Substring(30, 40),
                    Duration = 41,
                    Thumbnail = "/imgaes/video3.jpg",
                    Url = "https://www.youtube.com/watch?v=BJFyzpBcaCY"
                },
                new Video {
                    Id = 4,
                    ModuleId = 3,
                    CourseId = 2,
                    Position = 1,
                    Title = "Video 4 Title",
                    Description = description.Substring(40, 40),
                    Duration = 41,
                    Thumbnail = "/images/video4.jpg",
                    Url = "https://www.youtube.com/watch?v=BJFyzpBcaCY"
                },
                new Video {
                    Id = 5,
                    ModuleId = 2,
                    CourseId = 1,
                    Position = 1,
                    Title = "Video 5 TItle",
                    Description = description.Substring(10, 40),
                    Duration = 42,
                    Thumbnail = "/images/video5.jpg",
                    Url = "https://www.youtube.com/watch?v=BJFyzpBcaCY"
                }
            };
            context.Videos.AddRange(videos);
            context.SaveChanges();

            var downloads = new List<Download> {
                new Download {
                    ModuleId = 1,
                    CourseId = 1,
                    Title = "ADO.NET 1 (PDF)",
                    Url = "https://1drv.ms/b/s!AuD50aH0ExAwn4"
                },
                new Download {
                    ModuleId = 1,
                    CourseId = 1,
                    Title = "ADO.NET 2 (PDF)",
                    Url = "https://1drv.ms/b/s!AuD50aH0ExAwn4"
                },
                new Download {
                    ModuleId = 3,
                    CourseId = 2,
                    Title = "ADO.NET 1 (PDF)",
                    Url = "https://1drv.ms/b/s!AuD50aH0ExAwn4"
                }
            };
            context.Downloads.AddRange(downloads);
            context.SaveChanges();
        }
    }

}