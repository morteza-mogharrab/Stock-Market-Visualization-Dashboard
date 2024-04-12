import { Box, CssBaseline, Grid, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DrawerHeader, Main, darkTheme } from '../misc/utils'
import axios from 'axios';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Graph from '../components/Graph';
import WatchList from '../components/WatchList';
import CompanyInfo from '../components/CompanyInfo';
import IncomeStatement from '../components/IncomeStatement';

export default function App() {
  const [open, setOpen] = useState(false);
  const [companyList, setcompanyList] = useState([])
  const [selectedSymbol, setselectedSymbol] = useState('aapl')
  const [selectedCompany, setselectedCompany] = useState(null)
  const [range, setrange] = useState('1y')
  const [data, setData] = useState([]);
  const [quarterlyData, setquarterlyData] = useState([])
  const [annualData, setannualData] = useState([])
  const [watchlist, setwatchlist] = useState([])



  const [companyInfoLoading, setcompanyInfoLoading] = useState(true)
  const [watchlistLoading, setwatchlistLoading] = useState(false)
  const [graphLoading, setgraphLoading] = useState(true)
  const [companyListLoading, setcompanyListLoading] = useState(true)
  const [incomeStatementLoading, setincomeStatementLoading] = useState(true)

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    fetchData()
    fetchIncomeStatement()
    fetchCompanyInfo();
  }, [selectedSymbol]);

  useEffect(() => {
    if (selectedCompany) {
      fetchData();
    }
  }, [range]);

  useEffect(() => {
    if (companyList?.length > 0) {
      fetchWatchList()
    } 
  }, [companyList]);

  const fetchCompanies = async () => {
    try {
      setcompanyListLoading(true);
      const response = await axios.get(
        `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=${import.meta.env.VITE_TOKEN}`
      );
      setcompanyList(response?.data);
      setcompanyListLoading(false)
      if(response?.data?.length === 0){
          fetchWatchList('aapl')
      }
    } catch (error) {
      setcompanyListLoading(false)
      console.error('Error fetching data: ', error);
    }
  }


  const fetchCompanyInfo = async () => {
    try {
      setcompanyInfoLoading(true);
      const response = await axios.get(
        `https://api.iex.cloud/v1/data/core/quote/${selectedSymbol}?token=${import.meta.env.VITE_TOKEN}`
      );
      setselectedCompany(response?.data?.[0])
      setcompanyInfoLoading(false)

    } catch (error) {
      setcompanyInfoLoading(false)
      console.error('Error fetching data: ', error);
    }

  }

  const fetchData = async () => {
    try {
      setgraphLoading(true);
      const response = await axios.get(
        `https://api.iex.cloud/v1/data/core/historical_prices/${selectedSymbol}?range=${range}&token=${import.meta.env.VITE_TOKEN}&sort=ASC`
      );

      setData(response?.data)
      setgraphLoading(false)

    } catch (error) {
      setgraphLoading(false)
      console.error('Error fetching data: ', error);
    }
  }


  const fetchIncomeStatement = async () => {
    try {
      setincomeStatementLoading(true)
      const responseQtr = await axios.get(
        `https://api.iex.cloud/v1/data/core/income/${selectedSymbol}/quarterly?last=4&token=${import.meta.env.VITE_TOKEN}`
      );
      setquarterlyData(responseQtr?.data)
      const responseAnl = await axios.get(
        `https://api.iex.cloud/v1/data/core/income/${selectedSymbol}/annual?last=4&token=${import.meta.env.VITE_TOKEN}`
      );
      setannualData(responseAnl?.data)
      setincomeStatementLoading(false)
    } catch (error) {
      console.error('Error fetching data: ', error);

    }
  }

  const fetchWatchList = async (param=null) => {
    try {
      setwatchlistLoading(true)
      const symbolsString = !param ? companyList.map(item => item.symbol).join(',') : 'AAPL,GOOGL,MSFT,TSLA,T,JPM';
      const response = await axios.get(
        `https://api.iex.cloud/v1/data/core/quote/${symbolsString}?token=${import.meta.env.VITE_TOKEN}`
      );
      if (response?.data) {
        setwatchlist(response.data);
        if(param){
          setcompanyList(response?.data)
        }
        setwatchlistLoading(false)
      } else {
        setwatchlistLoading(false)

      }
    } catch (error) {
      setwatchlistLoading(false)
      console.error('Error fetching data: ', error);
    }
  };



  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header setOpen={setOpen} open={open} selectedCompany={selectedCompany} companyInfoLoading={companyInfoLoading} companyList={companyList} />
        <SideMenu setOpen={setOpen} open={open} companyList={companyList} selectedCompany={selectedCompany} setselectedSymbol={setselectedSymbol} companyListLoading={companyListLoading} />
        <Main open={open} >
          <DrawerHeader />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              {data && <Graph data={data} setrange={setrange} range={range} graphLoading={graphLoading} />}
              <IncomeStatement quarterlyData={quarterlyData} annualData={annualData} incomeStatementLoading={incomeStatementLoading} />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <CompanyInfo companyInfo={selectedCompany} companyInfoLoading={companyInfoLoading} />
              <WatchList watchlist={watchlist} watchlistLoading={watchlistLoading} />
            </Grid>
          </Grid>
        </Main>

      </Box>
    </ThemeProvider>
  )
}
