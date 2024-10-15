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
        Editor: (props) => <Avatar {...props} />,
        Reader: (props) => <Avatar {...props} />,
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
        Editor: (props) => <Button {...props} />,
        Reader: (props) => <Button {...props} />,
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
        Editor: (props) => <ContainerEditor {...props} />,
        Reader: (props) => <ContainerReader {...props} />,
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
        Editor: (props) => <ColumnsContainerEditor {...props} />,
        Reader: (props) => <ColumnsContainerReader {...props} />,
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
        Editor: (props) => <Heading {...props} />,
        Reader: (props) => <Heading {...props} />,
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
        Editor: (props) => <Html {...props} />,
        Reader: (props) => <Html {...props} />,
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
        Reader: (props) => <Image {...props} />,
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
        Editor: (props) => <Text {...props} />,
        Reader: (props) => <Text {...props} />,
    },
    EmailLayout: {
        schema: EmailLayoutPropsSchema,
        Editor: (props) => <EmailLayoutEditor {...props} />,
        Reader: (props) => <EmailLayoutReader {...props} />,
    },
    Spacer: {
        schema: SpacerPropsSchema,
        creatable: {
            label: 'Spacer',
            icon: <Crop32Outlined />,
            block: () => ({}),
        },
        Editor: (props) => <Spacer {...props} />,
        Reader: (props) => <Spacer {...props} />,
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
        Editor: (props) => <Divider {...props} />,
        Reader: (props) => <Divider {...props} />,
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
