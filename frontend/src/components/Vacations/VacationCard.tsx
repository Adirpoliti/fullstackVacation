import React, { useState } from "react";
import { VacationType } from "../../types/VacationType";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
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
import { useAppSelector } from "../../App/hooks";
import { selectUser } from "../../App/features/usersSlice";
import { useNavigate } from "react-router-dom";

const VacationPriceBtn = styled(Button)({
  width: "100%",
  cursor: "default",
  color: "white",
  fontSize: "20px",
  backgroundColor: "#191919",
  marginTop: "10px",
  borderRadius: "5px",
  textTransform: "none",
  fontFamily: "tripSans",
  "&:hover": {
    color: "black",
    backgroundColor: "#29cedd",
  },
});

const VacationStyledCard = styled(Card)({
  height: "550px",
  width: "345px",
  backgroundColor: "#292929",
  color: "white",
  borderRadius: "15px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  margin: "10px",
});

const CardsDescription = styled(Typography)({
  height: "100px",
  overflow: "scroll",
  overflowX: "hidden",
  overflowY: "scroll",
  color: "#c0c0c0",
  fontFamily: "tripSans",
  "&::-webkit-scrollbar": {
    width: "2px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#292929",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#191919",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#333",
  },
});

const CardTitle = styled(Typography)({
  fontFamily: "tripSans",
  fontSize: "22px",
  fontWeight: "bold",
  textTransform: "capitalize",
  marginBottom: "5px",
});

const CardDates = styled(Typography)({
  fontFamily: "tripSans",
  fontSize: "14px",
  color: "#a0a0a0",
  marginBottom: "10px",
});

export const VacationCard = ({
  locationCity,
  locationCountry,
  startDate,
  endDate,
  description,
  price,
  imageName,
  _id,
}: VacationType) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [isFavorite, setIsFavotite] = useState<boolean>(false);

  const handleFavoriteClick = () => {
    setIsFavotite(!isFavorite);
  };

  const handleEditVacation = (id: string) => {
    console.log(id);
    navigate("/editvacation");
  };

  const VacationStartDate = startDate
    .toString()
    .substring(0, 10)
    .split("-")
    .reverse()
    .join(".");
  const VacationEndDate = endDate
    .toString()
    .substring(0, 10)
    .split("-")
    .reverse()
    .join(".");

  return (
    <VacationStyledCard>
      <CardHeader
        title={
          <CardTitle>
            {locationCity}, {locationCountry}
          </CardTitle>
        }
        subheader={
          <CardDates>
            {VacationStartDate} – {VacationEndDate}
          </CardDates>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:3001/images/${imageName}`}
        alt={locationCountry}
        title={locationCountry + " , " + locationCity}
        style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
      />
      <CardContent>
        <CardsDescription variant="body2" color="text.secondary">
          {description}
        </CardsDescription>
        <VacationPriceBtn>${price}</VacationPriceBtn>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleFavoriteClick} aria-label="add to favorites">
          {isFavorite ? (
            <FavoriteIcon style={{ color: "29cedd" }} />
          ) : (
            <FavoriteBorderOutlinedIcon style={{ color: "#818181" }} />
          )}
        </IconButton>
        {user.registeredUser.role === "admin" && (
          <>
            <IconButton onClick={() => handleEditVacation(_id)}>
              <EditOutlinedIcon style={{ color: "#818181" }} />
            </IconButton>
            <IconButton>
              <DeleteOutlineIcon style={{ color: "#818181" }} />
            </IconButton>
          </>
        )}
      </CardActions>
    </VacationStyledCard>
  );
};
