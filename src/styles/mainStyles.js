import {
  makeStyles,
  TextField,
  withStyles,
  Button,
  IconButton,
  Switch,
} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    buttonRow:{
        // width: "40vw",
        // margin: "10vh auto 20px auto",
        // justifyContent: "space-evenly",
               
    },
    vizWrapper:{
      width: "100%",
      //height: "700px",
      marginTop: 130,
      position: "relative",
    },
    vizContainer:{
        backgroundColor: 'var(--main)',
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        //marginTop:50,
        overflowX: "scroll",
        overflowY: "hidden",
        position: "relative",
       
    },
    loading:{
      fontSize: "40px",
      color: 'var(--secondary)',
      //alignSelf : "center",
    },
    linechartContainer:{
      width: 5000,
      
    },
    dataCircle:{
      position: "absolute",
      top: "-130px",
      right: 0,
      zIndex: 2,
    },
    avgDiv:{
      position: "absolute",
      top: -25,
      left: 20,
      zIndex: 2,
      backgroundColor: "var(--secondary)",
      borderRadius: 8,

    },
    avgText:{
      color: "var(--main)",
      fontSize: "30px !important",
      padding: 8
    },
    tooltipBox:{
      zIndex: 3
    },
    tspanTitle:{
      fontWeight: 900,
    },
    tspan:{
      fontWeight: 600,
    },
    groupBtn: {
      color: "var(--secondary)",
      fontSize: 20,
    },
    groupWrapper:{
      marginLeft: 20,
    }

}))

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
  }
  })(TextField);

  
