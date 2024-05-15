import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { VacationType, VacationsType } from '../../types/VacationType';
import { vacationService } from '../../services/getVacations';

export default function ChartsOverviewDemo() {
    const [vacations, setVacations] = useState<VacationsType[]>([]);

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                const vacationsData = await vacationService();
                const betterVacations: VacationsType[] = vacationsData.map((v: VacationType) => ({
                    locationCountry: v.locationCountry,
                    usersFollowed: v.usersFollowed
                }));
                setVacations(betterVacations);
                console.log(betterVacations)
            } catch (error) {
                console.error("Error fetching vacations:", error);
            }
        };

        fetchVacations();
    }, []);

    const seriesData = vacations.map(country => (
        country.locationCountry
    ));

    console.log(seriesData)

    const followers = vacations.map(country => (
        country.usersFollowed.length
    ));

    console.log(followers)



    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: [...seriesData], colorMap: { type: "piecewise",  thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],  colors: ['#29cedd'], } }]}
            series={[{ data: [...followers] }]}
            width={1000}
            height={600}
        />
    );
}
