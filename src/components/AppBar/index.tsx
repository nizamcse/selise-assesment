import {
  AppBar as MuiAppBar,
  Container,
  Toolbar,
  Typography,
  Box,
} from "@mui/material"
import TaskForm from "../TaskForm"

const AppBar = () => {
  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
          disableGutters
        >
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SELISE ASSESMENT
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0, justifyContent: "flex-end" }}>
            <TaskForm />
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}
export default AppBar
