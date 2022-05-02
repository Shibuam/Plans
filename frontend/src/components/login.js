import { useState } from 'react'
import {Grid,TextField,Paper,Button, Typography} from '@mui/material'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const btnStyle = { margin: '25px 0' }
const styles = {
    paperContainer: {
       
        
        backgroundSize:'cover',     
        height: "70vh",
        padding:'3rem'
    }
};

const paperStyle = { padding: 20, height: 'auto', width: 260, margin: ' auto' }

function Login(){

const navigate=useNavigate()
const [errorss,setError]=useState('')

const { register, handleSubmit, formState: { errors } } = useForm();

const FormSubmit = async (loginDetails) => {
console.log(loginDetails)
const url='http://localhost:4000/user/login'

try {
    let {data}=await axios.post(url,loginDetails)
    localStorage.setItem('user',JSON.stringify({token: data.token}))
    if(data){
        navigate('/dashboard')
    }
} catch (err) {
    setError("Invalid User name or Password")
}


// {
//     
// }
}

    return(
        <div style={styles.paperContainer}>
        <Grid >
            <form onSubmit={handleSubmit(FormSubmit)}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid><center>

                        <h2> Sign In</h2>
          <p style={{color:'red'}}>   {errorss}</p> 
                    </center>
                    </Grid>
                       
                    <TextField id="standard-basic" label="Email" variant="standard"  name="email" {...register('email', { required: "Email is required" })}  fullWidth />
                    <p style={{color:'red'}}>    {errors?.email && errors.email.message} </p>
                    <TextField id="standard-basic" label="Password" type='password' name='password' {...register('password', { required: "Password is required" })} variant="standard"  fullWidth />
                    <p style={{color:'red'}}>       {errors?.password && errors.password.message} </p>
                    <Button type="submit" variant="contained" style={btnStyle} color="primary" fullWidth>Submit</Button>
                 Need a Registration?   <Button onClick={()=>navigate('/registration')} style={{color:'red'}}> Click Here</Button> 
                </Paper>
            </form>
        </Grid>
        </div>
    )
}
export default Login