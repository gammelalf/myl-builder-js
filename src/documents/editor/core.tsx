import React from 'react';
import { z } from 'zod';

import { Avatar, AvatarPropsSchema } from '@usewaypoint/block-avatar';
import { Button, ButtonPropsSchema } from '@usewaypoint/block-button';
import { Divider, DividerPropsSchema } from '@usewaypoint/block-divider';
import { Heading, HeadingPropsSchema } from '@usewaypoint/block-heading';
import { Html, HtmlPropsSchema } from '@usewaypoint/block-html';
import { Image, ImagePropsSchema } from '@usewaypoint/block-image';
import { Spacer, SpacerPropsSchema } from '@usewaypoint/block-spacer';
import { Text, TextPropsSchema } from '@usewaypoint/block-text';
import {
  buildBlockComponent,
  buildBlockConfigurationDictionary,
  buildBlockConfigurationSchema,
} from '@usewaypoint/document-core';

import ColumnsContainerEditor from '../blocks/ColumnsContainer/ColumnsContainerEditor';
import ColumnsContainerPropsSchema from '../blocks/ColumnsContainer/ColumnsContainerPropsSchema';
import ContainerEditor from '../blocks/Container/ContainerEditor';
import ContainerPropsSchema from '../blocks/Container/ContainerPropsSchema';
import EmailLayoutEditor from '../blocks/EmailLayout/EmailLayoutEditor';
import EmailLayoutPropsSchema from '../blocks/EmailLayout/EmailLayoutPropsSchema';

const EDITOR_DICTIONARY = buildBlockConfigurationDictionary({
  Avatar: {
    schema: AvatarPropsSchema,
    Component: (props) => <Avatar {...props} />,
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: (props) => <Button {...props} />,
  },
  Container: {
    schema: ContainerPropsSchema,
    Component: (props) => <ContainerEditor {...props} />,
  },
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema,
    Component: (props) => <ColumnsContainerEditor {...props} />,
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: (props) => <Heading {...props} />,
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: (props) => <Html {...props} />,
  },
  Image: {
    schema: ImagePropsSchema,
    Component: (data) => {
      const props = {
        ...data,
        props: {
          ...data.props,
          url: data.props?.url ?? 'https://placehold.co/600x400@2x/F8F8F8/CCC?text=Your%20image',
        },
      };
      return <Image {...props} />;
    },
  },
  Text: {
    schema: TextPropsSchema,
    Component: (props) => <Text {...props} />,
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema,
    Component: (props) => <EmailLayoutEditor {...props} />,
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: (props) => <Spacer {...props} />,
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: (props) => <Divider {...props} />,
  },
});

export const EditorBlock = buildBlockComponent(EDITOR_DICTIONARY);
export const EditorBlockSchema = buildBlockConfigurationSchema(EDITOR_DICTIONARY);
export const EditorConfigurationSchema = z.record(z.string(), EditorBlockSchema);

export type TEditorBlock = z.infer<typeof EditorBlockSchema>;
export type TEditorConfiguration = Record<string, TEditorBlock>;

export const EditorBlockContext = React.createContext<string | null>(null);
export const useCurrentBlockId = () => React.useContext(EditorBlockContext)!;
