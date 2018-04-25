using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using VideoOnDemand.Data;
using VideoOnDemand.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using VideoOnDemand.Models;
using Microsoft.AspNetCore.Identity;
using VideoOnDemand.Models.DTOModels;
using Microsoft.AspNetCore.Authorization;

namespace VideoOnDemand.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("admin/[controller]/[action]")]
    public class UserCoursesController : Controller
    {
        private readonly ApplicationDbContext db;
        private readonly UserStore<ApplicationUser,IdentityRole, ApplicationDbContext> userStore;

        public UserCoursesController(UserStore<ApplicationUser, IdentityRole, ApplicationDbContext> userStore) {
            this.db = userStore.Context;
            this.userStore = userStore;
        }

        public IActionResult Index() {
            var model = db.Courses
                .Join(db.UserCourses, c => c.Id, uc => uc.CourseId,
                (c, uc) => new { Courses = c, UserCourses = uc })
                .Select(s => new UserCourseDTO {
                    CourseId = s.Courses.Id,
                    CourseTitle = s.Courses.Title,
                    UserId = s.UserCourses.UserId,
                    UserEmail = userStore.Users.FirstOrDefault(u => u.Id.Equals(s.UserCourses.UserId)).Email
                });
            return View(model);
        }

        public async Task<IActionResult> Details(string userId, int courseId) {
            if (userId == null || courseId == default(int)) return NotFound();
            var model = await db.Courses
                .Join(db.UserCourses, c => c.Id, uc => uc.CourseId,
                (c, uc) => new { Courses = c, UserCourses = uc })
                .Select(s => new UserCourseDTO {
                    CourseId = s.Courses.Id,
                    CourseTitle = s.Courses.Title,
                    UserId = s.UserCourses.UserId,
                    UserEmail = userStore.Users.FirstOrDefault(u => u.Id.Equals(s.UserCourses.UserId)).Email
                })
                .FirstOrDefaultAsync(w => w.CourseId == courseId && w.UserId.Equals(userId));
            
            if (model == null) return NotFound();
            return View(model);            
        }

        public async Task<IActionResult> Edit(string userId, int courseId) {
            if (userId == null || courseId == default(int)) return NotFound();
            var model = await db.UserCourses.SingleOrDefaultAsync(m => m.UserId.Equals(userId) && m.CourseId == courseId);
            ViewData["CourseId"] = new SelectList(db.Courses, "Id", "Title");
            ViewData["UserId"] = new SelectList(userStore.Users, "Id", "Email");
            if (model == null) return NotFound();
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("UserId,CourseId")] UserCourse userCourse, string originalUserId, int originalCourseId) {
            if (originalUserId == null || originalCourseId == default(int)) return NotFound();
            var original = await db.UserCourses
                .SingleOrDefaultAsync(uc => uc.UserId.Equals(originalUserId) && uc.CourseId == originalCourseId);
            if (!UserCourseExists(userCourse.UserId, userCourse.CourseId)) {
                try {
                    db.Remove(original);
                    db.Add(userCourse);
                    await db.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
                catch {
                    ModelState.AddModelError("", "Unable to save changes");
                }
            }
            ViewData["CourseId"] = new SelectList(db.Courses, "Id", "Title");
            ViewData["UserId"] = new SelectList(userStore.Users, "Id", "Email");
            return View(userCourse);
        }

        public IActionResult Create() {
            ViewData["CourseId"] = new SelectList(db.Courses, "Id", "Title");
            ViewData["UserId"] = new SelectList(userStore.Users, "Id", "Email");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("UserId,CourseId")] UserCourse userCourse) {
            if (ModelState.IsValid) {
                try {
                    db.Add(userCourse);
                    await db.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
                catch {
                    ModelState.AddModelError("", "That combination already exists");
                }
            }
            ViewData["CourseId"] = new SelectList(db.Courses, "Id", "Title", userCourse.CourseId);
            ViewData["UserId"] = new SelectList(userStore.Users, "Id", "Email");
            return View();
        }

        public async Task<IActionResult> Delete(string userId, int courseId) {
            if (userId == null || courseId == default(int)) return NotFound();
            var model = await db.Courses
                .Join(db.UserCourses, c => c.Id, uc => uc.CourseId,
                (c, uc) => new { Courses = c, UserCourses = uc })
                .Select(s => new UserCourseDTO {
                    CourseId = s.Courses.Id,
                    CourseTitle = s.Courses.Title,
                    UserId = s.UserCourses.UserId,
                    UserEmail = userStore.Users.FirstOrDefault(u => u.Id.Equals(s.UserCourses.UserId)).Email
                })
                .FirstOrDefaultAsync(w => w.CourseId == courseId && w.UserId.Equals(userId));
            
            if (model == null) return NotFound();
            return View(model);            
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string userId, int courseId) {
            var usercourse = await db.UserCourses
                .SingleOrDefaultAsync(m => m.UserId.Equals(userId) && m.CourseId == courseId);
            db.UserCourses.Remove(usercourse);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool UserCourseExists(string userId, int courseId) {
            return db.UserCourses.Any(e => e.UserId.Equals(userId) && e.CourseId == courseId);
        }
    }
}
