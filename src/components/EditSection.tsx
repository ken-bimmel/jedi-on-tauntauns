import { Grid2 as Grid } from "@mui/material";
import { NPC, PC } from "../constants";
import StatEditSelect from "./StatEditSelect";
import EditableFeatsSection from "./EditableFeatSection";
import EditableNarrativeSection from "./EditableNarrativeSection";

type EditSectionProps = {
  character: NPC | PC;
  isNpc: boolean;
};

function EditSection(props: EditSectionProps) {
  const { character, isNpc } = props;

  return (
    <Grid container flexDirection="column" spacing={2}>
      <EditableNarrativeSection character={character} isNpc={isNpc} />
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
      <EditableFeatsSection character={character} isNpc={isNpc} />
    </Grid>
  );
}

export default EditSection;
