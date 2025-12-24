# Indian Luxury Design System - Do's & Don'ts
## Premium Hospitality Branding Guide

---

## ✅ DO's - Build Luxury

### 1. Color Usage
**DO**:
- ✓ Use muted saffron (#D4A574) for accents and highlights
- ✓ Use maroon (#8B3A3A) for primary CTAs and emphasis
- ✓ Use emerald (#2F5233) for trust and secondary accents
- ✓ Layer warm neutrals (#FFFBF5, #FAF8F3, #E8DCC8) in gradients
- ✓ Keep dark mode warm (charcoal #2C2416, indigo #1A1F3A)
- ✓ Use opacity variations (20%, 30%, 40%) for depth

**Why**: Creates cohesive, premium feeling without overwhelming the user. Warm tones convey hospitality and heritage. Muted colors feel expensive and sophisticated.

---

### 2. Typography & Hierarchy
**DO**:
- ✓ Use serif fonts for main headings (heritage, elegance)
- ✓ Use sans-serif for body text (clarity, modernity)
- ✓ Make headings bold and prominent (#2C2416 or #8B3A3A)
- ✓ Keep body text readable at 14-16px
- ✓ Use proper line-height (1.6+) for luxury feel
- ✓ Add subtle text shadows in dark sections

**Why**: Serif headers look premium and heritage-inspired. High contrast and good spacing communicate respect for the reader. Clean typography builds trust.

---

### 3. Spacing & Layout
**DO**:
- ✓ Use generous padding (32px+) between major sections
- ✓ Leave plenty of white space around important elements
- ✓ Align content to a 12-column grid
- ✓ Use consistent margin ratios (1:2:3)
- ✓ Create clear visual hierarchy with spacing
- ✓ Center key sections, but allow asymmetry where elegant

**Why**: Generous spacing signals premium quality. White space is the most expensive design element. Clear hierarchy guides attention naturally.

---

### 4. Shadows & Depth
**DO**:
- ✓ Use soft, layered shadows (multiple blur radii)
- ✓ Keep shadow opacity low (2-6%)
- ✓ Use shadows to show elevation, not just outline
- ✓ Apply subtle inner shadows to glass-morphic elements
- ✓ Avoid harsh black shadows (use charcoal-based colors)
- ✓ Create depth through layering, not just shadows

**Why**: Subtle shadows feel premium and sophisticated. Harsh shadows feel cheap. Layered approach creates luxury depth.

---

### 5. Texture & Pattern
**DO**:
- ✓ Use barely-visible grain texture (3-6% opacity)
- ✓ Apply jaali patterns at extreme subtlety (1-2% opacity)
- ✓ Let patterns be background, not foreground
- ✓ Use geometric patterns inspired by Indian architecture
- ✓ Keep patterns fixed (don't scroll with content)
- ✓ Use color inheritance (patterns in brand colors)

**Why**: Textures add tactile quality without distraction. Subtle patterns feel intentional and crafted. Fixed patterns are more performant.

---

### 6. Animations & Motion
**DO**:
- ✓ Use slow, gentle animations (7-15 second cycles)
- ✓ Use ease-in-out easing for organic motion
- ✓ Apply animations to secondary elements (blobs, accents)
- ✓ Stagger animations for visual depth
- ✓ Use opacity with movement (combines elegantly)
- ✓ Keep animations continuous (no jarring transitions)

**Why**: Slow motion feels premium. Organic easing looks natural. Staggered timing creates sophistication. Motion shouldn't distract from content.

---

### 7. Interactive Elements
**DO**:
- ✓ Make buttons clearly clickable (sufficient padding, color contrast)
- ✓ Use maroon for primary actions, saffron for secondary
- ✓ Provide clear hover states (scale +2%, color shift)
- ✓ Show focus states for keyboard navigation
- ✓ Provide visual feedback on interaction
- ✓ Make disabled states obvious (lower opacity)

**Why**: Clear interactivity builds confidence. Color consistency helps users predict outcomes. Feedback confirms actions.

---

### 8. Form Design
**DO**:
- ✓ Use saffron borders (#D4A574) on input fields
- ✓ Change focus ring to maroon (#8B3A3A) light, saffron dark
- ✓ Keep labels above inputs (clearer hierarchy)
- ✓ Use placeholder text sparingly
- ✓ Show validation errors in maroon with icon
- ✓ Show success states in emerald
- ✓ Add subtle background color to form fields

**Why**: Consistent borders guide attention. Clear focus states help users. Color-coded feedback is intuitive. Proper labeling aids accessibility.

---

### 9. Dark Mode Implementation
**DO**:
- ✓ Use warm darks (#1A1F3A, #2C2416) instead of pure black
- ✓ Increase saturation of accent colors for visibility
- ✓ Use lighter neutrals for text (#FFFBF5, #FAF8F3)
- ✓ Test all gradients in both modes
- ✓ Ensure sufficient contrast (WCAG AAA)
- ✓ Keep feature parity with light mode

**Why**: Warm darks feel premium and aren't harsh. Increased saturation maintains visual hierarchy. Full testing ensures quality experience.

---

### 10. Accessibility
**DO**:
- ✓ Ensure text contrast ≥ 4.5:1 (WCAG AA minimum)
- ✓ Make all interactive elements keyboard accessible
- ✓ Provide alt text for meaningful images
- ✓ Use semantic HTML structure
- ✓ Test with screen readers
- ✓ Avoid relying on color alone for meaning
- ✓ Respect prefers-reduced-motion setting

**Why**: Accessibility is essential and ethical. It's also good design—clear hierarchy helps everyone. Inclusive design is premium design.

---

## ❌ DON'Ts - Avoid Common Pitfalls

### 1. Color Mistakes
**DON'T**:
- ✗ Use bright tricolor (#F97316 orange, #16A34A green)
- ✗ Mix multiple competing accent colors
- ✗ Use pure black (#000000) anywhere
- ✗ Use pure white (#FFFFFF) on white text
- ✗ Change color system mid-project
- ✗ Use neon or overly saturated colors
- ✗ Apply accent colors uniformly across sections

**Why**: Bright colors feel touristy and cheap. Too many accents are chaotic. Pure black/white are harsh on eyes. Consistency is essential.

**Example of Wrong**:
```tsx
// ❌ DON'T do this
className="bg-[#FF6B35] hover:bg-[#00B4D8]" // Neon orange to bright cyan
```

**Example of Right**:
```tsx
// ✅ DO this
className="bg-[#8B3A3A] hover:bg-[#A24A4A]" // Maroon to lighter maroon
```

---

### 2. Typography Mistakes
**DON'T**:
- ✗ Use all caps for body text (harder to read)
- ✗ Make headings too small (less than 28px on desktop)
- ✗ Use more than 3 font families
- ✗ Set line-height below 1.5 (cramped)
- ✗ Use thin font weights for body text
- ✗ Underline text for emphasis (confuses links)
- ✗ Use colored text on colored backgrounds

**Why**: Readability is paramount. Good typography is invisible—it supports content. Small fonts feel cheap, not premium.

---

### 3. Layout Mistakes
**DON'T**:
- ✗ Crowd content with narrow margins
- ✗ Create asymmetrical layouts without purpose
- ✗ Use full-width text (too hard to read, >80 characters)
- ✗ Place elements arbitrarily
- ✗ Mix different grid systems
- ✗ Forget mobile responsive design
- ✗ Leave large gaps between related content

**Why**: Spacing communicates value. Consistent grids are essential. Responsive design is non-negotiable. Grouping aids comprehension.

---

### 4. Shadow & Depth Mistakes
**DON'T**:
- ✗ Use harsh black shadows (0 0 0 1px #000)
- ✗ Apply same shadow to all elements
- ✗ Create drop shadows with high opacity (>15%)
- ✗ Stack too many layers (creates visual noise)
- ✗ Use shadows instead of proper contrast
- ✗ Apply shadows to text (reduces readability)
- ✗ Forget to test shadow visibility in dark mode

**Why**: Soft shadows feel premium. Harsh shadows feel cheap. Consistent shadows feel intentional. Shadows should enhance, not distract.

---

### 5. Texture & Pattern Mistakes
**DON'T**:
- ✗ Make textures so visible they distract
- ✗ Use patterns that clash with brand colors
- ✗ Apply high-contrast patterns everywhere
- ✗ Use clichéd "Indian" patterns (lotus, mandala everywhere)
- ✗ Make patterns that scroll with content (performance hit)
- ✗ Use stereotypical imagery (elephants, temples, bells)
- ✗ Mix too many different pattern styles

**Why**: Subtlety is sophistication. Patterns should support, not compete. Clichés undermine credibility. Consistency matters.

**Example of Wrong**:
```tsx
// ❌ DON'T - too visible, stereotypical
backgroundImage: 'url(...bright-mandala-pattern...)'
opacity: 0.5 // Way too visible
```

**Example of Right**:
```tsx
// ✅ DO - barely visible, geometric
backgroundImage: 'url(...subtle-jaali-geometry...)'
opacity: 0.015 // Just enough to feel intentional
```

---

### 6. Animation Mistakes
**DON'T**:
- ✗ Use fast animations (feels cheap)
- ✗ Apply animations to all elements
- ✗ Use linear easing (feels robotic)
- ✗ Create jarring transitions between states
- ✗ Animate without a purpose
- ✗ Use multiple simultaneous animations on one element
- ✗ Ignore accessibility (prefers-reduced-motion)
- ✗ Create animations that loop loudly

**Why**: Slow motion feels premium. Organic easing feels natural. Motion should enhance UX, not distract. Accessibility is essential.

---

### 7. Interactive Element Mistakes
**DON'T**:
- ✗ Make buttons too small (<44px touch target)
- ✗ Use subtle colors for primary CTAs
- ✗ Skip hover/focus states
- ✗ Make disabled state look clickable
- ✗ Use text-only buttons without sufficient padding
- ✗ Change button behavior unexpectedly
- ✗ Require hover for necessary information
- ✗ Make links indistinguishable from text

**Why**: Affordance is crucial. Users need to know what's clickable. Feedback confirms action. Accessibility requires clear states.

---

### 8. Form Design Mistakes
**DON'T**:
- ✗ Use placeholder text as labels
- ✗ Make input fields too narrow
- ✗ Skip form validation feedback
- ✗ Use colors alone to show errors/success
- ✗ Make labels float away on focus (confused users)
- ✗ Use red #FF0000 for errors (too harsh)
- ✗ Require passwords without clear requirements
- ✗ Apply animations to form fields (distracting)

**Why**: Clear labeling aids comprehension. Feedback prevents errors. Color + icon is better than color alone. Clarity builds trust.

---

### 9. Dark Mode Mistakes
**DON'T**:
- ✗ Use pure white (#FFFFFF) text on pure black
- ✗ Use cool grays (feels cold, not premium)
- ✗ Copy light mode exactly (different needs)
- ✗ Forget to test with actual dark mode
- ✗ Use low contrast colors (hard to read)
- ✗ Make dark mode an afterthought
- ✗ Change accent colors between modes (confusing)

**Why**: Warm darks feel premium. Dark mode has different readability needs. Users should feel the design was intentional in both modes.

---

### 10. Accessibility Mistakes
**DON'T**:
- ✗ Rely on color alone to convey meaning
- ✗ Make content keyboard inaccessible
- ✗ Skip alt text on meaningful images
- ✗ Use text size < 12px
- ✗ Forget about focus indicators
- ✗ Use vibrating/flashing animations
- ✗ Hide important information in hover states only
- ✗ Use CAPTCHA without alternatives

**Why**: Accessibility is ethical and required by law. It's also good UX—benefits everyone. Inclusive design is premium design.

---

## 🎯 DECISION FRAMEWORK

When making design decisions, ask:

### 1. **Does it feel premium?**
- Would a luxury hotel use this?
- Is it subtle and refined?
- Does it feel intentional?

### 2. **Does it support the content?**
- Is the design helping users understand?
- Are CTAs prominent without being aggressive?
- Is hierarchy clear?

### 3. **Is it accessible?**
- Can all users access this?
- Is contrast sufficient?
- Is it keyboard navigable?

### 4. **Is it culturally respectful?**
- Does it honor Indian heritage without stereotyping?
- Would it feel authentic to Indian users?
- Does it feel appropriative or authentic?

### 5. **Is it performant?**
- Does it load quickly?
- Do animations run smoothly?
- Is it mobile-optimized?

---

## 📋 REVIEW CHECKLIST

Before shipping any changes to the design:

- [ ] Colors match approved palette
- [ ] Text contrast is WCAG AAA
- [ ] All interactive elements have clear states
- [ ] Animations serve a purpose
- [ ] Dark mode looks equally premium
- [ ] Mobile layout is responsive
- [ ] Forms are accessible
- [ ] Patterns don't distract from content
- [ ] Buttons are sufficient size (44px+)
- [ ] Focus indicators are visible
- [ ] No flashing or rapid animations
- [ ] Images have alt text
- [ ] Tested with actual users
- [ ] Tested with assistive technologies

---

## 🎓 DESIGN PHILOSOPHY SUMMARY

The Indian Luxury Hotel Booking Design System is built on three core principles:

### 1. **Understated Elegance**
- More is less
- Subtlety is sophistication
- White space is valuable

### 2. **Authentic Heritage**
- Honor Indian tradition without stereotyping
- Use cultural references sparingly
- Let design language be universal and specific simultaneously

### 3. **User-Centered Excellence**
- Content comes first
- Accessibility is essential
- Every element should earn its space

By following these do's and don'ts, you'll create a design system that feels like a luxury Indian hotel—warm, welcoming, refined, and utterly confident in its identity.

---

**Remember**: The goal is to create an experience that makes users feel:
- Welcomed and valued
- Confident in the platform
- Eager to book their next stay
- Proud to recommend the service

When in doubt, choose simplicity, elegance, and warmth.
