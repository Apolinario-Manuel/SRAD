/* eslint-disable */
import React, { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../../../views/login/hooks/context';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  Clipboard as ClipboardIcon,
  Users as UsersIcon,
  List as ListIcon,
  User as UserIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_3.png',
  jobTitle: 'Júri - Presidente',
  name: 'Apolinário Manuel'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    type: 'All'
  },
  {
    href: '/app/doencas',
    icon: ShoppingBagIcon,
    title: 'Doenças',
    type: 'Admin'
  },
  {
    href: '/app/casos',
    icon: ClipboardIcon,
    title: 'Gerir Casos',
    type: 'DM'
  },
  {
    href: '/app/casos',
    icon: ShoppingBagIcon,
    title: 'Casos',
    type: 'DP'
  },
  {
    href: '/app/categorias',
    icon: ClipboardIcon,
    title: 'Analisar Casos',
    type: 'DP'
  },
  {
    href: '/app/blog',
    icon: ClipboardIcon,
    title: 'Blog',
    type: 'Admin'
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Usuários',
    type: 'Admin'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Perfil',
    type: 'All'
  },
  {
    href: '/loginAdmin',
    icon: LockIcon,
    title: 'Sair',
    type: 'All'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { data: dataContext } = useContext(AppContext);

  let user = {
    avatar: '/static/images/avatars/avatar_3.png',
    jobTitle: `Dr Gabinete Geral`,
    name: `Apolinário Manuel`
  };

  if(dataContext?.state?.usuario?.tipo == "DM"){
    user = {
      avatar: '/static/images/avatars/avatar_3.png',
      jobTitle: `Dr Gabinete Municipal`,
      name: dataContext?.state?.usuario?.nome
    };
  }else if(dataContext?.state?.usuario?.tipo == "DP"){
    user = {
      avatar: '/static/images/avatars/avatar_3.png',
      jobTitle: `Dr Gabinete Provincial`,
      name: dataContext?.state?.usuario?.nome
    };
  }else if(dataContext?.state?.usuario?.tipo == "Admin"){
    user = {
      avatar: '/static/images/avatars/avatar_3.png',
      jobTitle: `Admin`,
      name: dataContext?.state?.usuario?.nome
    };
  }

  

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => {

            if(item.type == dataContext?.state?.usuario?.tipo || item.type == "All")
              return  (
                  <NavItem
                    onClick = {() => item.title == "Sair" ? dataContext?.setState(null): null}
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                  />
                )
          })}
        </List>
      </Box>
      <Box flexGrow={1} />
      
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          Gestão de Doenças
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
