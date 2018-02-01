using Microsoft.AspNetCore.Mvc;
using Assignment1.Entities;
using System.Collections.Generic;
using Assignment1.Services;
using Assignment1.ViewModels;
using System.Linq;
using System;

namespace Assignment1.Controllers {
    public class HomeController : Controller {
        private IVideoDataService service;

        public HomeController(IVideoDataService service) {
            this.service = service;
        }

        public ViewResult Index() {
            var model = service.GetAll()
                .Select(video => new VideoViewModel {
                    Id = video.Id,
                    Title = video.Title,
                    Genre = video.Genre.ToString()
                });

            return View(model);
        }

        public IActionResult Details(int id) {
            var model = service.Get(id);
            if (model == null) {return RedirectToAction("Index");}
            return View(new VideoViewModel {
                Id = model.Id,
                Title = model.Title,
                Genre = model.Genre.ToString()
            });
        }

        [HttpGet]
        public IActionResult Create() {
            return View();
        }
        
        [HttpPost]
        public IActionResult Create(VideoEditViewModel model) {
            if (ModelState.IsValid) {
                var video = new Video {
                    Title = model.Title,
                    Genre = model.Genre
                };
                service.Add(video);
                return RedirectToAction("Details", new {id = video.Id});
            }
            return View();
        }
    }
}