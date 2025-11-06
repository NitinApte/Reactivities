import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";
import { esES } from "@mui/material/locale";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedAcitivty, setSelectedAcitivty] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));

    return () => {};
  }, []);

  const handleSelectedAcitivity = (id: string) => {
    setSelectedAcitivty(activities.find((x) => x.id === id));
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

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(
        activities.map((x) => (x.id === activity.id ? activity : x))
      );
    } else {
      const newActivity = {
        ...activity,
        id: activities.length.toExponential.toString(),
      };
      setSelectedAcitivty(newActivity);
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
  };

  const handleDelete = (id?: string) => {
    setActivities(activities.filter((x) => x.id !== id));
  };

  return (
    <Box sx={{ backgroundColor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedAcitivity}
          cancelSelectActivity={handelCancelSelectAcitivity}
          selectedAcitivty={selectedAcitivty}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActvity={handleDelete}
        />
      </Container>
    </Box>
  );
}

export default App;
