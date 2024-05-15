import React from "react";
import { VacationType } from "../../types/VacationType";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  IconButton,
  styled,
} from "@mui/material";

const VacationPriceBtn = styled(Button)({
  width: "100%",
  cursor: "default",
  color: "black",
  fontSize: "20px"
})

export const VacationCard = ({
  locationCity,
  locationCountry,
  startDate,
  endDate,
  description,
  price,
  imageName,
}: VacationType) => {

    const VacationStartDate = startDate.toString()
    const VacationEndDate = endDate.toString()
  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        title={locationCity + ", " + locationCountry}
        subheader={VacationStartDate + VacationEndDate}
      />
      <CardMedia
        component="img"
        height="194"
        image={`../../../../backend/src/1-Assets/images/${imageName}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <VacationPriceBtn>${price}</VacationPriceBtn>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
