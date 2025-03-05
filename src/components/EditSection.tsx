import { Grid2 as Grid } from "@mui/material";
import { NPC } from "../constants/npc";
import StatEditSelect from "./StatEditSelect";
import EditableFeatsSection from "./EditableFeatSection";
import EditableNarrativeSection from "./EditableNarrativeSection";

type EditSectionProps = {
  npc: NPC;
};

function EditSection(props: EditSectionProps) {
  const { npc } = props;

  return (
    <Grid container flexDirection="column" spacing={2}>
      <EditableNarrativeSection npc={npc} />
      <Grid container flexDirection="row">
        <StatEditSelect
          npcId={npc.id}
          stat={npc.stats.forceSensitivity}
          statKey="forceSensitivity"
        />
        <StatEditSelect
          npcId={npc.id}
          stat={npc.stats.athleticism}
          statKey="athleticism"
        />
        <StatEditSelect
          npcId={npc.id}
          stat={npc.stats.brains}
          statKey="brains"
        />
        <StatEditSelect npcId={npc.id} stat={npc.stats.charm} statKey="charm" />
        <StatEditSelect
          npcId={npc.id}
          stat={npc.stats.technician}
          statKey="technician"
        />
        <StatEditSelect npcId={npc.id} stat={npc.stats.fight} statKey="fight" />
        <StatEditSelect npcId={npc.id} stat={npc.stats.grit} statKey="grit" />
      </Grid>
      <EditableFeatsSection npc={npc} />
    </Grid>
  );
}

export default EditSection;
