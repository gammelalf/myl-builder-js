import {Block, BLOCKS} from "./blocks";
import React from "react";

export default function ReaderBlock(props: Block) {
    const Reader = BLOCKS[props.type].Reader;
    // @ts-ignore
    return <Reader {...props.data} />
}