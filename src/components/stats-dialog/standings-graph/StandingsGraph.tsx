import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Payload } from 'recharts/types/component/DefaultTooltipContent';
import { ColorPlayerModel } from '../../../models/player.model';
import { PointsDataModel } from '../../../models/points-data.model';
import { FilteredPlayerModel } from '../../../models/filtered-player.model';
import { useEffect, useState } from 'react';
import {useTranslation} from 'react-i18next';
import { useOrderState } from '../../../store/leaderboard.store';

interface StandingsGraphProps {
    players: ColorPlayerModel[];
}

export function StandingsGraph({ players }: StandingsGraphProps): JSX.Element {
    const [sortOrder] = useOrderState();
    const [data, setData] = useState<PointsDataModel[]>([]);
    const [maxRounds, setMaxRounds] = useState<number>(0);
    const [ticks, setTicks] = useState<number[]>([]);
    const {t} = useTranslation();

    useEffect(() => {
        const newPlayers = players.map<FilteredPlayerModel>(player => {
            const points = player.points.reduce((acc: number[], cur) => {
                if (typeof cur.points !== 'number') {
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
                const roundPoints = paddedPlayers
                    .reduce((acc: { name: string; points: number; }[], cur) => (acc.concat({ name: cur.name, points: cur.points[index] })), [])
                    .sort((a, b) => sortOrder === 'asc' ? a.points - b.points : b.points - a.points)
                    .map((player, pi, playerPoints) => {
                        let p = pi;
                        for (let i = pi; i >= 0; i--) {
                            if (player.points !== playerPoints[i].points) {
                                break;
                            }
                            p = i;
                        }
                        return {name: player.name, points: p + 1};
                    })
                    .reduce((acc: { [name: string]: number }, cur) => ({ ...acc, [cur.name]: cur.points }), {});
                return {
                    round: index + 1,
                    ...roundPoints
                };
            });

        const ticks = new Array(players.length)
            .fill(null)
            .map((_, i) => i+1);

        setTicks(ticks);
        setData(data);
        setMaxRounds(maxRounds);
    }, [players]);

    const stepSize = 30;
    const heightSteps = 40;
    const height = (players.length + 1) * heightSteps;
    const width = maxRounds * stepSize > window.innerWidth * 0.75 ? maxRounds * stepSize : '100%';

    return (
        <ResponsiveContainer width={width} height={height} className="select-none">
            <LineChart margin={{left: -30, top: 10, right: 10}} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis ticks={ticks}/ >
                <Tooltip
                    isAnimationActive={false}
                    labelFormatter={(label): string => `${t('stats.round')} ${label}`}
                    itemSorter={(item: Payload<number, string>): number => -(item.value || 0)}
                />
                {players.map((player) => (
                    <Line type="monotone" dataKey={player.name} stroke={player.color} key={player.id} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}
