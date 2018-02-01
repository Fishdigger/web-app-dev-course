using Assignment1.Data;
using Assignment1.Entities;
using System.Collections.Generic;

namespace Assignment1.Services {

    public class SqlVideoDataService : IVideoDataService {
        private VideoDbContext db;

        public SqlVideoDataService(VideoDbContext context) {
            this.db = context;
        }

        public void Add(Video video) {
            this.db.Add(video);
        }

        public Video Get(int id) => db.Find<Video>(id);

        public IEnumerable<Video> GetAll() => db.Videos;

        public int Commit() => db.SaveChanges();
    }

}