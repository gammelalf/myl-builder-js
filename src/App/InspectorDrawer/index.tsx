import React from 'react';

import { Box, Drawer, Tab, Tabs } from '@mui/material';

import {setDocument, setSidebarTab, useDocument, useSelectedSidebarTab} from '../../documents/editor';

import ConfigurationPanel from './ConfigurationPanel';
import EmailLayoutSidebarPanel from "./ConfigurationPanel/input-panels/EmailLayoutSidebarPanel";

export const INSPECTOR_DRAWER_WIDTH = 320;

type InspectorDrawerProps = {
  open: boolean;
};

export default function InspectorDrawer(props: InspectorDrawerProps) {
  const selectedSidebarTab = useSelectedSidebarTab();
  const document = useDocument();

  const renderCurrentSidebarPanel = () => {
    switch (selectedSidebarTab) {
      case 'block-configuration':
        return <ConfigurationPanel />;
      case 'styles':
        return <EmailLayoutSidebarPanel
            data={document.root.data}
            setData={(data) => setDocument({ root: { type: 'EmailLayout', data } })}
        />;
    }
  };

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={props.open}
      sx={{
        width: props.open ? INSPECTOR_DRAWER_WIDTH : 0,
      }}
    >
      <Box sx={{ width: INSPECTOR_DRAWER_WIDTH, height: 49, borderBottom: 1, borderColor: 'divider' }}>
        <Box px={2}>
          <Tabs value={selectedSidebarTab} onChange={(_, v) => setSidebarTab(v)}>
            <Tab value="styles" label="Styles" />
            <Tab value="block-configuration" label="Inspect" />
          </Tabs>
        </Box>
      </Box>
      <Box sx={{ width: INSPECTOR_DRAWER_WIDTH, height: 'calc(100% - 49px)', overflow: 'auto' }}>
        {renderCurrentSidebarPanel()}
      </Box>
    </Drawer>
  );
}
