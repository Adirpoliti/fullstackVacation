import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { vacationService } from '../../../services/getVacations';
import { VacationType, VacationsType } from '../../../types/VacationType';

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
            xAxis={[{ scaleType: 'band', data: [...seriesData] }]}
            series={[{ data: [...followers] }]}
            width={1000}
            height={600}
        />
    );
}
