import './LineGraph.scss';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer, TooltipProps, Legend } from 'recharts';
import { ColorPlayerModel } from '../../../models/player.model';
import { PointsDataModel } from '../../../models/points-data.model';
import { FilteredPlayerModel } from '../../../models/filtered-player.model';
import { useEffect, useState } from 'react';

interface LineGraphProps {
    players: ColorPlayerModel[];
    accumalate?: boolean;
}

interface MinMaxPointsModel {
    min: number | null;
    max: number | null;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>): JSX.Element | null => {
    if (active && payload && payload.length) {
      return (
        <div className="line-graph-tooltip">
            {payload.sort((a, b) => b.value! - a.value!).map(p => (
                <div key={p.dataKey} className="label">
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <div className="label-color" style={{backgroundColor: p.color}}/>
                        <span style={{color: p.color}}>{p.name}: </span>
                    </span>
                    <span>&nbsp;</span>
                    <span>{p.value}</span>
                </div>
            ))}
        </div>
      );
    }
  
    return null;
};

export function LineGraph({ players, accumalate }: LineGraphProps): JSX.Element {
    const [data, setData] = useState<PointsDataModel[]>([]);
    const [maxRounds, setMaxRounds] = useState<number>(0);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);

    useEffect(() => {
        const newPlayers = players.map<FilteredPlayerModel>(player => {
            const points = player.points.reduce((acc: number[], cur) => {
                if (typeof cur.points !== 'number') {
                    return acc;
                }
                if (!accumalate || acc.length === 0) {
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

        const minMax = players.reduce((acc: MinMaxPointsModel, player) => {
            const points = player.points.reduce((total: number[], p) => typeof p.points === 'number' ? total.concat(p.points) : total, []);
            if (points.length === 0) {
                return acc;
            }
            const playerMin = points.reduce((min, cur) => cur < min ? cur : min, points[0]);
            const playerMax = points.reduce((max, cur) => cur > max ? cur : max, points[0]);
            const min = acc.min === null || playerMin < acc.min ? playerMin : acc.min;
            const max = acc.max === null || playerMax > acc.max ? playerMax : acc.max;
            return { min, max };
        }, {min: null, max: null});
    
        setMin(minMax.min || 0);
        setMax(minMax.max || 0);
        setData(data);
        setMaxRounds(maxRounds);
    }, [players]);

    const stepSize = 30;
    const height = window.innerHeight * 0.75 > 300 ? 300 : window.innerHeight * 0.75;
    const width = maxRounds * stepSize > window.innerWidth * 0.75 ? maxRounds * stepSize : '100%';

    return (
        <ResponsiveContainer width={width} height={height > 300 ? 300 : height} style={{overflow: 'hidden'}} className="select-none">
            <LineChart margin={{left: -30, top: 10, right: 10}} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis domain={[min, max]}/>
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
