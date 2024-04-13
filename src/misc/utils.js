import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material";

export const drawerWidth = 280;

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "RobotoBold, Arial",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'RobotoBold';
        }
        `,
    },
  },
});

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export function getDateRange(duration) {
  const durationPattern = /^(\d+)([DdWwMmYy])$/;
  const match = duration.match(durationPattern);

  if (!match) {
    throw new Error(
      'Invalid duration format. Use a format like "5D" for 5 days.'
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  const today = new Date();
  
  const startDate = new Date(today);

  switch (unit) {
    case "d":
      startDate.setDate(today.getDate() - value);
      break;
    case "w":
      startDate.setDate(today.getDate() - value * 7);
      break;
    case "m":
      startDate.setMonth(today.getMonth() - value);
      break;
    case "y":
      startDate.setFullYear(today.getFullYear() - value);
      break;
    default:
      throw new Error("Invalid duration unit. Use one of D, W, M, or Y.");
  }

  const startDateString = startDate.toISOString().split("T")[0];
  const todayString = today.toISOString().split("T")[0];

  return { from: startDateString, to: todayString };
}

export const getFullForm = abbreviation => {
  switch (abbreviation) {
      case 'AAPL':
          return 'Apple Inc.';
      case 'GOOGL':
          return 'Alphabet Inc.';
      case 'MSFT':
          return 'Microsoft Corporation';
      case 'TSLA':
          return 'Tesla, Inc.';
      case 'T':
          return 'AT&T Inc.';
      case 'JPM':
          return 'JPMorgan Chase & Co.';
          case 'META':
          return 'Meta Platforms, Inc. (formerly Facebook, Inc.)';
      default:
          return 'Unknown abbreviation';
  }
};
