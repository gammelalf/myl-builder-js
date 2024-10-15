import {z} from "zod";
import {Avatar, AvatarPropsSchema} from "@usewaypoint/block-avatar";
import React from "react";
import {Button, ButtonPropsSchema} from "@usewaypoint/block-button";
import ContainerPropsSchema from "./blocks/Container/ContainerPropsSchema";
import ContainerEditor from "./blocks/Container/ContainerEditor";
import ColumnsContainerPropsSchema from "./blocks/ColumnsContainer/ColumnsContainerPropsSchema";
import ColumnsContainerEditor from "./blocks/ColumnsContainer/ColumnsContainerEditor";
import {Heading, HeadingPropsSchema} from "@usewaypoint/block-heading";
import {Html, HtmlPropsSchema} from "@usewaypoint/block-html";
import {Image, ImagePropsSchema} from "@usewaypoint/block-image";
import {Text, TextPropsSchema} from "@usewaypoint/block-text";
import EmailLayoutPropsSchema from "./blocks/EmailLayout/EmailLayoutPropsSchema";
import EmailLayoutEditor from "./blocks/EmailLayout/EmailLayoutEditor";
import {Spacer, SpacerPropsSchema} from "@usewaypoint/block-spacer";
import {Divider, DividerPropsSchema} from "@usewaypoint/block-divider";
import {
    AccountCircleOutlined, Crop32Outlined,
    HMobiledataOutlined, HorizontalRuleOutlined, HtmlOutlined,
    ImageOutlined, LibraryAddOutlined,
    NotesOutlined,
    SmartButtonOutlined, ViewColumnOutlined
} from "@mui/icons-material";
import EmailLayoutReader from "./blocks/EmailLayout/EmailLayoutReader";
import ColumnsContainerReader from "./blocks/ColumnsContainer/ColumnsContainerReader";
import ContainerReader from "./blocks/Container/ContainerReader";
import AvatarSidebarPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/AvatarSidebarPanel";
import ButtonSidebarPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/ButtonSidebarPanel";
import ContainerSidebarPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/ContainerSidebarPanel";
import ColumnsContainerPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/ColumnsContainerSidebarPanel";
import HeadingSidebarPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/HeadingSidebarPanel";
import HtmlSidebarPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/HtmlSidebarPanel";
import ImageSidebarPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/ImageSidebarPanel";
import TextSidebarPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/TextSidebarPanel";
import SpacerSidebarPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/SpacerSidebarPanel";
import DividerSidebarPanel from "../App/InspectorDrawer/ConfigurationPanel/input-panels/DividerSidebarPanel";
import EmailLayoutSidebarFields from "../App/InspectorDrawer/ConfigurationPanel/input-panels/EmailLayoutSidebarPanel";

const constrainBlocksType: <T extends Record<string, z.AnyZodObject>>(x: {
    [K in keyof T]: {
        schema: T[K];
        creatable?: {
            label: string;
            icon: React.ReactNode;
            block: () => z.infer<T[K]>;
        }
        Editor: React.ComponentType<z.infer<T[K]>>,
        Reader: React.ComponentType<z.infer<T[K]>>,
        Inspector: React.ComponentType<{data: z.infer<T[K]>, setData: (newData: z.infer<T[K]>) => void}>,
    };
}) => typeof x = (x) => x;

