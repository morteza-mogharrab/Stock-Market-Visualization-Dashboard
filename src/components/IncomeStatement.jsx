import React from 'react';
import { Card, CardContent, Grid, Skeleton } from '@mui/material';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function IncomeStatement({ quarterlyData, annualData, incomeStatementLoading }) {

    const chartDataQtr = {
        labels: quarterlyData.map((item) => moment(item.date).format('MMM YY')),
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: '#fabd05',
                hoverBackgroundColor: '#fabd05e0',
                data: quarterlyData.map((item) => item.revenue),
            },
            {
                label: 'Net Income',
                backgroundColor: '#4285f4',
                hoverBackgroundColor: '#2962ff',
                data: quarterlyData.map((item) => item.netIncome),
            },
        ],
    };

    const chartDataAnl = {
        labels: annualData.map((item) => moment(item.date).format('MMM YY')),
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: 'rgba(46, 134, 193 )',
                hoverBackgroundColor: 'rgba(46, 134, 193, .5)',
                data: annualData.map((item) => item.revenue),
            },
            {
                label: 'Net Income',
                backgroundColor: 'rgba(244, 208, 63)',
                hoverBackgroundColor: 'rgba(5244, 208, 63, 0.3)',
                data: annualData.map((item) => item.netIncome),
            },
        ],
    };

    const chartOptionsQtr = {
        scales: {
            y: {
                display: false,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Quarterly Income Statement',
                font: {
                    size: 18,
                }
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
    };

    const chartOptionsAnl = {
        scales: {
            y: {
                display: false,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Annual Income Statement',
                font: {
                    size: 18,
                }
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
    };


    if (incomeStatementLoading) {
        return (
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Skeleton variant="rectangular" width={'100%'} height={250} sx={{ mb: 3 }} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Skeleton variant="rectangular" width={'100%'} height={250} sx={{ mb: 3 }} />
                </Grid>
            </Grid>
        )
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',height: 300 }}>
                    <CardContent >
                        <Bar data={chartDataQtr} options={chartOptionsQtr} style={{ height: 250, width: '100%' }} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',height: 300 }}>
                    <CardContent>
                        <Bar data={chartDataAnl} options={chartOptionsAnl} style={{ height: 500, width: '100%' }} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}