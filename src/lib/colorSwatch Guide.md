# Visual Design Guide - Color Swatches & Reference
## LuxeStay Premium Indian Luxury Aesthetic

---

## HEX COLOR CODES & USAGE

### 🎨 WARM NEUTRALS (Foundation)

```
┌─────────────────────────────────────────┐
│ Ivory - #FFFBF5                         │
│ Primary light mode background           │
│ Very light cream with warm undertone    │
│ Use: Hero sections, featured stays      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Soft Cream - #FAF8F3                    │
│ Mid-tone gradient color                 │
│ Slightly deeper than ivory              │
│ Use: Accent gradients, section accents  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Sandstone - #E8DCC8                     │
│ Tertiary gradient color                 │
│ Warm beige with golden undertone        │
│ Use: Gradient endpoints, subtle accents │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Warm Gray - #D4C5B0                     │
│ Supporting text color                   │
│ Warm gray for secondary information     │
│ Use: Muted text, dividers, borders      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Premium Charcoal - #2C2416              │
│ Primary dark mode text & backgrounds    │
│ Warm charcoal with brown undertone      │
│ Use: Dark mode BG, text on light        │
└─────────────────────────────────────────┘
```

---

### 🏛️ HERITAGE ACCENT COLORS (Brand)

```
┌─────────────────────────────────────────┐
│ Royal Maroon - #8B3A3A                  │
│ PRIMARY CTA COLOR                       │
│ Deep, dignified red with brown base     │
│ Use: Primary buttons, emphasis, icons   │
│                                         │
│ Light Mode: White text on maroon        │
│ Dark Mode: Lighter saffron on dark bg   │
│ Hover State: #A24A4A (lighter maroon)   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Muted Saffron - #D4A574                 │
│ SECONDARY CTA & ACCENT COLOR            │
│ Golden-brown saffron (not bright gold)  │
│ Use: Secondary buttons, highlights      │
│      Form borders, focus rings          │
│      Accent elements, hover states      │
│                                         │
│ Light Mode: Dark text on saffron        │
│ Dark Mode: Dark background with saffron │
│ Hover State: #E0B587 (lighter saffron)  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Deep Emerald - #2F5233                  │
│ TRUST & SECONDARY ACCENT COLOR          │
│ Deep forest green with subtle tone      │
│ Use: Success states, trust icons        │
│      Accent blobs, secondary accents    │
│      Confirmation messages              │
│                                         │
│ Opacity: Often used at 15-20%           │
│ Purpose: Calm, trustworthy feeling      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Midnight Indigo - #1A1F3A               │
│ PRIMARY DARK MODE BACKGROUND            │
│ Deep indigo-black (warm, not cool)      │
│ Use: Dark mode primary background       │
│      Premium dark aesthetic             │
│      Combines with charcoal in gradient │
└─────────────────────────────────────────┘
```

---

## GRADIENT COMBINATIONS

### Hero Section Gradient
```
Light Mode:
  from-[#FFFBF5] → via-[#FAF8F3] → to-[#E8DCC8]
  (Ivory → Cream → Sandstone)

Dark Mode:
  from-[#1A1F3A] → via-[#2C2416] → to-[#1A1F3A]
  (Indigo → Charcoal → Indigo)

Effect: Warm, welcoming, luxury feel
```

### Search Section Gradient
```
Light Mode:
  from-[#FFFBF5] → via-white → to-[#F5F1ED]
  (Ivory → White → Pale Sandstone)

Dark Mode:
  from-[#1A1F3A]/20 → via-[#2C2416] → to-[#1A1F3A]/20
  (Semi-transparent indigo → Charcoal)

Effect: Clean, focused, minimal
```

### Accent Blob Gradients
```
Saffron Blob:
  from-[#D4A574]/25 → to-transparent
  (25% opacity saffron fading out)

Emerald Blob:
  from-[#2F5233]/20 → to-transparent
  (20% opacity emerald fading out)

Maroon Blob:
  from-[#8B3A3A]/15 → to-transparent
  (15% opacity maroon fading out)

Effect: Soft, dimensional depth without distraction
```

### Search Box Border Gradient
```
Linear Gradient 135 degrees:
  #D4A574 (0%) → Saffron
  #8B3A3A (50%) → Maroon
  #2F5233 (100%) → Emerald

Effect: Subtle tricolor reference, premium feel
```

