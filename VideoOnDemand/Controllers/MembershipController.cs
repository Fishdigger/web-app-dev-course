using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using VideoOnDemand.Models;
using VideoOnDemand.Repositories;
using System.Collections.Generic;
using VideoOnDemand.Models.DTOModels;
using VideoOnDemand.Models.MembershipViewModels;
using System.Linq;

namespace VideoOnDemand.Controllers {

    public class MembershipController : Controller {
        private string userId;
        private IMapper mapper;
        private IReadRepository repo;

        public MembershipController(
            IHttpContextAccessor httpContextAccessor, 
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            IReadRepository repo) {
            var user = httpContextAccessor.HttpContext.User;
            userId = userManager.GetUserId(user);
            this.mapper = mapper;
            this.repo = repo;
        }

        [HttpGet]
        public IActionResult Dashboard() {
            var courses = mapper.Map<List<CourseDTO>>(repo.GetCourses(userId));
            var vm = new DashboardViewModel();
            vm.Courses = new List<List<CourseDTO>>();
            var numRows = courses.Count <= 3 ? 1 : courses.Count / 3;
            for (int i = 0; i < numRows; i++){
                vm.Courses.Add(courses.Take(3).ToList());
            }
            return View(vm);
        }

        [HttpGet]
        public IActionResult Course(int id) {
            var course = repo.GetCourse(id, userId);
            var courseDTOs = mapper.Map<CourseDTO>(course);
            var instructorDTO = mapper.Map<InstructorDTO>(course.Instructor);
            var moduleDTOs = mapper.Map<List<ModuleDTO>>(course.Modules);
            for (int i = 0; i < moduleDTOs.Count; i++) {
                moduleDTOs[i].Downloads = course.Modules[i].Downloads.Count == 0 ? 
                    null : mapper.Map<List<DownloadDTO>>(course.Modules[i].Downloads);
                moduleDTOs[i].Videos = course.Modules[i].Videos.Count == 0 ?
                    null : mapper.Map<List<VideoDTO>>(course.Modules[i].Videos);
            }
            var courseModel = new CourseViewModel {
                Course = courseDTOs,
                Instructor = instructorDTO,
                Modules = moduleDTOs
            };
            return View(courseModel);
        }

        [HttpGet]
        public IActionResult Video(int id) {
            var video = repo.GetVideo(userId, id);
            var course = repo.GetCourse(video.CourseId, userId);
            var videoDTO = mapper.Map<VideoDTO>(video);
            var courseDTO = mapper.Map<CourseDTO>(course);
            var instructorDTO = mapper.Map<InstructorDTO>(course.Instructor);
            var videos = repo.GetVideos(userId, video.ModuleId).ToList();
            var count = videos.Count;
            var index = videos.IndexOf(video);
            var previous = videos.ElementAtOrDefault(index - 1);
            var previousId = previous == null ? 0 : previous.Id;
            var next = videos.ElementAtOrDefault(index + 1);
            var nextId = next == null ? 0 : next.Id;
            var nextTitle = next == null ? string.Empty : next.Title;
            var nextThumbnail = next == null ? string.Empty : next.Thumbnail;
            var vm = new VideoViewModel {
                Video = videoDTO,
                Instructor = instructorDTO,
                Course = courseDTO,
                Lesson = new LessonInfoDTO {
                    LessonNumber = index + 1,
                    NumberOfLessons = count,
                    NextVideoId = nextId,
                    PreviousVideoId = previousId,
                    NextVideoTitle = nextTitle,
                    NextVideoThumbnail = nextThumbnail
                }
            };
            return View(vm);
        }

    }

}