namespace Assignment1.Services {
        public class HardCodedMessageService : IMessageService {
            public string GetMessage() {
                return "Hardcoded message from a service";
            }
    }
}
