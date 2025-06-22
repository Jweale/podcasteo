---
id: 3
title: Implement Frontend File and Text Upload UI
status: completed
priority: high
feature: Transcript Upload
dependencies:
  - 2
assigned_agent: null
created_at: "2025-06-22T15:39:28Z"
started_at: null
completed_at: "2025-06-22T16:51:34Z"
error_log: null
---

## Description
Build the UI components for drag-and-drop file upload and plain-text paste, including a real-time word counter and error messaging.

## Details
- Create a file input for `.md`, `.txt`, and `.vtt` files (≤2MB).
- Implement a plain-text paste area with a running word counter (≤15,000 words).
- Display clear error messages for invalid file types, sizes, or word counts.
- Ensure accessibility and responsive design.

## Test Strategy
- Upload files and paste text in the UI, verifying word count and error handling.
- Confirm the UI is accessible and works across devices and browsers. 