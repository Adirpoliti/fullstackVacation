import React, { useState } from "react";
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
  fontSize: "20px",
  backgroundColor: "#29cedd"
});

const VacationStyledCard = styled(Card)({
  height: "550px",
  width: "345px",
  backgroundColor: "#e8e8e8"
});

const CardsDescription = styled(Typography)({
  height: "100px",
  overflow: "scroll",
  overflowX: "hidden",
  overflowY: "hidden",
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
  const [isFavorite, setIsFavotite] = useState<boolean>(false)

  const handleFavoriteClick = () => {
    setIsFavotite(!isFavorite)
  }

  const VacationStartDate = startDate.toString();
  const VacationEndDate = endDate.toString();
  return (
    <VacationStyledCard>
      <CardHeader
        title={locationCity + ", " + locationCountry}
        subheader={VacationStartDate + VacationEndDate}
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:3001/images/${imageName}`}
        alt={locationCountry}
      />
      <CardContent>
        <CardsDescription
          variant="body2"
          color="text.secondary"
        >
          {description}
        </CardsDescription>
        <VacationPriceBtn>${price}</VacationPriceBtn>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleFavoriteClick} aria-label="add to favorites">
          <FavoriteIcon style={{color: isFavorite ? "red" : "#818181"}} />
        </IconButton>
      </CardActions>
    </VacationStyledCard>
  );
};
