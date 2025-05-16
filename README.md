# Promotion Management Flow - Accordion v2 Prototype

This prototype demonstrates an accordion-style UI pattern for the promotion management workflow in OPT.

## Key Features

### Accordion Pattern
- Two stacked accordion cards with progressive disclosure
- Select Lines (Step 1) - Starts expanded
- Configure Promotion (Step 2) - Starts collapsed

### Progressive Disclosure
- Configure Promotion shows "Please select lines first" when no selection
- Both sections can be expanded/collapsed independently
- "Continue to Step 2" button explicitly transitions between sections

### Dynamic Headers
- Collapsed headers show relevant state (line count, thumbnails)
- Expanded headers show only title and caret

### Visual Improvements
- White card backgrounds
- Consistent spacing and padding
- Numbered badges for each step
- Smooth transitions

## Testing Scenarios

1. **Simple promo**: Use dates 03/01/2024 - 04/30/2024
2. **Conflict flow**: Use dates 01/01/2024 - 03/31/2024 (must include 64 oz)

Note: Select the 64 oz line (with "Promo applied" chip) to trigger conflicts.

## Technology Stack

- React 18
- Vite for build tooling
- CSS for styling

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Created By

Brandi Kinard - Senior UX Designer, Pricing Team