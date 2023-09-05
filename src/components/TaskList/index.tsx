import { Edit } from "@mui/icons-material"
import {
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"

type Props = {
  title: string
}
const TaskList = ({ title }: Props) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Box>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="edit">
                    <Edit />
                  </IconButton>
                }
                alignItems="flex-start"
              >
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskList
