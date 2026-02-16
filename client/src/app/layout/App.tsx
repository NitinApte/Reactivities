import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";
import { useState } from "react";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedAcitivty, setSelectedAcitivty] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  const {activities, isPending} = useActivities();

  const handleSelectedAcitivity = (id: string) => {
    setSelectedAcitivty(activities!.find((x) => x.id === id));
  };

  const handelCancelSelectAcitivity = () => {
    setSelectedAcitivty(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectedAcitivity(id);
    else handelCancelSelectAcitivity();

    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  return (
    <Box sx={{ backgroundColor: "#eeeeee", minHeight:'100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedAcitivity}
          cancelSelectActivity={handelCancelSelectAcitivity}
          selectedAcitivty={selectedAcitivty}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
        />
        )}
      </Container>
    </Box>
  );
}

export default App;
