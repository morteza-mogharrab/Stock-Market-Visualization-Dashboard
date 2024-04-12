import { Box, Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Skeleton, Stack, useTheme } from '@mui/material'
import React from 'react'
import Plot from 'react-plotly.js';



export default function Graph({ data, setrange, range, graphLoading }) {
    const theme = useTheme();
    const backgroundColor = theme.palette.background.default;

    const timestamps = data.map(entry => entry.date);
    const openPrices = data.map(entry => entry.open);
    const highPrices = data.map(entry => entry.high);
    const lowPrices = data.map(entry => entry.low);
    const closePrices = data.map(entry => entry.close);

  

  

    const layout = {
        plot_bgcolor: backgroundColor,
        paper_bgcolor: backgroundColor,
    };

    const handleChange = (e) => {
        setrange(e.target.value)
    }

    if (graphLoading) {
        return <Skeleton variant="rectangular" width={'100%'} height={'50vh'}  />
    }

    return (
        <Card>
            <CardContent sx={{ height: '50vh' }}>
                <Box  height={'95%'}>
                    <Plot

                        data={[
                            {
                                x: timestamps,
                                y: openPrices,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'Open',
                                marker: { color: 'blue' },
                            },
                            {
                                x: timestamps,
                                y: highPrices,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'High',
                                marker: { color: 'green' },
                            },
                            {
                                x: timestamps,
                                y: lowPrices,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'Low',
                                marker: { color: 'red' },
                            },
                            {
                                x: timestamps,
                                y: closePrices,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'Close',
                                marker: { color: 'yellow' },

                            },
                        ]}
                        layout={layout}
                        style={{ width: '100%', height: '100%' }} />
                </Box>         
                <Box height={'10%'}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChange}
                        value={range}
                    >
                        <FormControlLabel value="5d" control={<Radio />} label="5D" />
                        <FormControlLabel value="1m" control={<Radio />} label="1M" />
                        <FormControlLabel value="3m" control={<Radio />} label="3M" />
                        <FormControlLabel value="6m" control={<Radio />} label="6M" />
                        <FormControlLabel value="1y" control={<Radio />} label="1Y" />
                        <FormControlLabel value="5y" control={<Radio />} label="5Y" />

                    </RadioGroup>
                </Box>
            </CardContent>
        </Card>
    )
}
