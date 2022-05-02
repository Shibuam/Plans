
import { Grid, TextField, Paper, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const btnStyle = { margin: '25px 0' }
const styles = {
    paperContainer: {


        backgroundSize: 'cover',
        height: 'auto',
        padding: '3rem'
    }
};

const paperStyle = { padding: 20, height: 'auto', width: 260, margin: ' auto' }




function Registration() {

    const [exist, setExist] = useState('')
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const FormSubmit = async (reg) => {

        const url = '/user/registration'

        let { data } = await axios.post(url, reg)
        if (!data.user) {
            navigate('/')
        }
        else {
            setExist("user Already Exist")
        }
    }
    return (
        <div style={styles.paperContainer}>
            <Grid >
                <form onSubmit={handleSubmit(FormSubmit)}>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid><center>

                            <h2> Registration Form</h2>
                            <p style={{ color: 'red' }}>{exist}</p>
                        </center>
                        </Grid>
                        <TextField id="standard-basic" label="Name" variant="standard" name="name" {...register('name', { required: "Name is required" })} fullWidth />
                        <p style={{ color: 'red' }}>    {errors?.Name && errors.Name.message} </p>

                        <TextField id="standard-basic" label="Email" variant="standard" name="email" {...register('email', { required: "Email is required" })} fullWidth />
                        <p style={{ color: 'red' }}>    {errors?.email && errors.email.message} </p>

                        <TextField id="standard-basic" label="Phone" variant="standard" name="phone" {...register('phone', { required: "Phone Number is required" })} fullWidth />
                        <p style={{ color: 'red' }}>    {errors?.phone && errors.phone.message} </p>

                        <TextField id="standard-basic" label="Password" type='password' name='password' {...register('password', { required: "Password is required" })} variant="standard" fullWidth />
                        <p style={{ color: 'red' }}>       {errors?.password && errors.password.message} </p>

                        <Button type="submit" variant="contained" style={btnStyle} color="primary" fullWidth>Submit</Button>

                        Do you have an account?   <Button onClick={() => navigate('/')} style={{ color: 'red' }}> Click Here</Button>
                    </Paper>
                </form>
            </Grid>
        </div>
    )
}
export default Registration