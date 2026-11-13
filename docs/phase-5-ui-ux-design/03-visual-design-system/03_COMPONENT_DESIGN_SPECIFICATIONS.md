# Component Design Specifications

## Navigation

Sidebar, top bar, breadcrumbs, tabs, and mobile menu share the same ink, border, and pink selection treatment. Selected items use a pink-tinted surface plus a visible indicator, not color alone.

## Buttons

- Primary: pink surface, accessible dark ink text, clear hover/focus.
- Secondary: white surface, pink border/text.
- Tertiary: text action with visible focus.
- Destructive: error color with confirmation dialog.
- Disabled: reduced contrast but still readable; explain why when useful.

## Forms

Use visible labels, helper text, required markers, inline errors, character guidance for long responses, and preserved input after failure. Password and invitation-code fields provide show/hide and validation feedback without exposing secrets.

## Reflection Editor

Present official prompt in a stable read-only panel above a spacious editor. Keep save state visible. Attach existing artifacts without requiring duplicate uploads. A yellow reflective note may remind users about confidentiality and academic integrity.

## Artifact Components

File picker, upload progress, metadata form, association picker, artifact list, secure preview/open action, and deletion confirmation. Never expose a public URL. Show format/size policy before selection.

## Cards and Lists

Cards group meaningful academic context, not arbitrary metrics. Use lists for prompts, domains, artifacts, grants, reviews, and feedback. Keep metadata secondary to title and meaning.

## Reviews and Feedback

Use a distinct pink-tinted “Instructor guidance” panel with author/date/context. Original student content remains white and read-only in instructor view. Feedback actions do not appear in student editing controls.

## Dialogs and Alerts

Dialogs confirm revoke, delete, replace-code, and disable-code actions. Alerts explain success, errors, expired access, and privacy conditions. Do not reveal whether an unauthorized portfolio exists.

## Empty, Loading, and Error States

Use quiet illustrations or typography only when useful. Explain the next action: create first reflection, upload first artifact, wait for authorization, retry upload, or return to an authorized route.
