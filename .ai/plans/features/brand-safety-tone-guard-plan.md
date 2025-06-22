# Feature Plan: Brand-Safety & Tone Guard (F-4)

## Summary
Automatically scan generated content for profanity, negative sentiment, and brand-safety violations, providing reassurance to users and blocking unsafe output unless overridden.

## Goals
- Prevent publication of content with profanity or negative sentiment.
- Provide sentiment scoring and flagging for review.
- Allow user override with clear warnings.

## User Stories
- **As a brand manager,** I need reassurance no profanity or negative sentiment sneaks into live copy.
- **As an editor,** I want to see flagged content and decide whether to override or block it.

## Acceptance Criteria
1. Profanity list (George Carlin + client blacklist) triggers flag.
2. Overall sentiment score returned (-1 to +1 scale).
3. Blocked output cannot be published without user override.
4. Uses OpenAI moderation endpoint for additional safety.
5. Flags and scores are visible in the review UI.

## Technical Notes
- Implement regex-based profanity filter and allow custom blacklist.
- Use OpenAI moderation API for sentiment and safety checks.
- Integrate with review UI for flagging and override.

## Dependencies
- Profanity/blacklist data source.
- Access to OpenAI moderation API.
- Review UI integration.

## Open Questions
- Should we allow users to customize the blacklist?
- How do we handle borderline sentiment cases?
- Should we log all flagged content for audit? 