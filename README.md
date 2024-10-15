# myl-builder-js

This is a complete refactor of the [@usewaypoint/editor-sample](https://github.com/usewaypoint/email-builder-js/tree/1ded24dca92f90488c27f9ef536d37a2d6692ce5/packages/editor-sample)
whose codebase is incredibly hard to extend with new block types.

## Why?

### Why the refactor?

Extending `@usewaypoint/editor-sample` with new block types is hard or at least annoying once you understand its structure.

---

In principle, you have to choose a new `type` (some string not used by others) and associated various things with it:
- A schema for the block's properties
- A component for rendering the block
- A component for rendering the block during editing
- A component to modify the block's properties
- Some initial properties to create the block with

`@usewaypoint/editor-sample` does this association in various different code places through various different mechanisms.

Discovering those places is not made easier by the project's layout and typescript doesn't help you either, when you miss a spot.

On top of that, one of those places is in a dependency (namely `@usewaypoint/editor-builder`) which makes it impossible to add
any new block kinds without copying the entire dependency's code.

---

This refactor's main goal is to unify this into a single place: `BLOCKS` found in `src/documents/blocks.tsx`

### Why not a fork?

This repository copied all files of `@usewaypoint/editor-sample` instead of forking its repository.

This decision was made because `@usewaypoint/editor-sample` is part of a monorepo,
and I'm not interested in modifying the other packages.