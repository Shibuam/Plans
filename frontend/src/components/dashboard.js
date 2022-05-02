import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, Paper, TextField } from '@mui/material'
import { Plan } from './planCard';
import { plansArray } from '../utils/plansArray'



export default function Home() {


    const userFromLS = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')) : null

    let navigate = useNavigate()
    const [user, setUser] = React.useState(null)

    const upgradeHandler = async () => {
        const { data } = await axios.patch(`/user/upgrade/${user.user_id}`, {}, {
            headers: {
                Authorization: `Bearer ${userFromLS.token}`,
            },
        })
        setUser(data)
    }
    const loguOutHandler = () => {
        localStorage.removeItem('user')

        navigate('/')
    }

    React.useEffect(() => {
        const getUserDetails = async () => {
            try {
                const { data } = await axios.get('/user', {
                    headers: {
                        Authorization: `Bearer ${userFromLS.token}`,
                    },
                })
                setUser(data)
            } catch (err) {

            }
        }

        getUserDetails()
    }, [])

    return (
        <div>
            {user && (
                <>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar>

                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {user && user.name}
                                </Typography>
                                <Button onClick={loguOutHandler} color="inherit">log out</Button>
                            </Toolbar>
                        </AppBar>
                    </Box>

                    <Grid container marginTop={'64px'} spacing={3} justifyContent={'center'} >
                        {plansArray.map((plan) => (
                            <Grid item>
                                <Plan upgradePlan={upgradeHandler} title={plan.title} currentPlan={user.plan} />
                            </Grid>
                        ))}

                    </Grid>
                </>
            )}
        </div>
    );
}
