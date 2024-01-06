import { useState } from "react";
import axios from "axios";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    const handldlePassword = (event) => {
        setPassword(event.target.value);
    }

    
    const onSubmit =(event) => {

        axios.post('http://localhost:5000/users/login',{username: username, password: password})
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err);
        })


    }

    return(
        <div>
            Login
            <input type="text" value={username} onChange={handleUsername} placeholder="Username..."/>
            <input type="text" value={password} onChange={handldlePassword} placeholder="Password..."/>
            <button onClick={onSubmit}>Login</button>
        </div>
    )
}

export default Login;