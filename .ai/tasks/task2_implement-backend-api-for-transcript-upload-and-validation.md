---
id: 2
title: Implement Backend API for Transcript Upload and Validation
status: inprogress
priority: critical
feature: Transcript Upload
dependencies:
  - 1
assigned_agent: cursor
created_at: "2025-06-22T15:39:28Z"
started_at: "2025-06-22T15:55:57Z"
completed_at: null
error_log: null
---

## Description
Develop the backend logic to accept transcript uploads (file or text), validate file type/size/word count, and create a new job entry with transcript data.

## Details
- Implement a `POST /jobs` endpoint to accept transcript uploads as file or plain text.
- Validate file type (`.md`, `.txt`, `.vtt`), file size (≤2MB), and word count (≤15,000 words).
- Store the transcript in the `text_md` field of the `jobs` table.
- Return appropriate error messages for invalid uploads.
- Ensure backend validation is robust and secure.

## Test Strategy
- Upload valid and invalid files and plain text to the endpoint.
- Confirm correct job creation and error handling for all edge cases.
- Verify that transcripts are stored and retrievable from the database. 