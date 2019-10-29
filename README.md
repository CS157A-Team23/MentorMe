# CS157A-Team23
SJSU Fall 2019 CS157A Section 1 Team 23. 

#### [-->Project Proposal<--](https://docs.google.com/document/d/191xEl2XGk7AGcIiCMkq1VEpFbaK1IXagQnY6_I51A5o/edit?usp=sharing)


 #### [-->Project Requirements<--](https://docs.google.com/document/d/1WV8IgyHZor9jhwabe3yzM_h_zN1EHyvUDX-x4yZ9Rh0/edit?usp=sharing)


```Work done:
Work done:
Rick: Project Overview / System Environment
Jordan: Non-functional Issues
Mohammad: Functional Requirements / GUI
```
#
 #### [-->Project Design 1.0<--](https://docs.google.com/document/d/177uJQPxo0i80Cl-C0bx5Qnmhi2_MS9_nIZISewf4HiA/edit?usp=sharing)
#### [-->Project Design 2.0<--](https://docs.google.com/document/d/1aaQGpIBDItS3Z1BzWaHIJyZohfQIl5d1qrC4ntv5-l8/edit?usp=sharing)
#

## Members
* **[Rick Li](https://github.com/rickdiculousli)**
* **[Jordan Mercado](https://github.com/jmercad0)**
* **[Mohammad Syed](https://github.com/mohammad-syed)**

#
## How to Run

- cd into MentorMe1.1 directory
- cd into backend directory and run --> npm install -d
- cd into front directory and run --> npm install -d
- open 2 terminals for each of the applications
- set an enviornment variable 'mm_jwtPrivateKey' to a string
- run the backend with command --> node app
- run the frontend with command --> npm start

The backend is powered by an ExpressJS framework and runs on port 5000.
The frontend is powered by React and runs on port 3000.

__Environment Variables__

For the backend modules to properly function, an environment variable has to be set. This will be the private key for [Json Web Tokens](https://jwt.io/) to be generated. We will be using JWT Tokens as part of the request respose cycle by authenticating and authorizing users. ***Only the terminal running the backend needs to set its env_var.***

The way to set environment variables differ between platforms and interface.
```
// Windows CMD
> set mm_jwtPrivateKey="value"

// Windows Powershell
> $env:mm_jwtPrivateKey="value"

// Mac/Linux Bash Shell
> export mm_jwtPrivateKey="value"
```

## Using Backend

All http requests must be sent to port 5000 to utilize the backend APIs. It is easiest to test the APIs in a program such as [Postman](https://www.getpostman.com/)

NOTE: The React frontend has proxied into the backend port, so any http modules in React do not need to extend the port number to the backend.

### Register User and Logging in

Register Users
```
Request
POST /api/users/
Content-Type: application/json

{
    // Body
    "first_name": [STRING],
    "last_name": [STRING],
	"email": [STRING],
	"password":[STRING]
}

--------------------------------

Response
HTTP/1.1 200 OK
x-auth-token : [jwtToken]
Content-Type: application/json

{
    "id": [NUMBER], 
    "firstname": [STRING], 
    "lastname": [STRING],
    "email": [STRING]
}
```

Logging in
```
Request
POST /api/login/
Content-Type: application/json

{
	"email": [STRING],
	"password":[STRING]
}

--------------------------------

Response
HTTP/1.1 200 OK
x-auth-token : [jwtToken]
Content-Type: application/json

{
    "id": [NUMBER], 
    "firstname": [STRING], 
    "lastname": [STRING],
    "email": [STRING]
}
```