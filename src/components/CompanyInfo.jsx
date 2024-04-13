import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, List, ListItem, Skeleton } from '@mui/material';


export default function CompanyInfo({ companyInfo, companyInfoLoading }) {

    const convertToMillionBillionTrillion = (value) => {
        if (value >= 1000000 && value < 1000000000) {
            return (value / 1000000).toFixed(2) + "M";
        } else if (value >= 1000000000 && value < 1000000000000) {
            return (value / 1000000000).toFixed(2) + "B";
        } else if (value >= 1000000000000) {
            return (value / 1000000000000).toFixed(2) + "T";
        } else {
            return value.toFixed(2);
        }
    }

    if (companyInfoLoading) {
        return <Skeleton variant="rectangular" width={'100%'} height={200} sx={{ mb: 1 }} />
    }

    return (
        <Card sx={{ width: '100%', mb: 1 }} >
            <CardContent>


                <Typography variant='h6' color="text.secondary">
                    {companyInfo?.companyName}  <Typography variant="overline" color="text.secondary">({companyInfo?.symbol})</Typography>
                </Typography>
                <Typography variant="overline" color="text.secondary">
                    INDUSTRY : {companyInfo?.industry}
                </Typography>
                <List dense={false}>

                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'> {convertToMillionBillionTrillion(companyInfo?.volAvg)}  {companyInfo?.currency}</Typography>
                        }
                    >
                        <Typography variant='overline'>AVG VOLUME</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'>   {companyInfo?.range}</Typography>
                        }
                    >
                        <Typography variant='overline'>Range</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'> {convertToMillionBillionTrillion(companyInfo?.mktCap)} {companyInfo?.currency}</Typography>
                        }
                    >
                        <Typography variant='overline'>MARKET CAP</Typography>
                    </ListItem>
                    <Divider />
                     
                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'> {companyInfo?.lastDiv}</Typography>
                        }
                    >
                        <Typography variant='overline'>LAST DIVIDEND</Typography>
                    </ListItem> 
                    <Divider />
                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'> {companyInfo?.exchange}</Typography>
                        }
                    >
                        <Typography variant='overline'>EXCHANGE</Typography>
                    </ListItem>
                    <Divider />
                </List>
            </CardContent>

        </Card>
    );
}

// {
//     "address": "1 Apple Park Way",
//     "address2": null,
//     "ceo": "Timothy Cook",
//     "city": "Cupertino",
//     "companyName": "Apple Inc",
//     "country": "United States",
//     "date": "2024-03-25",
//     "employees": 164000,
//     "exchange": "NASDAQ",
//     "exchangeCode": null,
//     "industry": "Electronic Computer Manufacturing ",
//     "issuetype": "cs",
//     "longDescription": "Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the worlds largest technology company by revenue, with US$394.3 billion in 2022 revenue. As of March 2023, Apple is the worlds biggest company by market capitalization.",
//     "marketcap": null,
//     "phone": "14089961010",
//     "primarySicCode": "3571",
//     "sector": "Manufacturing",
//     "securityName": null,
//     "securityType": "cs",
//     "shortDescription": "Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the worlds largest technology company by revenue, with US$394.3 billion in 2022 revenue. As of March 2023, Apple is the worlds biggest company by market capitalization.",
//     "state": "California",
//     "symbol": "AAPL",
//     "website": "https://www.apple.com/",
//     "zip": "95014-0642",
//     "id": "COMPANY_HISTORICAL",
//     "key": "AAPL",
//     "subkey": "",
//     "updated": 1711332621309.512
//     }