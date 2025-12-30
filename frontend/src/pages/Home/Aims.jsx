import { Box, Typography, Grid, Paper } from "@mui/material";

const boxStyle = {
  bgcolor: "background.default",
  width: "250px",
  height: "200px",
  p: "2em",
  borderRadius: "3em",
  fontFamily: `"Bungee", sans-serif`,
  fontWeight: 200,
  lineHeight: 1.7,
  fontSize: "text.size.sm"
};


function Aims(){
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      rowGap: "30px"
    }}>
      <Typography variant="h2" sx={{
        p: 0,
        m: 0,
        fontSize: "30px",
        color: "primary.main",
        letterSpacing: "0.1em",
        lineHeight: 0.8,
        textDecoration: "underline",
        textDecorationThickness: "3px",
        textUnderlineOffset: "5px",
      }}>
        Our Aims
      </Typography>
      <Grid container spacing="1em">
        <Grid>
          <Paper sx={boxStyle}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, iure?
          </Paper>
        </Grid>
        <Grid>
          <Paper sx={boxStyle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, cumque.
          </Paper>
        </Grid>
        <Grid>
          <Paper sx={boxStyle}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sequi!
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
export default Aims;