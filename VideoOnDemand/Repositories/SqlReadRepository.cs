using System.Collections.Generic;
using System.Linq;
using VideoOnDemand.Data;
using VideoOnDemand.Entities;

namespace VideoOnDemand.Repositories {

    public class SqlReadRepository : IReadRepository {
        private ApplicationDbContext db;
        
        public SqlReadRepository(ApplicationDbContext dbContext) {
            this.db = dbContext;
        }

        public IEnumerable<Course> GetCourses(string userId) {
            var courses = db.UserCourses.Where(uc => uc.UserId.Equals(userId))
                .Join(db.Courses, uc => uc.CourseId, c => c.Id,
                (uc, c) => new {Course = c})
                .Select(s => s.Course);
            foreach (var course in courses) {
                course.Instructor = db.Instructors.SingleOrDefault(s => s.Id.Equals(course.InstructorId));
                course.Modules = db.Modules.Where(m => m.CourseId.Equals(course.Id)).ToList();
            }

            return courses;
        }

        public Course GetCourse(int courseId, string userId) {
            var course = db.UserCourses.Where(uc => uc.UserId.Equals(userId))
                .Join(db.Courses, uc => uc.CourseId, c => c.Id,
                    (uc, c) => new {Course = c})
                .SingleOrDefault(s => s.Course.Id.Equals(courseId)).Course;
            course.Instructor = db.Instructors.SingleOrDefault(s => s.Id.Equals(course.InstructorId));
            course.Modules = db.Modules.Where(m => m.CourseId.Equals(course.Id)).ToList();

            foreach (var module in course.Modules) {
                module.Downloads = db.Downloads.Where(d => d.ModuleId == module.Id).ToList();
                module.Videos = db.Videos.Where(v => v.ModuleId == module.Id).ToList();
            }

            return course;
        }

        public Video GetVideo(string userId, int videoId) {
            return db.Videos.Where(v => v.Id == videoId)
                .Join(db.UserCourses, v => v.CourseId, uc => uc.CourseId,
                (v, uc) => new {Video = v, UserCourse = uc})
                .Where(vuc => vuc.UserCourse.UserId == userId)
                .FirstOrDefault().Video;
        }

        public IEnumerable<Video> GetVideos(string userId, int moduleId) {
            var videos = db.Videos.Join(db.UserCourses, v => v.CourseId, uc => uc.CourseId,
                (v, uc) => new {Video = v, UserCourse = uc})
                .Where(vuc => vuc.UserCourse.UserId == userId);
            if (moduleId == 0) {
                return videos.Select(s => s.Video);
            }
            else {
                return videos.Where(v => v.Video.ModuleId == moduleId).Select(s => s.Video);
            }
        }
    }

}