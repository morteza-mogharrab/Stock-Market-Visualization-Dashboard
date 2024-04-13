import React from 'react'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Drawer, List, Skeleton, useTheme } from '@mui/material';
import { DrawerHeader, drawerWidth, getFullForm } from '../misc/utils';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '../hooks/useDebounce';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        marginTop: 5,
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));



export default function SideMenu({ open, setOpen, companyList, setselectedSymbol, selectedSymbol, handleChange }) {
    const theme = useTheme();

    const handleDrawerClose = () => {
        setOpen(false);
    };

   
    

    const generateSkeleton = () => {
        let skeletons = [];
        for (let a = 0; a < 10; a++) {
            skeletons.push(
                <Skeleton key={a} variant="rectangular" width={'90%'} height={50} sx={{ mt: 3 }} />
            );
        }
        return <>{skeletons}</>;
    }

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    // value={searchedCompany}
                    onChange={e=>handleChange(e)}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <List >
                {companyList.map((text, index) => (
                    <ListItem dense={true} key={index} disablePadding sx={{
                        bgcolor: selectedSymbol
                            === text
                            && theme.palette.action.selected
                    }}>
                        <ListItemButton onClick={() => { setOpen(false); setselectedSymbol(text?.symbol) }}>
                            <ListItemText primary={text?.name} secondary={text?.exchangeShortName}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
