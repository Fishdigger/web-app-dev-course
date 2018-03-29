using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VideoOnDemand.Models;
using Microsoft.AspNetCore.Identity;
using VideoOnDemand.Repositories;

namespace VideoOnDemand.Controllers
{
    public class HomeController : Controller
    {
        private string mockUserId = "4ad684f8-bb70-4968-85f8-458aa7dc19a3";
        private SignInManager<ApplicationUser> signInManager;

        public HomeController(SignInManager<ApplicationUser> manager) {
            signInManager = manager;
        }


        public IActionResult Index()
        {
            if (!signInManager.IsSignedIn(User)) {
                return RedirectToAction("Login", "Account");
            }
            return RedirectToAction("Dashboard", "Membership");
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
