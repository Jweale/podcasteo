# Feature Plan: CMS Publish (F-6)

## Summary
Enable one-click publishing of generated content to WordPress (and future CMSs), ensuring correct schema, canonical URLs, and fallback Markdown download.

## Goals
- Allow users to publish content directly to their WordPress site.
- Ensure published content includes valid schema and canonical URLs.
- Provide fallback download as Markdown file.

## User Stories
- **As a marketer,** I want one-click publish to my WordPress site with correct schema and canonical URL.
- **As a user,** I want to download the content as Markdown if I don't use WordPress.

## Acceptance Criteria
1. Valid WordPress credentials result in successful post creation (201 Created, returns post ID).
2. JSON-LD schema is injected in `<script type="application/ld+json">`.
3. Canonical URL is set from the episode form.
4. Fallback: Markdown `.md` download is always available.
5. Ghost integration is planned for P1.

## Technical Notes
- Use WordPress REST API for publishing.
- Inject JSON-LD schema for SEO.
- Provide download endpoint for Markdown export.
- Plan for future Ghost CMS integration.

## Dependencies
- WordPress REST API access.
- Backend integration for publishing and download.
- Front-end UI for publish/download actions.

## Open Questions
- Should we support additional CMSs (e.g., Ghost, Webflow) sooner?
- How do we handle failed publishes or credential errors?
- Should we allow users to customize the schema? 