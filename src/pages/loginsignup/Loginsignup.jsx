import React from 'react';
import './Mainpage.scss'
import logo from '../../logo/logo.png'
import Login from '../../components/login/Login';
import Signup from '../../components/signup/Signup';
import { useNavigate } from "react-router-dom";


function Mainpage() {
    const navigate = useNavigate();
    const [options, setOptions] = React.useState(true)
    const loginOptions = () => {
        setOptions(true)
    //    navigate('/login')
    }
    const signupOptions =()=>{
        setOptions(false)
    //    navigate('/signup')
    }
  
    return (<div>
        <div className='home-container'>
            <div className='left-image'>
                <img className="mainLogo" src={logo} alt="this is logo"></img>
                <div className='logoname'>ONLINE BOOK SHOPPING</div>
                <div className='loginsignin'>
                    <div className='login' onClick={loginOptions}>
                        LOGIN
                    </div>
                    <div className='signup'  onClick={signupOptions}  >
                        SIGNUP
                    </div>
                    <div className='loginsignincomponents'>
                    {options ? <Login /> :<Signup/>}
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Mainpage;