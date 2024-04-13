import { Card, CardContent, Grid, Skeleton } from '@mui/material'
import React from 'react'
import PieChart from './PieChart';

export default function FinancialScore({ financialScoreData, financialScoreLoading }) {

    if (financialScoreLoading) {
        return <Skeleton variant="rectangular" width={'100%'} height={250} />
    }

    return (
        <Card>
            <CardContent >
            <PieChart data={financialScoreData} />
            </CardContent>
        </Card>
    )
}
