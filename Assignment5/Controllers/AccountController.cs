using System.Threading.Tasks;
using Assignment1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Assignment1.Entities;
using Microsoft.AspNetCore.Identity;

namespace Assignment1.Controllers {

    public class AccountController : Controller {

        private UserManager<User> userManager;
        private SignInManager<User> signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager) {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        
        [HttpGet]
        public IActionResult Register () {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model) {
            if (!ModelState.IsValid) return View();
            var user = new User {UserName = model.Username};
            var result = await this.userManager.CreateAsync(user, model.Password);
            if (result.Succeeded) {
                await this.signInManager.SignInAsync(user, false);
                return RedirectToAction("Index", "Home");
            }
            else {
                foreach(var error in result.Errors) {
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Logout() {
            await this.signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public IActionResult Login(string returnUrl = "") {
            var model = new LoginViewModel {ReturnUrl = returnUrl};
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model) {
            var result = await this.signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, false);
            if (result.Succeeded) {
                if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl)) {
                    return Redirect(model.ReturnUrl);
                }
                else {
                    return RedirectToAction("Index", "Home");
                }
            }
            ModelState.AddModelError("", "Login Failed");
            return View(model);
        }

    }

}