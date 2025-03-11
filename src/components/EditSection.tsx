import { Grid2 as Grid } from "@mui/material";
import { NPC, PC } from "../constants";
import StatEditSelect from "./StatEditSelect";
import EditableFeatsSection from "./EditableFeatSection";
import EditableNarrativeSection from "./EditableNarrativeSection";

type EditSectionProps = {
  character: NPC | PC;
};

function EditSection(props: EditSectionProps) {
  const { character } = props;

  return (
    <Grid container flexDirection="column" spacing={2}>
      <EditableNarrativeSection npc={character} />
      <Grid container flexDirection="row">
        <StatEditSelect
          npcId={character.id}
          stat={character.stats.forceSensitivity}
          statKey="forceSensitivity"
        />
        <StatEditSelect
          npcId={character.id}
          stat={character.stats.athleticism}
          statKey="athleticism"
        />
        <StatEditSelect
          npcId={character.id}
          stat={character.stats.brains}
          statKey="brains"
        />
        <StatEditSelect
          npcId={character.id}
          stat={character.stats.charm}
          statKey="charm"
        />
        <StatEditSelect
          npcId={character.id}
          stat={character.stats.technician}
          statKey="technician"
        />
        <StatEditSelect
          npcId={character.id}
          stat={character.stats.fight}
          statKey="fight"
        />
        <StatEditSelect
          npcId={character.id}
          stat={character.stats.grit}
          statKey="grit"
        />
      </Grid>
      <EditableFeatsSection npc={character} />
    </Grid>
  );
}

export default EditSection;
