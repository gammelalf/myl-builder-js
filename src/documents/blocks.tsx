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

type ZodSchemas = Record<string, z.AnyZodObject>;
type BlocksDeclaration<T extends ZodSchemas> = {
    [K in keyof T]: {
        schema: T[K];
        Editor: React.ComponentType<z.infer<T[K]>>,
    };
};

const BLOCKS = {
    Avatar: {
        schema: AvatarPropsSchema,
        Editor: (props) => <Avatar {...props} />,
    },
    Button: {
        schema: ButtonPropsSchema,
        Editor: (props) => <Button {...props} />,
    },
    Container: {
        schema: ContainerPropsSchema,
        Editor: (props) => <ContainerEditor {...props} />,
    },
    ColumnsContainer: {
        schema: ColumnsContainerPropsSchema,
        Editor: (props) => <ColumnsContainerEditor {...props} />,
    },
    Heading: {
        schema: HeadingPropsSchema,
        Editor: (props) => <Heading {...props} />,
    },
    Html: {
        schema: HtmlPropsSchema,
        Editor: (props) => <Html {...props} />,
    },
    Image: {
        schema: ImagePropsSchema,
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
    },
    Text: {
        schema: TextPropsSchema,
        Editor: (props) => <Text {...props} />,
    },
    EmailLayout: {
        schema: EmailLayoutPropsSchema,
        Editor: (props) => <EmailLayoutEditor {...props} />,
    },
    Spacer: {
        schema: SpacerPropsSchema,
        Editor: (props) => <Spacer {...props} />,
    },
    Divider: {
        schema: DividerPropsSchema,
        Editor: (props) => <Divider {...props} />,
    },
} satisfies BlocksDeclaration<any>;
type BLOCKS = typeof BLOCKS;

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
