import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import cover from "../assets/images/techcover.jpg"
import "./ItemCard.css"

export function ItemCard(props) {
    return (
        <div className="itemCard">
            <Card sx={{ maxWidth: 330 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={cover}
                    alt="Chevrolet"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Item Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This is a description for the item name, it should provide some sense of what the items inteded purpose is
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Rent</Button>
                    <Button size="small">Contact Sharer</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default ItemCard;
