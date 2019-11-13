import axios from 'axios';
const jwt = require('jsonwebtoken');

const Myfunctions = {}

const postLogin = async function(cred) {
    console.log('entered post');
    try {
        const res = await axios.post('/api/login', cred) // cred = 'email', 'password'
        console.log('entered success');
        const token = res.headers["x-auth-token"];
        console.log(token);
        localStorage.setItem('authToken', token);
        const decoded = jwt.decode(token);
        localStorage.setItem('myData', decoded.payload);
        return {status: res.status ,body: res.data};
    } catch (error){
        return {status: error.response.status ,body: error.response.data};
    }
    
        
}

async function syncTest(){
    // axios.get('/me', { the other way to getting the axios, not reccomended for multiple async operations
    //     headers: {
    //         'x-auth-token': localStorage.authToken
    //     }
    // }).then(res => {
    //     //continue operation
    // }).catch(err => {});
    try{
        const res = await axios.get('/me', {
            headers: {
                'x-auth-token': localStorage.authToken
            }
        })
    }catch (err) {

    }
        
    // or continue here
}

Myfunctions.postLogin = postLogin;
export default Myfunctions;