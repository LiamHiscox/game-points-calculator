import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { PlayerModel } from '../../../models/player.model';
import {useTranslation} from 'react-i18next';

interface MinMaxPointsModel {
    name: string;
    min: number;
    max: number;
}

interface MinMaxTableProps {
    players: PlayerModel[];
}

export function MinMaxTable({ players }: MinMaxTableProps): JSX.Element {
    const [minMaxData, setMinMaxData] = useState<MinMaxPointsModel[]>([]);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);
    const {t} = useTranslation();

    useEffect(() => {
        const minMax = players.reduce((acc: MinMaxPointsModel[], player) => {
            const points = player.points.reduce((total: number[], p) => typeof p?.points === 'number' ? total.concat(p?.points) : total, []);
            const min = points.reduce((min, cur) => cur < min ? cur : min, points[0] || 0);
            const max = points.reduce((max, cur) => cur > max ? cur : max, points[0] || 0);
            return acc.concat({ name: player.name, min, max });
        }, []);
        const min = minMax.reduce((min, cur) => cur.min < min ? cur.min : min, minMax[0]?.min || 0);
        const max = minMax.reduce((max, cur) => cur.max > max ? cur.max : max, minMax[0]?.max || 0);

        setMin(min);
        setMax(max);
        setMinMaxData(minMax);
    }, [players]);

    return (
        <Table size="small" className="select-none">
            <TableHead>
                <TableRow>
                    <TableCell />
                    {minMaxData.map((minMax, pi) => (
                        <TableCell key={pi}>{minMax.name}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>{t('stats.max')}</TableCell>
                    {minMaxData.map((minMax, pi) => (
                        <TableCell key={pi} component="th" scope="row">
                            {minMax.max === max ? <strong>{minMax.max}</strong> : minMax.max}
                        </TableCell>
                    ))}
                </TableRow>
                <TableRow>
                    <TableCell>{t('stats.min')}</TableCell>
                    {minMaxData.map((minMax, pi) => (
                        <TableCell key={pi} component="th" scope="row">
                            {minMax.min === min ? <strong>{minMax.min}</strong> : minMax.min}
                        </TableCell>
                    ))}
                </TableRow>
            </TableBody>
        </Table>
    );
}
