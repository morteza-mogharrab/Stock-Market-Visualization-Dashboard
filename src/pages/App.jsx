import { Alert, Box, CssBaseline, Grid, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DrawerHeader, Main, darkTheme, getDateRange } from '../misc/utils'
import axios from 'axios';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Graph from '../components/Graph';
import WatchList from '../components/WatchList';
import CompanyInfo from '../components/CompanyInfo';
import IncomeStatement from '../components/IncomeStatement';
import useDebounce from '../hooks/useDebounce';
import FinancialScore from '../components/FinancialScore';

export default function App() {
  const [open, setOpen] = useState(false);
  const [searchedCompany, setsearchedCompany] = useState('')
  const [companyList, setcompanyList] = useState([])
  const [selectedSymbol, setselectedSymbol] = useState('aapl')
  const [selectedCompany, setselectedCompany] = useState(null)
  const [range, setrange] = useState('1y')
  const [data, setData] = useState([]);
  const [quarterlyData, setquarterlyData] = useState([])
  const [annualData, setannualData] = useState([])
  const [watchlist, setwatchlist] = useState([])
  const [financialScoreData, setfinancialScoreData] = useState(null)




  const [companyInfoLoading, setcompanyInfoLoading] = useState(true)
  const [watchlistLoading, setwatchlistLoading] = useState(false)
  const [graphLoading, setgraphLoading] = useState(true)
  const [companyListLoading, setcompanyListLoading] = useState(true)
  const [incomeStatementLoading, setincomeStatementLoading] = useState(true)
  const [financialScoreLoading, setfinancialScoreLoading] = useState(true)


  const from = getDateRange(range)?.from;
  const to = getDateRange(range)?.to;

  useEffect(() => {
    fetchCompanies();
  }, [searchedCompany]);

  useEffect(() => {
    fetchData()
    fetchIncomeStatement()
    fetchCompanyInfo();
    fetchFinancialScore()
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
      let response;

      if (searchedCompany?.trim()?.length === 0) {
        response = await axios.get(
          `https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&apikey=${import.meta.env.VITE_TOKEN}`
        );
      } else {
        response = await axios.get(
          `https://financialmodelingprep.com/api/v3/search?query=${searchedCompany}&limit=10&apikey=${import.meta.env.VITE_TOKEN}`
        );
      }


      setcompanyList(response?.data);
      setcompanyListLoading(false)
      if (response?.data?.length === 0) {
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
        `https://financialmodelingprep.com/api/v3/profile/${selectedSymbol}?apikey=${import.meta.env.VITE_TOKEN}`
      );
      setselectedCompany(response?.data?.[0])
      setcompanyInfoLoading(false)

    } catch (error) {
      setcompanyInfoLoading(false)
      console.error('Error fetching data: ', error);
    }

  }

  const fetchFinancialScore = async () => {
    try {
      setfinancialScoreLoading(true);
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v4/score?symbol=${selectedSymbol?.toUpperCase()}&apikey=${import.meta.env.VITE_TOKEN}`
      );
      setfinancialScoreData(response?.data?.[0])
      setfinancialScoreLoading(false)

    } catch (error) {
      setfinancialScoreLoading(false)
      console.error('Error fetching data: ', error);
    }

  }

  

  const fetchData = async () => {
    try {
      setgraphLoading(true);
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${selectedSymbol}?from=${from}&to=${to}&apikey=${import.meta.env.VITE_TOKEN}`
      );

      setData(response?.data?.historical)
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
        `https://financialmodelingprep.com/api/v3/income-statement/${selectedSymbol}?period=quarter&limit=6&apikey=${import.meta.env.VITE_TOKEN}`
      );
      setquarterlyData(responseQtr?.data)
      const responseAnl = await axios.get(
        `https://financialmodelingprep.com/api/v3/income-statement/${selectedSymbol}?period=annual&limit=6&apikey=${import.meta.env.VITE_TOKEN}`
      );
      setannualData(responseAnl?.data)
      setincomeStatementLoading(false)
    } catch (error) {
      console.error('Error fetching data: ', error);

    }
  }

  const fetchWatchList = async (param = null) => {
    try {
      setwatchlistLoading(true)
      const symbolsString = !param ? companyList.map(item => item.symbol).join(',') : 'AAPL,GOOGL,MSFT,TSLA,T,JPM';
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=${import.meta.env.VITE_TOKEN}`
      );
      if (response?.data) {
        setwatchlist(response.data);
        if (param) {
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

  const doSearch = useDebounce((term) => {
    setsearchedCompany(term)
  }, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    doSearch(value);
  }



  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header setOpen={setOpen} open={open} selectedCompany={selectedCompany} companyInfoLoading={companyInfoLoading} companyList={companyList} />
        <SideMenu setOpen={setOpen} open={open} handleChange={handleChange} searchedCompany={searchedCompany} companyList={companyList} selectedCompany={selectedCompany} setselectedSymbol={setselectedSymbol} companyListLoading={companyListLoading} />
        <Main open={open} >
          <DrawerHeader />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              {data && <Graph data={data} setrange={setrange} range={range} graphLoading={graphLoading} />}

              <Grid container mt={1} spacing={2}>
                <Grid item xs={12} md={6} lg={9}>
                  {quarterlyData?.length > 0 || annualData?.length > 0 ? (
                    <IncomeStatement quarterlyData={quarterlyData} annualData={annualData} incomeStatementLoading={incomeStatementLoading} />
                  ) : (<Box sx={{ height: 200, mt: 5, display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Alert severity="error" >No income statement found!!!</Alert>
                  </Box>)}
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <FinancialScore financialScoreData={financialScoreData} financialScoreLoading={financialScoreLoading}/>
               
                </Grid>
              </Grid>

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