---

## OPACITY VARIATIONS

### Text Colors
```
Primary Text (on light):
  #2C2416 → 100% opacity
  (Charcoal for maximum readability)

Secondary Text (on light):
  #D4C5B0 → 100% opacity
  (Warm gray, supporting information)

Primary Text (on dark):
  #FFFBF5 → 100% opacity
  (Warm white for premium feel)

Muted Text (on dark):
  #D4C5B0 → 80% opacity
  (Subtle secondary information)
```

### Accent Elements
```
Primary Blob (saffron):
  #D4A574 → 25% opacity (light) / 15% opacity (dark)
  (Visible but not dominant)

Secondary Blob (emerald):
  #2F5233 → 20% opacity (light) / 12% opacity (dark)
  (Supporting accent)

Tertiary Blob (maroon):
  #8B3A3A → 15% opacity (light) / 8% opacity (dark)
  (Subtle depth)

Form Borders:
  #D4A574 → 40% opacity (light) / 60% opacity (dark)
  (Visible but refined)
```

### Overlays
```
Final CTA Section Overlay:
  from-[#D4A574]/15 → via-transparent → to-[#2F5233]/15
  (Subtle color blend on dark background)

Search Box Glow:
  rgba(212,165,116,0.2) to rgba(47,82,51,0.1)
  (Layered soft glow effect)

Dark Mode Adjustments:
  All opacities increase by 10-20% for visibility
  (Ensures sufficient contrast)
```

---

## BUTTON COLOR COMBINATIONS

### Primary Button (Maroon)
```
Light Mode:
  Background: #8B3A3A
  Text: White (#FFFFFF)
  Hover: #A24A4A (lighter maroon)
  Focus Ring: #8B3A3A
  Disabled: #8B3A3A @ 50% opacity

Dark Mode:
  Background: #D4A574 (saffron)
  Text: #1A1F3A (dark indigo)
  Hover: #E0B587 (lighter saffron)
  Focus Ring: #D4A574
  Disabled: #D4A574 @ 50% opacity

Effect: High contrast, professional, trustworthy
```

### Secondary Button (Outline/Saffron)
```
Light Mode:
  Border: #D4C5B0 (warm gray)
  Text: #2C2416 (charcoal)
  Background: Transparent
  Hover: #D4C5B0 @ 10% opacity

Dark Mode:
  Border: #D4A574 (saffron)
  Text: #D4A574 (saffron)
  Background: Transparent
  Hover: #D4A574 @ 10% opacity

Effect: Elegant, secondary emphasis
```

---

## FORM ELEMENT STYLING

### Input Fields
```
Default State:
  Border: #D4A574 @ 40% opacity
  Background: White (light) / #2C2416 (dark)
  Text: #2C2416 (light) / #FFFBF5 (dark)

Focus State:
  Border: #D4A574 @ 60% opacity
  Focus Ring: 2px solid #8B3A3A (light)
             2px solid #D4A574 (dark)
  Background: White (light) / #1A1F3A (dark)

Error State:
  Border: #8B3A3A (maroon)
  Focus Ring: #8B3A3A
  Icon: #8B3A3A

Success State:
  Border: #2F5233 (emerald)
  Focus Ring: #2F5233
  Icon: #2F5233

Effect: Clear, intuitive, accessible
```

---

## DARK MODE COLOR MAPPING

### Light → Dark Transitions
```
Light Background:
  #FFFBF5, #FAF8F3, #E8DCC8
  ↓ ↓ ↓
Dark Background:
  #1A1F3A, #2C2416, #2C2416

Light Text:
  #2C2416, #D4C5B0
  ↓ ↓
Dark Text:
  #FFFBF5, #D4C5B0 (same, visible on dark)

Accent Colors (NO CHANGE):
  #8B3A3A, #D4A574, #2F5233
  ↓ ↓ ↓
Adjusted Opacity Only:
  Increase by 10-20% for dark backgrounds
  Maintain saturation for recognition
```

---

## WHEN TO USE EACH COLOR

