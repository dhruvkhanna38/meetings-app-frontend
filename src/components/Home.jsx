import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {isLoggedIn, logout} from "../services/auth.js"
import {getProfile} from "../services/meetings.js";

const logoutFunction = async ()=>{
    try{
        await logout();
        this.props.history.push("/");
    }catch(error){
        console.log("Error Logging Out");
    }
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {!isLoggedIn?
      <List>
          <ListItem button  component={Link} to="/login">
            <ListItemIcon><VpnKeyIcon color="primary"/></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button  component={Link} to="/signup">
            <ListItemIcon><LockOpenIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Signup" />
          </ListItem>
      </List>:''}
      <Divider />
      {isLoggedIn?
      <List>
        <ListItem button  component={Link} to="/Calender">
            <ListItemIcon><EventNoteIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Calender" />
        </ListItem>
        <ListItem button  component={Link} to="/meetings">
            <ListItemIcon><MeetingRoomIcon color="primary"/></ListItemIcon>
            <ListItemText primary="Meetings" />
        </ListItem>
        <ListItem button  component={Link} onClick={logoutFunction}>
            <ListItemIcon><ExitToAppIcon color="primary"/></ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>
        <ListItem button  component={Link} to="/profile">
            <ListItemIcon><PersonIcon color="primary"/></ListItemIcon>
            <ListItemText secondary={localStorage.getItem("email")} />
        </ListItem>
      </List>:''}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
    
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h2">
          Calendar App to Manage Meetings
          </Typography>
          
          
         
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
    <Tab label="Problem Overview" {...a11yProps(0)} />
    <Tab label="Key Objective" {...a11yProps(1)} />
    <Tab label="Main Goal" {...a11yProps(2)} />
  </Tabs>
      </AppBar>
        
        
        <TabPanel value={value} index={0}>
        <ListItem button>
        <ListItemIcon>
          <FiberManualRecordIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="When you have a busy meeting schedule in different cities, it can be challenging to keep up with showing up to the right places at the right time.
" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FiberManualRecordIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="With a full schedule and always on the go, the user finds it difficult to manage and create new meetings on the calendar." />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FiberManualRecordIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="The design challenge is a calendar flow and interface that is smart enough to suggest meeting times and is proactively working for the user to make sure they are always on time for their meetings." />
      </ListItem>
        
</TabPanel>
<TabPanel value={value} index={1}>
<ListItem button>
        <ListItemIcon>
          <FiberManualRecordIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Create a calendar planning app that can be processed at a glance." />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FiberManualRecordIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="The user will be able to create events/meeting and be able to account for travel in a few easy steps. " />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FiberManualRecordIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="User will be able to  join and create teams and organize group meetings." />
      </ListItem>
</TabPanel>
<TabPanel value={value} index={2}>
<ListItem button>
        <ListItemIcon>
          <FiberManualRecordIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="By having an Assistance that manages, tracks and untangles your day,
You’re not saving seconds but millions.
" />
      </ListItem>
     
</TabPanel>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;