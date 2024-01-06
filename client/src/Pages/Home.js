import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {



    const [users, setUsers] = useState([]);

    useEffect(()=>{
        getUserswithAuth();
    },[])



    axios.defaults.withCredentials= true;

    const getUserswithAuth = () => {

        axios.get('http://localhost:5000/users/getusers',{},{
            withCredentials: true
        })
            .then(res=>{
                console.log(res.data)
                setUsers(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }


    return(
        <div>
            Home
            {
                users.map((item,index)=>(
                    <div key={index}>
                        {item.username}
                    </div>
                ))
            }
        </div>
    )
}

export default Home;