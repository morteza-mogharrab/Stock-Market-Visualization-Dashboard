import React from 'react'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Drawer, List, Skeleton, useTheme } from '@mui/material';
import { DrawerHeader, drawerWidth } from '../misc/utils';

export default function SideMenu({ open, setOpen, companyList, setselectedSymbol, selectedCompany, companyListLoading }) {
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
            {companyListLoading ? (<>
                {generateSkeleton()}
            </>) : (<List >
                {companyList.map((text, index) => (
                    <ListItem key={index} disablePadding sx={{
                        bgcolor: selectedCompany?.symbol
                            === text?.symbol
                            && theme.palette.action.selected
                    }}>
                        <ListItemButton onClick={() => { setOpen(false); setselectedSymbol(text?.symbol) }}>
                            <ListItemText primary={text?.companyName} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>)}
        </Drawer>
    )
}
