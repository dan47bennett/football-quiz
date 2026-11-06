'use client';
import 'react';
import { ObjectId } from 'mongodb';
import { useEffect } from 'react';
import { useState } from 'react';

interface SeasonStats {
    goalDifference: string;
    goalsAgainst: string;
    goalsFor: string;
    season: string;
    team: ObjectId;
}

function Seasons({ endpoint }: { endpoint: string }) {
    const [seasons, setSeasons] = useState<SeasonStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSeasons() {
            try {
                const response = await fetch(endpoint);
                console.log('response: ', response);
                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    console.log(message);
                    return;
                }
                const seasons = await response.json();
                console.log('seasons: ', seasons);
                setSeasons(seasons);
            } catch (error) {
                console.log('Error fetching seasons:', error);
            } finally {
                setLoading(false);
            }
        }
        getSeasons();
    }, [endpoint]);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <>
            {seasons.map((season) => (
                <div key={season.season}>
                    <h3>{season.season}</h3>
                    <p>Goal Difference: {season.goalDifference}</p>
                    <p>Goals For: {season.goalsFor}</p>
                    <p>Goals Against: {season.goalsAgainst}</p>
                </div>
            ))}
        </>
    );
}

export default Seasons;
