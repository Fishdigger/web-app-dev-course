using Microsoft.Extensions.Configuration;

namespace Assignment1.Services {
    public class ConfigurationMessageService : IMessageService {
        private IConfiguration _configuration;

        public ConfigurationMessageService(IConfiguration config) {
            this._configuration = config;
        }

        public string GetMessage() {
            return _configuration["Message"];
        }
    }
}