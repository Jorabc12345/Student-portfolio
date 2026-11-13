# Visual Design System

## Status

Phase 5 Stage 3 design specification. No React, Tailwind, or production UI code has been created.

## Visual Direction

The interface is a warm, calm academic portfolio for medical students. White provides reading space, pink provides identity and primary navigation emphasis, and butter yellow provides reflective highlights and gentle status emphasis. The design avoids clinical blue, dark-mode-first styling, excessive gradients, glassmorphism, gamification, and generic admin-dashboard patterns.

## Approved Palette Proportion

- 60% white and near-white reading surfaces.
- 30% pink `#FF669B` across identity, selected navigation, buttons, and supportive panels.
- 10% butter yellow `#F9E7A2` across highlights, reminders, reflective callouts, and non-critical attention states.

Dark neutral text and semantic status colors are functional accessibility colors, not competing brand colors.

## Design Tokens

- Base background: `#FFFFFF`.
- Soft surface: `#FFF8FA`.
- Pink brand: `#FF669B`.
- Pink tint: `#FFE5EE`.
- Butter yellow: `#F9E7A2`.
- Ink: `#2D2430`.
- Muted text: `#665C66`.
- Border: `#E8DDE2`.
- Focus ring: `#8A3156`.
- Success: `#216E4E`.
- Error: `#B42318`.
- Warning text: `#7A5200`.

Pink and yellow surfaces use dark ink text where white text would fail contrast.

## Layout

Use a persistent academic context, generous reading width, restrained cards, consistent breadcrumbs, and role-specific shells. Student screens emphasize authorship and reflection; instructor screens emphasize review context; administrator screens emphasize safe code operations.
