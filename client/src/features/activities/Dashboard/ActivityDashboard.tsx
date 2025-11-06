import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedAcitivty?: Activity;
  openForm: (id: string) => void;
  closeForm: () => void;
  editMode: boolean;
  submitForm: (activity: Activity) => void;
  deleteActvity: (id: string) => void;
};

export default function ActivityDashboard({
  activities,
  cancelSelectActivity,
  selectActivity,
  selectedAcitivty,
  openForm,
  closeForm,
  editMode,
  submitForm,
  deleteActvity,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActvity={deleteActvity}
        />
      </Grid>
      <Grid size={5}>
        {selectedAcitivty && !editMode && (
          <ActivityDetails
            activity={selectedAcitivty}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedAcitivty}
            submitForm={submitForm}
          />
        )}
      </Grid>
    </Grid>
  );
}
