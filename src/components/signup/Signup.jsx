import React from 'react';
import { Button, TextField } from '@mui/material';
import './signup.scss'
import UserService from '../../services/UserService';

function Signup() {

    const initialValue = {
        fullname : "",
        email : "",
        password : "",
        phone : "",
        fullnameError : "",
        emailError : "",
        passwordError: "",
        phoneError : ""
     }
    const [fields,setFields]=React.useState(initialValue)

    const changevalues=(e)=>{
        setFields((previousvalues)=>{
            return {...previousvalues,[e.target.name]:e.target.value}
        })
    }
    const validate=()=>{
        const nameError=fields.fullname==='' ? true : false
        const mailError=fields.email==='' ? true : false
        let passError=fields.password==='' ? true : false
        passError=fields.confirmPassword===fields.password ? false : true
        const phError=fields.phone==='' ? true : false
        setFields((previousvalues)=>{
            return {...previousvalues,fullnameError:nameError,emailError:mailError,passwordError:passError,phoneError:phError}

        })
        return nameError||mailError||passError||phError

    }
    const signup=()=>{
        let  isValidate=validate()
        if(!isValidate){
            let data ={
                "fullName" : fields.fullname,
                "emailId" : fields.email,
                "password" : fields.password,
                "phone" : fields.phone
            }
            UserService.signup(data).then(()=>{
                console.log("success");
                window.alert("User Successfully Registered!");
                setFields(initialValue);
            }).catch((err)=>{
                console.log("fail");
            })
        }
       
    }
    return <>
        <div className='signup'>
            <div className='fullName'>
                <TextField name="fullname" style={{ width: "232px" }} size="small" type='text' variant="outlined" label="Full Name"
                onChange={(e)=>{changevalues(e)}} error={fields.fullnameError}/>
            </div>
            <div className='emailInput'>
                <TextField name="email" style={{ width: "232px" }} size="small" type='email' variant="outlined" label="Email Id"
                onChange={(e)=>{changevalues(e)}} error={fields.emailError}/>
            </div>
            <div className='password'>
                <TextField name="password" style={{ width: "232px" }} size="small" type='password' variant="outlined" label="Password"
                onChange={(e)=>{changevalues(e)}} error = {fields.passwordError}/>
            </div>

            <div className='confirmPassword'>
                <TextField name="confirmPassword" style={{ width: "232px" }} size="small" type='password' variant="outlined" label="Confirm Password"
                onChange={(e)=>{changevalues(e)}} error = {fields.passwordError}/>
            </div>

            <div>
                <TextField name="phone" style={{ width: "232px" }} className='phonenumber' size="small" type='number' variant="outlined" label="Number"
                onChange={(e)=>{changevalues(e)}} error = {fields.phoneError}/>
            </div>
            <div> <Button className='signupButton' style={{ backgroundColor: '#A03037' , color: 'white' }} onClick={()=>signup()} > SignUp </Button>
            </div>
        </div>
    </>;
}

export default Signup;