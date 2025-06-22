# Feature Plan: Human Review UI (F-5)

## Summary
Provide an intuitive UI for editors to review, curate, and approve generated content blocks before publishing, with autosave and block toggling features.

## Goals
- Enable editors to hide/show content blocks and curate output.
- Prevent publishing until at least one article body block is visible.
- Ensure state persistence and autosave for a smooth editing experience.

## User Stories
- **As an editor,** I want a toggle switch for each block so I can curate before publish.
- **As a user,** I want my changes to autosave so I don't lose work.

## Acceptance Criteria
1. Editor can hide/show blocks; state is persisted.
2. 'Approve & publish' is disabled until at least one article body is visible.
3. Autosave occurs every 10 seconds.
4. UI uses React + Radix Tabs; state stored in `draft_changes` table.
5. All changes are recoverable after page reload.

## Technical Notes
- Use React for UI, Radix Tabs for block navigation.
- Implement autosave with debounce/throttle.
- Store state in `draft_changes` table in the database.
- Ensure robust error handling and recovery.

## Dependencies
- Front-end components (React, Radix Tabs).
- Backend API for saving/retrieving draft changes.
- Database schema for `draft_changes`.

## Open Questions
- Should we allow collaborative editing in the future?
- How do we handle very large articles with many blocks?
- Should we provide version history for edits? 