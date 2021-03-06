using System.Collections.Generic;
using VideoOnDemand.Models.DTOModels;

namespace VideoOnDemand.Models.MembershipViewModels {

    public class CourseViewModel {
        public CourseDTO Course {get; set;}
        public InstructorDTO Instructor {get; set;}
        public IEnumerable<ModuleDTO> Modules {get; set;}
    }

}