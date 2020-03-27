import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiIconButton: {
      size: 'medium',
    },
    MuiPaper: {
      elevation: 0,
      square: true,
    },
    MuiDialogTitle: {
      disableTypography: true,
    },
  },
  overrides: {
    MuiGridListTile: {
      tile: {
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: 'rgb(255, 255, 255)',
        boxSizing: 'border-box',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        borderRadius: '2px',
      },
    },
    MuiButton: {
      text: {
        borderRadius: '2px',
        '&:hover': {
          backgroundColor: 'rgba(153, 153, 153, 0.2)',
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: '16px',
        backgroundColor: '#2c5882',
        color: 'white',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
        '&:hover': {
          backgroundColor: '#809bb4',
        },
      },
      label: {
        fontSize: '24px',
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: '24px',
      },
      colorSecondary: {
        color: 'rgba(0, 0, 0, 0.87)',
      },
    },
    MuiListSubheader: {
      root: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '14px',
      },
    },
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiListItemText: {
      primary: {
        fontSize: '16px',
        color: 'black',
        textDecoration: 'none',
      },
      secondary: {
        fontSize: '14px',
        lineHeight: '18px',
        height: '36px',
        color: 'rgba(0, 0, 0, 0.54)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '10px',
        borderRadius: 2,
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: '2px',
        width: '90%',
        maxWidth: '90% !important',
      },
    },
    MuiDialogTitle: {
      root: {
        margin: '0px',
        padding: '24px 24px 20px',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '22px',
        lineHeight: '32px',
      },
    },
    MuiDialogContentText: {
      root: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '16px',
      },
    },
  },
  palette: {
    text: {
      primary: '#212121',
      secondary: '#ffffff',
      disabled: 'rgba(33, 33, 33, 03)',
    },
    background: {
      paper: '#ffffff',
    },
    action: {
      disabled: 'rgba(33, 33, 33, 03)',
    },
    shape: {
      borderRadius: 0,
    },
  },
})
