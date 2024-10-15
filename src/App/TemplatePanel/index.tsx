import React from 'react';

import {
  AppRegistrationOutlined,
  FirstPageOutlined,
  LastPageOutlined,
  MenuOutlined,
  MonitorOutlined,
  PhoneIphoneOutlined
} from '@mui/icons-material';
import {Box, IconButton, Stack, SxProps, ToggleButton, ToggleButtonGroup, Tooltip} from '@mui/material';

import EditorBlock, {
  EditorBlockContext,
  setSelectedScreenSize,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
} from '../../documents/editor';

import DownloadJson from './DownloadJson';
import HtmlPanel from './HtmlPanel';
import ImportJson from './ImportJson';
import JsonPanel from './JsonPanel';
import MainTabsGroup from './MainTabsGroup';
import ShareButton from './ShareButton';
import ReaderBlock from "../../documents/reader";

type TemplatePanelProps = {
  isInspectorDrawerOpen: boolean;
  isSamplesDrawerOpen: boolean;
  toggleInspectorDrawer: () => void;
  toggleSamplesDrawer: () => void;
};

export default function TemplatePanel(props: TemplatePanelProps) {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();

  let mainBoxSx: SxProps = {
    height: '100%',
  };
  if (selectedScreenSize === 'mobile') {
    mainBoxSx = {
      ...mainBoxSx,
      margin: '32px auto',
      width: 370,
      height: 800,
      boxShadow:
        'rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px',
    };
  }

  const handleScreenSizeChange = (_: unknown, value: unknown) => {
    switch (value) {
      case 'mobile':
      case 'desktop':
        setSelectedScreenSize(value);
        return;
      default:
        setSelectedScreenSize('desktop');
    }
  };

  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case 'editor':
        return (
          <Box sx={mainBoxSx}>
            <EditorBlockContext.Provider value={"root"}>
              <EditorBlock {...document.root} />
            </EditorBlockContext.Provider>
          </Box>
        );
      case 'preview':
        return (
          <Box sx={mainBoxSx}>
            <ReaderBlock {...document.root} />
          </Box>
        );
      case 'html':
        return <HtmlPanel />;
      case 'json':
        return <JsonPanel />;
    }
  };

  return (
    <>
      <Stack
        sx={{
          height: 49,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 'appBar',
          px: 1,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton onClick={props.toggleSamplesDrawer}>
          {props.isSamplesDrawerOpen ? <FirstPageOutlined fontSize="small" /> : <MenuOutlined fontSize="small" />}
        </IconButton>
        <Stack px={2} direction="row" gap={2} width="100%" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2}>
            <MainTabsGroup />
          </Stack>
          <Stack direction="row" spacing={2}>
            <DownloadJson />
            <ImportJson />
            <ToggleButtonGroup value={selectedScreenSize} exclusive size="small" onChange={handleScreenSizeChange}>
              <ToggleButton value="desktop">
                <Tooltip title="Desktop view">
                  <MonitorOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="mobile">
                <Tooltip title="Mobile view">
                  <PhoneIphoneOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            <ShareButton />
          </Stack>
        </Stack>
        <IconButton onClick={props.toggleInspectorDrawer}>
          {props.isInspectorDrawerOpen ? <LastPageOutlined fontSize="small" /> : <AppRegistrationOutlined fontSize="small" />}
        </IconButton>
      </Stack>
      <Box sx={{ height: 'calc(100vh - 49px)', overflow: 'auto', minWidth: 370 }}>{renderMainPanel()}</Box>
    </>
  );
}
