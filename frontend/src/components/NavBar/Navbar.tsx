import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { Box, Link, styled } from '@mui/material'

const NavbarContainer = styled(Box)({
display: "flex",
justifyContent: "center",
alignItems: "center",
columnGap: "40px",
})

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
  "&:hover": {
    fontWeight: "bold",
  }
})

// const handleLogout = () => {
export const Navbar = () => {
    // const navigate = useNavigate()

    // const handleLogout = () => {
    //     navigate("/login")
    //     console.log("logged out")
    // }

  return (
    <NavbarContainer>
        <StyledLink href="">All Vacations</StyledLink>
        <StyledLink href="">New Vacation</StyledLink>
        <img src="/Assets/Images/Untitled-2.jpg" alt="logo" height={150}/>
        <StyledLink href="">Vacations Report</StyledLink>
        <StyledLink href="">Logout</StyledLink>
    </NavbarContainer>
  )
}
