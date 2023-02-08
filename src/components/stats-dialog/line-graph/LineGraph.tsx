import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Payload } from 'recharts/types/component/DefaultTooltipContent';
import { PlayerModel } from "../../../models/player.model";
import { PointsDataModel } from "../../../models/points-data.model";
import { FilteredPlayerModel } from "../../../models/filtered-player.model";
import { useEffect, useState } from "react";

interface LineGraphProps {
    players: PlayerModel[];
    colors: string[];
}

export function LineGraph({ players, colors }: LineGraphProps) {
    const [data, setData] = useState<PointsDataModel[]>([]);
    const [maxRounds, setMaxRounds] = useState<number>(0);

    useEffect(() => {
        const newPlayers = players.map<FilteredPlayerModel>(player => {
            const points = player.points.reduce((acc: number[], cur) => {
                if (typeof cur?.points !== 'number') {
                    return acc;
                }
                if (acc.length === 0) {
                    return acc.concat(cur.points);
                }
                const lastSum = acc[acc.length - 1];
                return acc.concat(cur.points + lastSum);
            }, []);
            return { ...player, points };
        });

        const maxRounds = newPlayers.reduce((max, cur) => cur.points.length > max ? cur.points.length : max, 0);

        const paddedPlayers = newPlayers.map(player => {
            const length = player.points.length;
            if (length < maxRounds) {
                const diff = maxRounds - length;
                const lastPoints = length > 0 ? player.points[length - 1] : 0;
                const diffArray = new Array(diff).fill(lastPoints);
                const padded = player.points.concat(...diffArray);
                return { ...player, points: padded };
            }
            return player;
        });

        const data = new Array(maxRounds)
            .fill(null)
            .map<PointsDataModel>((_, index) => {
                const playerPoints = paddedPlayers.reduce((acc: { [name: string]: number }, cur) => ({ ...acc, [cur.name]: cur.points[index] }), {});
                return {
                    round: index + 1,
                    ...playerPoints
                };
            });

        setData(data);
        setMaxRounds(maxRounds);
    }, [players]);

    const stepSize = 30;
    const height = window.innerHeight * 0.75 > 300 ? 300 : window.innerHeight * 0.75;
    const width = maxRounds * stepSize > window.innerWidth * 0.75 ? maxRounds * stepSize : "100%";

    return (
        <ResponsiveContainer width={width} height={height > 300 ? 300 : height}>
            <LineChart margin={{left: -30}} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" label="Round" />
                <YAxis />
                <Tooltip
                    isAnimationActive={false}
                    labelFormatter={(label) => `Round ${label}`}
                    itemSorter={(item: Payload<number, string>) => -(item.value || 0)}
                />
                {players.map((player, i) => (
                    <Line type="monotone" dataKey={player.name} stroke={colors[i]} key={player.id} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}