using System.Collections.Generic;
using Assignment1.Entities;
using System;
using System.Linq;
using Assignment1.Models;

namespace Assignment1.Services {
    public class MockVideoDataService : IVideoDataService {
        public IEnumerable<Video> GetAll() {
            return this._videos;
        }

        private List<Video> _videos;

        public MockVideoDataService() {
            this._videos = new List<Video> {
                new Video {Id = 1, Title = "Shrek", Genre = Genres.Romance},
                new Video {Id = 2, Title = "Despicable Me", Genre = Genres.Horror},
                new Video {Id = 3, Title = "Megamind", Genre = Genres.Action}
            };
        }

        public Video Get(int id) {
            return this._videos.FirstOrDefault(v => v.Id.Equals(id));
        }

        public void Add(Video video) {
            video.Id = this._videos.Max(v => v.Id) + 1;
            this._videos.Add(video);
        }
    }
}