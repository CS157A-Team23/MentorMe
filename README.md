# CS157A - Team23 (MentorMe)

SJSU Fall 2019 CS157A Section 1 Team 23.

#### [-->Project Proposal<--](https://docs.google.com/document/d/191xEl2XGk7AGcIiCMkq1VEpFbaK1IXagQnY6_I51A5o/edit?usp=sharing)

#### [-->Project Requirements<--](https://docs.google.com/document/d/1WV8IgyHZor9jhwabe3yzM_h_zN1EHyvUDX-x4yZ9Rh0/edit?usp=sharing)

```
Project Requirement jobs
Rick: Project Overview / System Environment
Jordan: Non-functional Issues
Mohammad: Functional Requirements / GUI
```

#

#### [-->Project Design 1.0<--](https://docs.google.com/document/d/177uJQPxo0i80Cl-C0bx5Qnmhi2_MS9_nIZISewf4HiA/edit?usp=sharing)

#### [-->Project Design 2.0<--](https://docs.google.com/document/d/1aaQGpIBDItS3Z1BzWaHIJyZohfQIl5d1qrC4ntv5-l8/edit?usp=sharing)

#

## Members

- Rick Li - [Github](https://github.com/rickdiculousli), [Linkedin](https://www.linkedin.com/in/rickdiculousli/)
- Jordan Mercado - [Github](https://github.com/jmercad0), Linkedin
- Mohammad Syend - [Github](https://github.com/mohammad-syed), Linkedin

#

## How to Run

### Install Prerequisites

> #### Node.JS
>
> Go to the [official website](https://nodejs.org/en/) of Node.JS to download it for your environment.  
> Select Version 10.16.3 for optimal compatibility.
>
> #### MySQL Community Server
>
> Download MySQL from [here](https://dev.mysql.com/downloads/mysql/).  
> Follow the setup files to install MySQL, keep note of the username and password.  
> The database connector library does not support a few of the new features in version 8.x.x, and requires the password of your user to be reverted to 5.7.x format. So enter MySQL in command line or bash with the command:
>
> ```
> mysql -u [username] -p
> ```
>
> When inside MySQL, run the following command:
>
> ```
> SET PASSWORD FOR 'username'@'localhost' = OLD_PASSWORD('password');
> ```
>
> This should resolve all issues with the DB connector library.

### Setup this project

> - `git clone` this repo into your local directory
> - `cd` into MentorMe1.1 directory
> - `cd` into backend directory and run - `npm install`
> - `cd` into front directory and run - `npm install`
> - Run the sql script in the root of the repo named `MentorMeDB.sql` in MySQL
>
> The backend is powered by an ExpressJS framework and runs on port 5000.
> The frontend is powered by React and runs on port 3000. `MentorMeDB` contains a sample database.

### Environment Variables

> For the backend modules to properly function, a few environment variables have to be set:
>
> - `mm_jwtPrivateKey`
> - `mysqluser`
> - `mysqlpass`  
>
>
> `mm_jwtPrivateKey` will be the private key for [Json Web Tokens](https://jwt.io/) to be generated. We will be using JWT Tokens as part of the request respose cycle by authenticating and authorizing users.
>
> `mysqluser` and `mysqlpass` are the credentials for the username and password for the MySQL Community Server.
>
> The way to set environment variables differ between platforms and interface.  
> **_Only the terminal running the backend needs to set its env_var._**
>
> ```
> // Windows CMD
> > set mm_jwtPrivateKey="value"
> > set mysqluser="username"
> > set mysqlpass="password"
>
> // Windows Powershell
> > $env:mm_jwtPrivateKey="value"
> > $env:mysqluser="username"
> > $env:mysqlpass="password"
>
> // Mac/Linux Bash Shell
> > export mm_jwtPrivateKey="value"
> > export mysqluser="username"
> > export mysqlpass="password"
> ```

### Running the Project

> - Open 2 terminals for each of the applications
> - Run the backend with command - `node app`
> - Run the frontend with command - `npm start`
>
> If successful, the 2 terminals should display the following:
>
> ```
> // Frontend
> > npm start
>
> Compiled with warnings.
> ...
> ...
> Search for the keywords to learn more about each warning.
> To ignore, add // eslint-disable-next-line to the line before.
> ```
>
> ```
> // Backend
> > node app
>
> MentorMe listening on port 5000
> Executing (default): SELECT 1+1 AS result
> database connected
> All models synced to tables
> ```
>
> Using a web browser, go to <localhost:3000> and start playing around with our app!
>
> **Note:** Due to major browsers (Chrome, Safari) only allowing secure websockets ( `wss://` ) but not insecure ones (`ws://`), [**Firefox**](https://www.mozilla.org/en-US/firefox/) is the only browser we've tested that works with full compatibility.

---

## Using Pure Backend

All http requests must be sent to port 5000 to utilize the backend APIs. It is easiest to test the APIs in a program such as [Postman](https://www.getpostman.com/)

NOTE: The React frontend has proxied into the backend port, so any http modules in React do not need to extend the port number to the backend.

---

## Built With

- [React](https://reactjs.org/) - UI framework
- [Bootstrap](https://getbootstrap.com/) - CSS library
- [Node.js](https://nodejs.org/en/) - Backend runtime environment
- [Express](https://expressjs.com/) - Backend web framework
- [Socket.io](https://socket.io/) - Real-time event-based communication library
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) - Database server

## Acknowledgments

- Dr. Mike Wu - for leading a large class, keeping it entertaining for us, and encouraging us to do hands on learning.
