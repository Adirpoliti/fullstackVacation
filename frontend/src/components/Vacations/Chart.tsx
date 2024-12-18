import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { VacationType, VacationsType } from "../../types/VacationType";
import { getAllVacationsService } from "../../services/vacationServices/getVacations";
import { Box, Button, styled } from "@mui/material";
import { useAppSelector } from "../../App/hooks";
import { selectUser } from "../../App/features/usersSlice";
import { Navigate } from "react-router-dom";
import { createCsvService } from "../../services/vacationServices/createCsv";

const ChartContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#191919",
  marginTop: "100px",
  paddingTop: "150px",
});

const CSVBtn = styled(Button)({
  backgroundColor: "#292929",
  color: "#c0c0c0",
  marginBottom: "30px",
  width: "200px",
  height: "45px",
  borderRadius: "5px",
  fontFamily: "tripSans",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: "#29cedd",
    color: "black",
  },
});

export default function ChartsOverviewDemo() {
  const user = useAppSelector(selectUser);
  const [vacations, setVacations] = useState<VacationsType[]>([]);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const vacationsData = await getAllVacationsService(user.token);
        const betterVacations: VacationsType[] = vacationsData.map(
          (v: VacationType) => ({
            locationCountry: v.locationCountry,
            usersFollowed: v.usersFollowed,
          })
        );
        setVacations(betterVacations);
      } catch (error) {
        console.error("Error fetching vacations:", error);
      }
    };

    fetchVacations();
  }, [user.token]);

  const seriesData = vacations.map((country) => country.locationCountry);

  const followers = vacations.map((country) => country.usersFollowed.length);

  const updatedVacations = vacations.map((v) => ({
    locationCountry: v.locationCountry,
    usersFollowed: v.usersFollowed.length,
  }));

  const date = new Date();

  const sendToCsv = async () => {
    try {
      const currentDate = date.toLocaleString().split(" ").join("").replace(/[./:]/g, "_");
      console.log(currentDate);
      const response = await createCsvService(updatedVacations, currentDate, user.token);
      if (response.filePath) {
        fetch(`http://localhost:3001/api${response.filePath}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          link.href = url;
          link.setAttribute('download', `${currentDate}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
      }
    } catch (error) {
      console.error('Error in sendToCsv:', error);
    }
  };
  

  return (
    <ChartContainer>
      {user.registeredUser.role === "admin" ? (
        <>
          <CSVBtn onClick={() => sendToCsv()}>Download CSV</CSVBtn>
          <BarChart
            sx={{
              ".MuiChartsAxis-line": {
                stroke: "white !important",
              },
              ".MuiChartsAxis-tick": {
                stroke: "white !important",
              },
            }}
            xAxis={[
              {
                scaleType: "band",
                data: [...seriesData],
                colorMap: {
                  type: "piecewise",
                  thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                  colors: ["#29cedd"],
                },
                tickLabelStyle: {
                  angle: 45,
                  textAnchor: "start",
                  fontSize: 15,
                  fill: "white",
                },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: {
                  fontSize: 15,
                  fill: "white",
                },
              },
            ]}
            series={[{ data: [...followers] }]}
            width={1000}
            height={500}
          />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </ChartContainer>
  );
}
