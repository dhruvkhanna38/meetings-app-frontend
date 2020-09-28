import axios from 'axios'

const baseURL = "http://backendcode-env.eba-hrcuuwjk.ap-south-1.elasticbeanstalk.com";
const loginURL = `${baseURL}/users/login`;
const signupURL = `${baseURL}/users`

const axiosOptions = {
    timeout: 10000
}

export let isLoggedIn = localStorage.getItem('token');

export async function login(credentials){
   const response = await axios.post(loginURL, credentials, {
        ...axiosOptions,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.user.email);
        isLoggedIn = true;
        return response.data;
    }
    else {
        throw new Error("Incorrect Credentials");
    }
}

export async function checkVerification(emailToken){
    console.log(emailToken);
    try{
        const response = await axios.get(`${baseURL}/checkVerification`, {params:{emailToken}  , ...axiosOptions});
        return response;
    }catch(error){
        throw new Error("User not found");
    }
}


export async function signup(credentials){
    console.log(credentials)
     try{
        const response = await axios.post(signupURL, credentials, {
            ...axiosOptions,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.data){
            localStorage.setItem('emailToken', response.data.emailToken);
            return response.data;
        }
        else{
            throw new Error("Invalid Credentials");
        }
     }catch(error){
        throw new Error("Invalid Credentials");
     }
    //  if (response.data) {
    //      localStorage.setItem('token', response.data.token);
    //      localStorage.setItem('email', response.data.user.email);
    //      isLoggedIn = true;
    //      return response.data;
    //  }
    //  else {
    //      throw new Error("Incorrect Credentials");
    //  }
}

export function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    isLoggedIn = false;
}

export function getAuthToken(){
    return localStorage.getItem('token');
}

export function getEmail(){
    return localStorage.getItem('email');
}