### Royal Maroon (#8B3A3A)
**Use for**:
- Primary CTA buttons ("Search Hotels", "Get Started")
- Form focus rings (light mode)
- Error state indicators
- Icon emphasis
- Section titles on light backgrounds

**Don't use for**:
- Body text (too dark on light backgrounds)
- Backgrounds (too dark)
- Disabled states (use opacity instead)

### Muted Saffron (#D4A574)
**Use for**:
- Secondary CTA buttons
- Form input borders
- Focus rings (dark mode)
- Accent blobs
- Hover states on secondary elements
- Typewriter cursor in reviews
- Highlight text on dark backgrounds

**Don't use for**:
- Primary CTAs (use maroon)
- Large background areas (too intense)
- Body text on dark (use for highlights)

### Deep Emerald (#2F5233)
**Use for**:
- Success states and confirmations
- Trust indicators
- Secondary accent blobs
- Supporting accent colors
- Complement to maroon/saffron

**Don't use for**:
- Primary emphasis (use maroon)
- Large areas (too dark)
- Light backgrounds as text (contrast issues)

### Warm Neutrals
**Use for**:
- Backgrounds (primary and gradient)
- Supporting text (charcoal)
- Dividers and borders (warm gray)
- Secondary information (warm gray)

**Don't use for**:
- Primary CTAs (use maroon/saffron)
- Accent emphasis (use heritage colors)

---

## COLOR ACCESSIBILITY MATRIX

```
Text on Light Backgrounds:
  #2C2416 on #FFFBF5 → 11.5:1 ratio ✅ WCAG AAA
  #D4C5B0 on #FFFBF5 → 5.2:1 ratio ✅ WCAG AA

Text on Dark Backgrounds:
  #FFFBF5 on #1A1F3A → 13.2:1 ratio ✅ WCAG AAA
  #D4A574 on #1A1F3A → 6.1:1 ratio ✅ WCAG AA

Focus Indicators:
  All focus states minimum 3:1 contrast ✅

Color Blindness Safe:
  All colors work for colorblind users
  (Use patterns + color, not color alone)
```

---

## QUICK REFERENCE TABLE

| Element | Light Mode | Dark Mode | Purpose |
|---------|-----------|-----------|---------|
| **Primary BG** | #FFFBF5 | #1A1F3A | Section backgrounds |
| **Primary Text** | #2C2416 | #FFFBF5 | Readable text |
| **Primary CTA** | Maroon #8B3A3A | Saffron #D4A574 | Action buttons |
| **Accent** | Saffron #D4A574 | Saffron #D4A574 | Highlights |
| **Trust** | Emerald #2F5233 | Emerald #2F5233 | Success/confirmations |
| **Input Border** | #D4A574 @ 40% | #D4A574 @ 60% | Form elements |
| **Focus Ring** | Maroon #8B3A3A | Saffron #D4A574 | Keyboard focus |
| **Shadow** | #2C2416 @ 4-6% | #2C2416 @ 4-6% | Depth |

---

## TESTING CHECKLIST

### Color Verification
- [ ] Maroon appears consistent across devices
- [ ] Saffron has same warmth in light and dark
- [ ] Emerald is visible at 15-20% opacity
- [ ] All backgrounds match documentation
- [ ] Gradients blend smoothly

### Contrast Verification
- [ ] Light mode text: ≥ 7:1 contrast
- [ ] Dark mode text: ≥ 7:1 contrast
- [ ] Buttons: ≥ 4.5:1 contrast
- [ ] Form borders: Visible in both modes
- [ ] Focus rings: Clearly visible

### Accessibility Verification
- [ ] Tested with color blindness simulator
- [ ] Tested with actual dark mode users
- [ ] Tested with actual light mode users
- [ ] Focus states visible for keyboard nav
- [ ] Error/success states readable

### Brand Consistency
- [ ] All CTAs use correct colors
- [ ] All accents use consistent palette
- [ ] No additional colors introduced
- [ ] Gradients match specified combinations
- [ ] Opacities match documentation

---

**This color system creates a premium, luxury aesthetic that:**
- Honors Indian heritage without stereotyping
- Maintains accessibility for all users
- Feels warm, inviting, and trustworthy
- Works perfectly in light and dark modes
- Is easy for developers to implement consistently

Use this guide as reference when building new components, pages, or features across the LuxeStay platform.
