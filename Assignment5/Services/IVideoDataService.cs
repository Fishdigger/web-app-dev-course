using Assignment1.Entities;
using System.Collections.Generic;

namespace Assignment1.Services {
    public interface IVideoDataService {
        IEnumerable<Video> GetAll();
        Video Get(int id);
        void Add(Video video);
        int Commit();
    }
}