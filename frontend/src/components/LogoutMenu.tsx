import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { clearUser, selectUser } from "../App/features/usersSlice";
import { styled } from "@mui/material";
import { Logout } from "@mui/icons-material";

const StyledLogoutBtn = styled(Button)({
  textTransform: "none",
  color: "white",
  fontFamily: "tripSans",
  fontSize: "16px",
  "&:hover": {
    fontWeight: "bold",
    backgroundColor: "#191919",
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontFamily: "tripSans",
  fontSize: "15px",
  textAlign: "center",
  width: "100%",
  backgroundColor: "#292929",
  color: "white",
});

export default function LogoutMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const prettyName =
    user.registeredUser.firstName.charAt(0).toUpperCase() +
    user.registeredUser.firstName.substring(1).toLowerCase();

  return (
    <div>
      <StyledLogoutBtn onClick={handleClick}>{prettyName}</StyledLogoutBtn>
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
        <StyledMenuItem onClick={handleLogout}>
          <Logout fontSize="small" style={{ marginRight: "8px" }} />
          Logout
        </StyledMenuItem>
      </Menu>
    </div>
  );
}
