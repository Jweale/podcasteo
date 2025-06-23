# Project Tasks

- [x] **ID 1: Design and Update Database Schema for Transcript Storage** (Priority: critical)
> Update or confirm the `transcripts` table schema to ensure the `text_md` field exists, supports up to 2MB, and is ready for transcript storage. The `transcripts` table should be linked to `jobs` by `job_id`.

- [x] **ID 2: Implement Backend API for Transcript Upload and Validation** (Priority: critical)
> Dependencies: 1
> Develop the backend logic to accept transcript uploads (file or text), validate file type/size/word count, and create a new job entry with transcript data. Store the transcript in the `transcripts.text_md` field.

- [x] **ID 3: Implement Frontend File and Text Upload UI** (Priority: high)
> Dependencies: 2
> Build the UI components for drag-and-drop file upload and plain-text paste, including a real-time word counter and error messaging.

- [x] **ID 4: Integrate Frontend with Backend API** (Priority: high)
> Dependencies: 2, 3
> Connect the frontend upload UI to the backend API, ensuring correct payload structure and error handling.

- [x] **ID 5: Implement Transcript Retrieval Endpoint** (Priority: medium)
> Dependencies: 2
> Create the `GET /jobs/{id}/transcript` endpoint to allow retrieval of stored transcripts from the `transcripts` table.

- [x] **ID 6: End-to-End Testing and Validation** (Priority: high)
> Dependencies: 1, 2, 3, 4, 5
> Write and execute tests to ensure the upload, validation, storage, and retrieval of transcripts work as specified, including edge cases for file size, type, and word count.

- [x] **ID 7: Design and Update Database Schema for Topic Storage** (Priority: high)
> Define and migrate the `topics` table schema to support storage of clustered topics and keywords linked to transcripts/jobs.

- [ ] **ID 8: Implement Embedding and Clustering Pipeline** (Priority: critical)
> Dependencies: 7
> Build the core logic to segment transcripts, generate embeddings, cluster segments into topics, and extract representative keywords.

- [ ] **ID 9: Integrate Topic Extraction Pipeline with Transcript Upload Flow** (Priority: high)
> Dependencies: 8
> Ensure the topic extraction pipeline is triggered after transcript upload and results are stored appropriately.

- [ ] **ID 10: Store and Expose Topic Clusters for Downstream Use** (Priority: high)
> Dependencies: 8
> Persist topic clusters in the database and provide an API endpoint for retrieval by other services or the frontend.

- [ ] **ID 11: Test Performance and Accuracy on Sample Transcripts** (Priority: medium)
> Dependencies: 8, 9, 10
> Benchmark the pipeline, validate clustering quality, and handle edge cases with various transcript types and sizes.