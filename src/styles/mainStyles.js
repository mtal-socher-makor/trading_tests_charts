import { makeStyles, TextField, withStyles, Button, IconButton, Switch } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

//474D57

export const useStyles = makeStyles((theme) => ({
  buttonRow: {
    // width: "40vw",
    // margin: "10vh auto 20px auto",
    // justifyContent: "space-evenly",
  },
  // vizWrapper:{
  //   width: "100%",
  //   //height: "700px",
  //   //marginTop: 130,
  //   position: "relative",
  //   overflowX: "auto",
  // },
  vizContainer: {
    backgroundColor: 'rgb(41, 41, 41);',
    // borderShadow: "5px 10px #000",
    width: '85vw',
    height: '400px',
    borderRadius: '8px',
    //marginTop:50,
    // overflowX: "auto",
    overflowY: 'hidden',
    position: 'relative',
  },
  loading: {
    fontSize: '40px',
    color: 'var(--secondary)',
    //alignSelf : "center",
  },
  dataCircle: {
    position: 'absolute',
    top: '-130px',
    right: 0,
    zIndex: 2,
  },
  avgDiv: {
    position: 'absolute',
    top: -25,
    left: 20,
    zIndex: 2,
    backgroundColor: 'var(--secondary)',
    borderRadius: 8,
  },
  avgText: {
    color: 'var(--main)',
    fontSize: '30px !important',
    padding: 8,
  },
  tooltipBox: {
    zIndex: 3,
  },
  tspanTitle: {
    fontWeight: 900,
  },
  tspan: {
    fontWeight: 600,
  },
  presentationArea: {
    justifyContent: 'center',
  },
  groupBtn: {
    color: '#848E9C',
    fontSize: '1.1em !important',
    '&:hover': {
      cursor: 'pointer',
      color: '#FFD700',
    },
  },
  groupBtnSpecial: {
    color: '#848E9C',
    fontSize: '1.1em !important',
    '&:hover': {
      color: '#FFD700',
      cursor: 'pointer',
    },
  },
  groupWrapper: {
    // marginLeft: 20,
    // position: "absolute",
    top: '10px',
    left: '10px',
    zIndex: 2,
  },
  groupItem: {
    display: 'inline',
  },
  legendContainer: {
    margin: '0 auto',
  },

  focusField: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      color: '#848E9C',
    },
  },
  filterInput: {
    '& .MuiSelect-outlined.MuiSelect-outlined': {
      backgroundColor: 'rgb(24,26,32);',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#474D57',
    },
    '& .MuiSelect-icon': {
      color: '#bababa',
    },
  },
  selectPaper: {
    backgroundColor: '#282828',
    color: '#848e9c',
  },
  rootCheckbox: {
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  notCheckedIcon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      background: 'rgba(206,217,224,.5)',
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: 'transparent',
    },
  },

  checkedIcon: {
    borderRadius: 3,
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: 'transparent',
    },
  },
  TextFieldInput: {
    '& .MuiOutlinedInput-inputMarginDense': {
      backgroundColor: 'rgb(24,26,32)',
      color: '#848E9C',
      borderRadius: '4px',
    },
    '& .MuiInputLabel-root': {
      color: '#848E9C',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
  },
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  switch: {
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
  },
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
}));

export const FilledButton = withStyles({
  root: {
    padding: '7px 39px',
    backgroundColor: 'var(--secondary)',
    fontWeight: 600,
    fontSize: '18px',
    color: '#FFFFFF',
    borderRadius: '21px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'var(--secondaryDark)',
      boxShadow: '0px 6px 10px #00185829',
      transition: '.3s',
    },
    '&.Mui-disabled': {
      backgroundColor: '#ACB1BF',
      color: '#868DA2',
    },
  },
})(Button);

export const StyledTextField = withStyles({
  root: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '& fieldset': {
        borderColor: '#EDEFF3',
      },
      '&:hover fieldset': {
        border: '1px solid #EDEFF3',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #EDEFF3',
      },
      '& .MuiSelect-select:focus': {
        backgroundColor: 'transparent',
        borderRadius: '8px',
      },
    },
  },
})(TextField);
