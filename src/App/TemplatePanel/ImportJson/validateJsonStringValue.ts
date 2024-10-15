import {DocumentSchema, Document} from "../../../documents/blocks";

type TResult = { error: string; data?: never } | { data: Document; error?: never };

export default function validateTextAreaValue(value: string): TResult {
  let jsonObject = undefined;
  try {
    jsonObject = JSON.parse(value);
  } catch {
    return { error: 'Invalid json' };
  }

  const parseResult = DocumentSchema.safeParse(jsonObject);
  if (!parseResult.success) {
    return { error: 'Invalid JSON schema' };
  }

  if (!parseResult.data.root) {
    return { error: 'Missing "root" node' };
  }

  // @ts-ignore
  return { data: parseResult.data };
}
