import {
  makeStyles,
  TextField,
  withStyles,
  Button,
  IconButton,
  Switch,
} from "@material-ui/core";

//474D57

export const useStyles = makeStyles((theme) => ({
  focusField: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      color: "#848E9C",
    },
  },
  filterInput: {
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      backgroundColor: "rgb(24,26,32);",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#474D57",
    },
    root: {},
  },
  selectPaper: {
    backgroundColor: "#646464",
    color: '#ffffff'
  },
  icon: {
    fill: 'white',
 },
  vizWrapper: {
    width: "80%",
    // height: "200px",
    marginTop: 130,
    position: "relative",
  },
  vizContainer: {
    backgroundColor: "var(--main)",
    width: "100%",
    height: "400px",
    borderRadius: "8px",
    //marginTop:50,
    overflowX: "auto",
    overflowY: "hidden",
    position: "relative",
  },
  loading: {
    fontSize: "40px",
    color: "var(--secondary)",
    //alignSelf : "center",
  },
  barchartContainer: {
    width: 5000,
    // alignItems: "center",
    // justifyContent: "center"
  },
  dataCircle: {
    position: "absolute",
    top: "-130px",
    right: 0,
    zIndex: 2,
  },
  avgDiv: {
    position: "absolute",
    top: -25,
    left: 20,
    zIndex: 2,
    backgroundColor: "var(--secondary)",
    borderRadius: 8,
  },
  avgText: {
    color: "var(--main)",
    fontSize: "30px !important",
    padding: 8,
  },
}));

export const FilledButton = withStyles({
  root: {
    padding: "7px 39px",
    backgroundColor: "var(--secondary)",
    fontWeight: 600,
    fontSize: "18px",
    color: "#FFFFFF",
    borderRadius: "21px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "var(--secondaryDark)",
      boxShadow: "0px 6px 10px #00185829",
      transition: ".3s",
    },
    "&.Mui-disabled": {
      backgroundColor: "#ACB1BF",
      color: "#868DA2",
    },
  },
})(Button);

export const StyledTextField = withStyles({
  root: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "& fieldset": {
        borderColor: "#EDEFF3",
      },
      "&:hover fieldset": {
        border: "1px solid #EDEFF3",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid #EDEFF3",
      },
      "& .MuiSelect-select:focus": {
        backgroundColor: "transparent",
        borderRadius: "8px",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "11px",
      "&::placeholder": {
        color: "#868DA2",
        opacity: 1,
      },
    },

    "& .MuiInputLabel-outlined": {
      transform: "translate(12px, 12px) scale(1)",
    },
  },
})(TextField);
