# Project Tasks

- [x] **ID 1: Design and Update Database Schema for Transcript Storage** (Priority: critical)
> Update or confirm the `transcripts` table schema to ensure the `text_md` field exists, supports up to 2MB, and is ready for transcript storage. The `transcripts` table should be linked to `jobs` by `job_id`.

- [x] **ID 2: Implement Backend API for Transcript Upload and Validation** (Priority: critical)
> Dependencies: 1
> Develop the backend logic to accept transcript uploads (file or text), validate file type/size/word count, and create a new job entry with transcript data. Store the transcript in the `transcripts.text_md` field.

- [x] **ID 3: Implement Frontend File and Text Upload UI** (Priority: high)
> Dependencies: 2
> Build the UI components for drag-and-drop file upload and plain-text paste, including a real-time word counter and error messaging.

- [ ] **ID 4: Integrate Frontend with Backend API** (Priority: high)
> Dependencies: 2, 3
> Connect the frontend upload UI to the backend API, ensuring correct payload structure and error handling.

- [ ] **ID 5: Implement Transcript Retrieval Endpoint** (Priority: medium)
> Dependencies: 2
> Create the `GET /jobs/{id}/transcript` endpoint to allow retrieval of stored transcripts from the `transcripts` table.

- [ ] **ID 6: End-to-End Testing and Validation** (Priority: high)
> Dependencies: 1, 2, 3, 4, 5
> Write and execute tests to ensure the upload, validation, storage, and retrieval of transcripts work as specified, including edge cases for file size, type, and word count.