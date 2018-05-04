## Henry's Book 

This is the final project for a web app development course.
It is composed of an API written with Go and client written in
React JS, and uses a local Sqlite3 database.

Technologies Used
- Server
    - [Go](https://golang.org/)
    - [httprouter](https://github.com/julienschmidt/httprouter)
    - [GORM](http://gorm.io/)
    - [CORS Configurer](https://github.com/rs/cors)
- Client
    - [React](https://reactjs.org/)
    - [Create React App](https://github.com/facebook/create-react-app)
    - [React Bootstrap](https://react-bootstrap.github.io/)
    - [React Router](https://github.com/ReactTraining/react-router)

### Setup
1. Install Golang and Dep.
1. Install NodeJS and NPM.
1. Clone the GitHub repository.
1. Set the environment variable `SEED_DB=true` the first time you run the app.
1. Download dependencies by running the command `dep ensure` in the server directory and the command `npm install` in the client directory. 
1. Run the server by navigating to the `server` directory and running the command `go run main.go`.
1. In a separate terminal window, start the client by navigating to the `client` directory and running the command `npm start`.
1. The application will be visible at [http://localhost:3000](http://localhost:3000).