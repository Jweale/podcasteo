# Feature Plan: Billing & Usage Metering (F-7)

## Summary
Implement Stripe metered billing and usage tracking, allowing users to pay by words processed and view their usage in a dashboard.

## Goals
- Track word usage for each user and enforce free/paid tier limits.
- Integrate with Stripe for metered billing and payments.
- Provide a dashboard for users to view their usage and remaining allowance.

## User Stories
- **As an owner,** I want to pay by words processed so cost scales with output.
- **As a user,** I want to see my remaining free words and usage history.

## Acceptance Criteria
1. Stripe metered usage item is updated nightly from `usage_events`.
2. Dashboard displays remaining free words and usage history.
3. Hard stop is enforced at +10% over allowance.
4. Free tier: 15,000 words/month; paid: $0.002/word.
5. Usage events are logged and auditable.

## Technical Notes
- Integrate with Stripe metered billing API.
- Track usage events in the database.
- Update usage and billing nightly via scheduled job.
- Build dashboard UI for usage display.

## Dependencies
- Stripe account and API access.
- Backend for usage tracking and billing updates.
- Front-end dashboard components.

## Open Questions
- Should we allow users to prepay for usage or only post-pay?
- How do we handle disputed usage or refunds?
- Should we notify users as they approach their limit? 