# Feature Plan: Transcript Upload (F-1)

## Summary
Enable users to upload or paste podcast transcripts (up to 15,000 words or 2MB) in `.md`, `.txt`, or `.vtt` formats for processing by Podcasteo.

## Goals
- Allow content marketers to easily provide transcripts for automated content generation.
- Support drag-and-drop file upload and plain-text paste.
- Ensure robust validation and error handling for file type and size.

## User Stories
- **As a content marketer,** I want to drag-and-drop a `.md`, `.txt`, or `.vtt` file (or paste plain text) so I can process an episode without extra tooling.
- **As a user,** I want to see a word counter when pasting text so I know if I'm within the limit.
- **As a user,** I want clear error messages if my file is too large or the wrong type.

## Acceptance Criteria
1. File upload accepts `.md`, `.txt`, and `.vtt` files up to 2MB.
2. Plain-text paste accepts up to 15,000 words.
3. Invalid file type or size triggers a friendly error message.
4. Job row is created in `jobs` with `state = queued` and transcript text (`text_md`) upon successful upload.
5. Word counter is visible and updates in real time for pasted text.
6. UI uses `<input type="file" multiple={false}>` (no multipart streams needed).
7. Uploaded or pasted transcript is stored in the `text_md` field of the `jobs` table (Postgres `TEXT`, ≤2MB).

## Technical Notes
- Use a single file input for uploads; no need for multi-part streaming.
- Implement a running word counter for pasted text.
- Store raw transcript text in the `text_md` field of the `jobs` table (Postgres `TEXT`, ≤2MB).
- Ensure backend validation for file type, size, and word count.
- Create a new job entry in the `jobs` table with relevant metadata and transcript text.
- API: Submit transcript as part of job creation via `POST /jobs` (payload includes `title`, `text_md`, `language`).
- API: Retrieve transcript via `GET /jobs/{id}/transcript`.

## Dependencies
- Database schema for `jobs` and transcript storage in `text_md` field.
- Front-end file input and paste handling components.
- Backend API for file/text upload and validation.

## Open Questions
- Should we allow users to upload multiple transcripts at once in the future?
- Is there a need for additional file format support (e.g., PDF, DOCX)?
- Should we provide a template or example transcript for users? 