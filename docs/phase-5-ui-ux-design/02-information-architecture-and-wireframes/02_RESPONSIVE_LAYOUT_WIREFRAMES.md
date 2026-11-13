# Responsive Layout Wireframes

## Desktop

```text
┌──────────────┬─────────────────────────────────────────────┐
│ Logo          │ Top bar: breadcrumb | profile | logout     │
│ Home          ├─────────────────────────────────────────────┤
│ Level 1       │ Page title                                  │
│ Artifacts     │ Main academic/content workspace             │
│ Feedback      │                                               │
│ Access        │                                               │
└──────────────┴─────────────────────────────────────────────┘
```

Use a persistent narrow sidebar and a readable content column. Reflection text and official prompts receive the largest reading area.

## Tablet

```text
┌─────────────────────────────────────────────┐
│ [Menu] Title                 profile         │
├─────────────────────────────────────────────┤
│ Breadcrumb                                   │
│ Main content                                 │
│ Context tabs / folder navigation             │
└─────────────────────────────────────────────┘
```

Collapse the sidebar behind a labeled menu. Keep the academic breadcrumb and domain/folder context visible.

## Mobile

```text
┌──────────────────────┐
│ [Menu] Page title    │
├──────────────────────┤
│ Breadcrumb (scroll)  │
│ Content              │
│ Primary action       │
├──────────────────────┤
│ Home | Level | More  │
└──────────────────────┘
```

- Use a single-column reading and editing layout.
- Keep save/revoke/upload actions reachable without hiding them in ambiguous icons.
- Stack artifact metadata and association controls.
- Make upload progress and validation visible.
- Use horizontal scrolling only for breadcrumbs or compact tab sets, not primary content.
- Preserve access boundaries and avoid exposing private content in notifications or previews.
