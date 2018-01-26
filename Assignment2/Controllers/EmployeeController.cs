using Microsoft.AspNetCore.Mvc;

namespace Assignment1.Controllers {

    public class EmployeeController : Controller{

        public string Index() {
           return "Hello from Employee"; 
        }
        public ContentResult Name() {
            return Content("Joel");
        }
        public string Country() {
            return "USA";
        }

    }

}