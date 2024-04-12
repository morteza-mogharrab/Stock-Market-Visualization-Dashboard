import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, List, ListItem, Skeleton } from '@mui/material';


export default function CompanyInfo({ companyInfo, companyInfoLoading }) {

    const convertToMillionBillionTrillion = (value)=> {
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
        return <Skeleton variant="rectangular" width={'100%'} height={200} sx={{ mb: 3 }} />
    }

    return (
        <Card sx={{ width: '100%', mb: 3 }} >
            <CardContent>
              
          
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {companyInfo?.address} {companyInfo?.address2} {companyInfo?.city} {companyInfo?.country}
                </Typography>
                <Typography variant="body2">
                    {companyInfo?.industry}
                </Typography> */}
                <List dense={false}>
                
                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'> {convertToMillionBillionTrillion(companyInfo?.avgTotalVolume)}  {companyInfo?.currency}</Typography>
                        }
                    >
                        <Typography variant='overline'>AVG VOLUME</Typography>
                    </ListItem>
                    <Divider />
                    <Divider />
                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'> {companyInfo?.previousClose?.toFixed(2)}  {companyInfo?.currency}</Typography>
                        }
                    >
                        <Typography variant='overline'>PREVIOUS CLOSE</Typography>
                    </ListItem>
                    <Divider />
                    <Divider />
                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'> {convertToMillionBillionTrillion(companyInfo?.marketCap)} {companyInfo?.currency}</Typography>
                        }
                    >
                        <Typography variant='overline'>MARKET CAP</Typography>
                    </ListItem>
                    <Divider />
           
                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'> {companyInfo?.peRatio}</Typography>
                        }
                    >
                        <Typography variant='overline'>P/E RATIO</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem
                        secondaryAction={
                            <Typography variant='subtitle2'> {companyInfo?.primaryExchange}</Typography>
                        }
                    >
                        <Typography variant='overline'>PRIMARY EXCHANGE</Typography>
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