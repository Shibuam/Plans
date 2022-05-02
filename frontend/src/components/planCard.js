import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const images = {
    Silver: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv7-0r2h5AnhkJL4vCIyLPP-T3QzNHwEMx5g&usqp=CAU",
    Gold: "https://media.istockphoto.com/illustrations/gold-medal-on-red-ribbon-illustration-id466284530",
    Diamond: "https://cdn-icons-png.flaticon.com/512/2502/2502799.png",
    Platinum: "https://e7.pngegg.com/pngimages/861/416/png-clipart-sponsor-advertising-organization-logo-platinum-classical-medal-miscellaneous-company-thumbnail.png"
}

export const Plan = ({ title, currentPlan, upgradePlan }) => {
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: title === currentPlan ? '#d6e6ff' : 'white' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    //   image="/static/images/cards/contemplative-reptile.jpg"
                    image={images[title]}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {currentPlan === title && (
                    <Button disabled={title === 'Platinum' ? true : false} onClick={upgradePlan} variant={'contained'} size="small" color="secondary">
                        Upgrade Plan
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}
