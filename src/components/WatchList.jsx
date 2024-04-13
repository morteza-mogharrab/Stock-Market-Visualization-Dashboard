import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Skeleton, } from '@mui/material';
const columns = [
    {
        field: 'symbol', headerName: 'SYMBOL',
    },
    {
        field: 'price', headerName: 'PRICE', headerAlign: 'right', align: 'right', valueGetter: (params) => params?.toFixed(2) ?? 'N/A'
    },
    {
        field: 'change',
        headerName: 'CHG',
        headerAlign: 'right',
        align: 'right',
        renderCell: (params) => (
            <span style={{ color: parseFloat(params?.value) < 0 ? '#ff5252' : '#4caf50' }}>
                {params?.value?.toFixed(2) ?? 'N/A'}
            </span>
        )
    },
    {
        field: 'changesPercentage',
        headerName: 'CHG%',
        headerAlign: 'right',
        align: 'right',
        renderCell: (params) => (
            <span style={{ color: parseFloat(params?.value) < 0 ? '#ff5252' : '#4caf50' }}>
                {params?.value ? `${params?.value?.toFixed(2)}%` : 'N/A'}
            </span>
        )
    },

];


export default function WatchList({ watchlist, watchlistLoading }) {

    if (watchlistLoading) {
        return <Skeleton variant="rectangular" width={'100%'} height={400}  />
    }
    return (
        <Card style={{ width: '100%' }}>
            <CardContent>
                <DataGrid
                    rows={watchlist}
                    disableColumnSorting
                    disableColumnMenu
                    disableColumnResize
                    density='compact'
                    columns={columns}
                    getRowId={row => row?.symbol}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 7 },
                        },
                    }}
                    pageSizeOptions={[7]}
                />
            </CardContent>
        </Card>
    );
}