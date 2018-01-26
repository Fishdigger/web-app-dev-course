using Microsoft.AspNetCore.Mvc;
using Assignment1.Models;

namespace Assignment1.Controllers {
    public class HomeController : Controller {
        public ObjectResult Index() {
            var model = new Video {Id = 1, Title = "Shrek"};
            return new ObjectResult(model);
        }
    }
}