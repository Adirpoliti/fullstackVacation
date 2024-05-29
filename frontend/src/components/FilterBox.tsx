import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { styled } from "@mui/material";
import { useAppSelector } from "../App/hooks";
import { selectUser } from "../App/features/usersSlice";

interface FilterProps {
  allVacations: () => Promise<any>;
  activeVacations: () => Promise<any>;
  currentlyActiveVacations: () => Promise<any>;
  followedVacations: () => Promise<any>;
}

const StyledFilterBtn = styled(Button)({
  textTransform: "none",
  color: "white",
  fontFamily: "tripSans",
  fontSize: "16px",
});

const StyledFilterMenuItem = styled(MenuItem)({
  fontFamily: "tripSans",
  fontSize: "15px",
  textAlign: "center",
  width: "100%",
  backgroundColor: "#292929",
  color: "white",
});

export default function FilterBox({
  allVacations,
  activeVacations,
  currentlyActiveVacations,
  followedVacations,
}: FilterProps) {
  const user = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledFilterBtn onClick={handleClick} startIcon={<FilterAltIcon />}>
        Filter Vacations
      </StyledFilterBtn>
      <Menu
        sx={{ "& .MuiPaper-root": { backgroundColor: "#292929" } }}
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <StyledFilterMenuItem
          onClick={() => {
            handleClose();
            allVacations();
          }}
        >
          Show All
        </StyledFilterMenuItem>
        <StyledFilterMenuItem
          onClick={() => {
            handleClose();
            activeVacations();
          }}
        >
          Active Vacations
        </StyledFilterMenuItem>
        <StyledFilterMenuItem
          onClick={() => {
            handleClose();
            currentlyActiveVacations();
          }}
        >
          Currently Active Vacations
        </StyledFilterMenuItem>
        {user.registeredUser.role === "user" && (
          <StyledFilterMenuItem
            onClick={() => {
              handleClose();
              followedVacations();
            }}
          >
            Followed Vacations
          </StyledFilterMenuItem>
        )}
      </Menu>
    </div>
  );
}
