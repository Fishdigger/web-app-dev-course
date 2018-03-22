using System.Collections.Generic;
using VideoOnDemand.Entities;

namespace VideoOnDemand.Repositories {

    public interface IReadRepository {
        IEnumerable<Course> GetCourses(string userId);
        Course GetCourse(int courseId, string userId);
        Video GetVideo(string userId, int videoId);
    }

}