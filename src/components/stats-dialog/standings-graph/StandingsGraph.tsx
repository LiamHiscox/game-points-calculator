import './StandingsGraph.scss';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer, Text, Legend, TooltipProps } from 'recharts';
import { ColorPlayerModel } from '../../../models/player.model';
import { PointsDataModel } from '../../../models/points-data.model';
import { FilteredPlayerModel } from '../../../models/filtered-player.model';
import { useEffect, useState } from 'react';

interface StandingsGraphProps {
    players: ColorPlayerModel[];
}

const CustomizedLabel = ({padding}: {padding: number}): JSX.Element => {
    return (
        <Text
            height={330}
            x={0}
            y={0}
            dx={-110 - padding}
            dy={20}
            textAnchor="start"
            transform="rotate(-90)"
        >
            Least To Most
        </Text>
    );
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>): JSX.Element | null => {
    if (active && payload && payload.length) {
      return (
        <div className="standing-graph-tooltip">
            {payload.sort((a, b) => b.value! - a.value!).map(p => (
                <div key={p.dataKey} className="label">
                    <div className="label-color" style={{backgroundColor: p.color}}/>
                    <span style={{color: p.color}}>{p.name}</span>
                </div>
            ))}
        </div>
      );
    }
  
    return null;
};

export function StandingsGraph({ players }: StandingsGraphProps): JSX.Element {
    const [data, setData] = useState<PointsDataModel[]>([]);
    const [maxRounds, setMaxRounds] = useState<number>(0);

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
                    .sort((a, b) => a.points - b.points)
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

        setData(data);
        setMaxRounds(maxRounds);
    }, [players]);

    const stepSize = 30;
    const heightSteps = 30;
    const height = (players.length * heightSteps) + 60;
    const width = maxRounds * stepSize > window.innerWidth * 0.75 ? maxRounds * stepSize : '100%';

    return (
        <ResponsiveContainer width={width} height={height} style={{overflow: 'hidden'}} className="select-none">
            <LineChart margin={{left: -30, top: 10, right: 10}} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis
                    label={<CustomizedLabel padding={players.length > 3 ? (players.length - 3) * 18 : 0}/>}
                    tick={false}
                    domain={[1, players.length]}/>
                <Legend/>
                <Tooltip
                    isAnimationActive={false}
                    content={<CustomTooltip />}
                />
                {players.map((player) => (
                    <Line type="monotone" dataKey={player.name} stroke={player.color} key={player.id} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}
