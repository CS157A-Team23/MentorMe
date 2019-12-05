import axios from "axios";
const jwt = require("jsonwebtoken");

const Myfunctions = {};

const postLogin = async function(cred) {
  console.log("entered post");
  try {
    const res = await axios.post("/api/login", cred); // cred = 'email', 'password'
    console.log("entered success");
    const token = res.headers["x-auth-token"];
    setData(token);
    return { status: res.status, body: res.data };
  } catch (error) {
    return { status: error.response.status, body: error.response.data };
  }
};

const postSignUp = async function(cred) {
  console.log("entered post");
  try {
    console.log(cred);
    const res = await axios.post("/api/users", cred); // cred = 'email', 'password', 'first_name', 'last_name'
    console.log("entered success");
    const token = res.headers["x-auth-token"];
    console.log(token);
    setData(token);
    return { status: res.status, body: res.data };
  } catch (error) {
    console.log(error.response.data);
    return { status: error.response.status, body: error.response.data };
  }
};

async function syncTest() {
  // axios.get('/me', { the other way to getting the axios, not reccomended for multiple async operations
  //     headers: {
  //         'x-auth-token': sessionStorage.authToken
  //     }
  // }).then(res => {
  //     //continue operation
  // }).catch(err => {});
  try {
    const res = await axios.get("/me", {
      headers: {
        "x-auth-token": sessionStorage.authToken
      }
    });
  } catch (err) {}
  // or continue here
}

const setData = token => {
  console.log(token);
  sessionStorage.setItem("authToken", token);
  const decoded = jwt.decode(token);
  sessionStorage.setItem("id", decoded.id);
  sessionStorage.setItem("firstname", decoded.first_name);
  sessionStorage.setItem("lastname", decoded.last_name);
};

Myfunctions.postLogin = postLogin;
Myfunctions.postSignUp = postSignUp;
export default Myfunctions;
