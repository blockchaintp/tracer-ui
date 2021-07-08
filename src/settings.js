import HomeIcon from '@material-ui/icons/Home'
import ViewIcon from '@material-ui/icons/Visibility'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const icons = {
  home: HomeIcon,
  view: ViewIcon,
  more: MoreVertIcon,
}

const settings = {
  title: 'Tracer UI',
  api: '/transactions',
  devMode: process.env.NODE_ENV === 'development',
  snackbarAutoHide: 5000,
  sideMenuWidth: 250,
  icons,
  sideMenu: ({
    handlers,
  }) => [{
    title: 'Home',
    handler: 'home',
    icon: icons.home,
  }],
  appbarMenu: ({
    handlers,
  }) => [{
    title: 'Home',
    handler: 'home',
    icon: icons.home,
  }],
}

export default settings