export const BLOCKS = constrainBlocksType({
    Avatar: {
        schema: AvatarPropsSchema,
        creatable: {
            label: 'Avatar',
            icon: <AccountCircleOutlined />,
            block: () => ({
                props: {
                    imageUrl: 'https://ui-avatars.com/api/?size=128',
                    shape: 'circle' as const,
                },
                style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
            }),
        },
        Editor: Avatar,
        Reader: Avatar,
        Inspector: AvatarSidebarPanel,
    },
    Button: {
        schema: ButtonPropsSchema,
        creatable: {
            label: 'Button',
            icon: <SmartButtonOutlined />,
            block: () => ({
                props: {
                    text: 'Button',
                    url: 'https://www.usewaypoint.com',
                },
                style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
            }),
        },
        Editor: Button,
        Reader: Button,
        Inspector: ButtonSidebarPanel,
    },
    Container: {
        schema: ContainerPropsSchema,
        creatable: {
            label: 'Container',
            icon: <LibraryAddOutlined />,
            block: () => ({
                style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
            }),
        },
        Editor: ContainerEditor,
        Reader: ContainerReader,
        Inspector: ContainerSidebarPanel,
    },
    ColumnsContainer: {
        schema: ColumnsContainerPropsSchema,
        creatable:  {
            label: 'Columns',
            icon: <ViewColumnOutlined />,
            block: () => ({
                props: {
                    columnsGap: 16,
                    columnsCount: 3 as const,
                    columns: [
                        { childrenIds: [] },
                        { childrenIds: [] },
                        { childrenIds: [] }
                    ] as [{ childrenIds: string[] }, { childrenIds: string[] }, { childrenIds: string[] }],
                },
                style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
            }),
        },
        Editor: ColumnsContainerEditor,
        Reader: ColumnsContainerReader,
        Inspector: ColumnsContainerPanel,
    },
    Heading: {
        schema: HeadingPropsSchema,
        creatable: {
            label: 'Heading',
            icon: <HMobiledataOutlined />,
            block: () => ({
                props: { text: 'Hello friend' },
                style: {
                    padding: { top: 16, bottom: 16, left: 24, right: 24 },
                },
            }),
        },
        Editor: Heading,
        Reader: Heading,
        Inspector: HeadingSidebarPanel,
    },
    Html: {
        schema: HtmlPropsSchema,
        creatable: {
            label: 'Html',
            icon: <HtmlOutlined />,
            block: () => ({
                props: { contents: '<strong>Hello world</strong>' },
                style: {
                    fontSize: 16,
                    textAlign: null,
                    padding: { top: 16, bottom: 16, left: 24, right: 24 },
                },
            }),
        },
        Editor: Html,
        Reader: Html,
        Inspector: HtmlSidebarPanel,
    },
    Image: {
        schema: ImagePropsSchema,
        creatable: {
            label: 'Image',
            icon: <ImageOutlined />,
            block: () => ({
                props: {
                    url: 'https://assets.usewaypoint.com/sample-image.jpg',
                    alt: 'Sample product',
                    contentAlignment: 'middle' as const,
                    linkHref: null,
                },
                style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
            }),
        },
        Editor: (data) => {
            const props = {
                ...data,
                props: {
                    ...data.props,
                    url: data.props?.url ?? 'https://placehold.co/600x400@2x/F8F8F8/CCC?text=Your%20image',
                },
            };
            return <Image {...props} />;
        },
        Reader: Image,
        Inspector: ImageSidebarPanel,
    },
    Text: {
        schema: TextPropsSchema,
        creatable: {
            label: 'Text',
            icon: <NotesOutlined />,
            block: () => ({
                props: { text: 'My new text block' },
                style: {
                    padding: { top: 16, bottom: 16, left: 24, right: 24 },
                    fontWeight: 'normal' as const,
                },
            }),
        },
        Editor: Text,
        Reader: Text,
        Inspector: TextSidebarPanel,
    },
    EmailLayout: {
        schema: EmailLayoutPropsSchema,
        Editor: EmailLayoutEditor,
        Reader: EmailLayoutReader,
        Inspector: EmailLayoutSidebarFields,
    },
    Spacer: {
        schema: SpacerPropsSchema,
        creatable: {
            label: 'Spacer',
            icon: <Crop32Outlined />,
            block: () => ({}),
        },
        Editor: Spacer,
        Reader: Spacer,
        Inspector: SpacerSidebarPanel,
    },
    Divider: {
        schema: DividerPropsSchema,
        creatable: {
            label: 'Divider',
            icon: <HorizontalRuleOutlined />,
            block: () => ({
                style: { padding: { top: 16, right: 0, bottom: 16, left: 0 } },
                props: {
                    lineColor: '#CCCCCC',
                },
            }),
        },
        Editor: Divider,
        Reader: Divider,
        Inspector: DividerSidebarPanel,
    },
});
export type BLOCKS = typeof BLOCKS;

function createBlockPropsSchemaOption<K extends keyof BLOCKS>(type: K, {schema}: BLOCKS[K]) {
    return z.object({
        type: z.literal(type),
        data: schema,
    })
}
function assertNonEmpty<T>(array: Array<T>): [T, ...Array<T>] {
    console.assert(array.length > 0);
    // @ts-ignore
    return array;
}
export const BlockSchema = z.discriminatedUnion('type', assertNonEmpty(Object.keys(BLOCKS).map((key: string) => key as keyof BLOCKS).map((key) => createBlockPropsSchemaOption(key, BLOCKS[key]))));
export type Block = { [K in keyof BLOCKS]: { type: K, data: z.infer<BLOCKS[K]['schema']> } }[keyof BLOCKS];

export const DocumentSchema = z.object({ root: BlockSchema }).catchall(BlockSchema);
export type Document = { root: Block } & Record<string, Block>;
