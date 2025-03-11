import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index} style={{ paddingTop: "16px" }}>
      {children}
    </div>
  );
}

export default TabPanel;
