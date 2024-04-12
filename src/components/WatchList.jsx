import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent,  Skeleton,  } from '@mui/material';
const columns = [
    {
        field: 'symbol', headerName: 'SYMBOL',
    },
    {
        field: 'latestPrice', headerName: 'LAST', headerAlign: 'right', align: 'right', valueGetter: (params) => params?.toFixed(2)
    },
    {
        field: 'change',
        headerName: 'CHG',
        headerAlign: 'right',
        align: 'right',
        renderCell: (params) => (
            <span style={{ color: parseFloat(params?.value) < 0 ? '#ff5252' : '#4caf50' }}>
                {params?.value?.toFixed(2)}
            </span>
        )
    },
    {
        field: 'changePercent',
        headerName: 'CHG%',
        headerAlign: 'right',
        align: 'right',
        renderCell: (params) => (
            <span style={{ color: parseFloat(params?.value) < 0 ? '#ff5252' : '#4caf50' }}>
                {params?.value?.toFixed(2)}%
            </span>
        )
    },

];


export default function WatchList({ watchlist,watchlistLoading }) {

    if(watchlistLoading){
        return <Skeleton variant="rectangular" width={'100%'} height={550} sx={{mb:3}}/>
    }
    return (
        <Card style={{ width: '100%' }}>
            <CardContent>
                <DataGrid
                    rows={watchlist}
                    columns={columns}
                    getRowId={row => row?.symbol}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5]}
                />    
            </CardContent>
        </Card>
    );
}