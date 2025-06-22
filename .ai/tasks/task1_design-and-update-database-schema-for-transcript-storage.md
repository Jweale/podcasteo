---
id: 1
title: Design and Update Database Schema for Transcript Storage
status: completed
priority: critical
feature: Transcript Upload
dependencies: []
assigned_agent: null
created_at: "2025-06-22T15:39:28Z"
started_at: "2025-06-22T15:41:11Z"
completed_at: "2025-06-22T15:55:37Z"
error_log: null
---

## Description
Update or confirm the `transcripts` table schema to ensure the `text_md` field exists, supports up to 2MB, and is ready for transcript storage. The `transcripts` table should be linked to `jobs` by `job_id`.

## Details
- Review the current `transcripts` table schema in the database.
- Ensure the `text_md` field is of type `TEXT` and supports up to 2MB.
- Confirm the `job_id` field is a foreign key referencing `jobs(id)`.
- Ensure the schema change is backward compatible and properly migrated.
- Document the schema update in the project documentation.

## Test Strategy
- Verify the `transcripts` table contains the `text_md` field with the correct type and size.
- Attempt to insert and retrieve a transcript of up to 2MB.
- Confirm no data loss or truncation occurs for large transcripts. 