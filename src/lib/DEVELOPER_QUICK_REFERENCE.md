# 🚀 DEVELOPER QUICK REFERENCE CARD
## LuxeStay Premium Design System - Copy & Paste Guide

---

## INSTANT COLOR REFERENCE

### Copy These Colors Into Your Code

```tsx
// PRIMARY COLORS
const colors = {
  // Warm Neutrals
  ivory: '#FFFBF5',
  cream: '#FAF8F3', 
  sandstone: '#E8DCC8',
  warmGray: '#D4C5B0',
  charcoal: '#2C2416',
  
  // Heritage Accents
  maroon: '#8B3A3A',      // Primary CTA
  saffron: '#D4A574',     // Secondary CTA
  emerald: '#2F5233',     // Trust/Success
  indigo: '#1A1F3A',      // Dark mode bg
};
```

---

## COPY-PASTE TAILWIND CLASSES

### Button Components

```tsx
// PRIMARY BUTTON (Maroon in light, Saffron in dark)
<button className="bg-[#8B3A3A] hover:bg-[#A24A4A] dark:bg-[#D4A574] dark:hover:bg-[#E0B587] text-white dark:text-[#1A1F3A] font-bold py-3 px-6 rounded-lg">
  Get Started
</button>

// SECONDARY BUTTON (Outline)
<button className="border border-[#D4C5B0] dark:border-[#D4A574] text-[#2C2416] dark:text-[#D4A574] font-bold py-3 px-6 rounded-lg hover:bg-[#D4C5B0]/10">
  Learn More
</button>

// DISABLED BUTTON
<button disabled className="bg-[#8B3A3A] dark:bg-[#D4A574] opacity-50 text-white dark:text-[#1A1F3A] font-bold py-3 px-6 rounded-lg cursor-not-allowed">
  Processing...
</button>
```

### Input Fields

```tsx
// TEXT INPUT
<input 
  type="text"
  placeholder="Enter text"
  className="px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#2C2416] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574]"
/>

// EMAIL INPUT
<input 
  type="email"
  placeholder="your@email.com"
  className="px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#2C2416] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574]"
/>

// SELECT/DROPDOWN
<select className="px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#2C2416] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574]">
  <option>Choose option</option>
</select>

// TEXTAREA
<textarea 
  placeholder="Your message here..."
  className="px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#2C2416] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574] resize-none"
/>
```

### Background Sections

```tsx
// HERO SECTION
<section className="bg-gradient-to-br from-[#FFFBF5] via-[#FAF8F3] to-[#E8DCC8] dark:from-[#1A1F3A] dark:via-[#2C2416] dark:to-[#1A1F3A]">
  {/* content */}
</section>

// MINIMAL SECTION
<section className="bg-gradient-to-b from-[#FFFBF5] via-white to-[#FAF8F3] dark:from-[#2C2416]/30 dark:via-[#1A1F3A] dark:to-[#2C2416]/30">
  {/* content */}
</section>

// DARK PREMIUM SECTION
<section className="bg-gradient-to-b from-[#2C2416] via-[#1A1F3A] to-[#2C2416] dark:from-[#1A1F3A] dark:via-[#2C2416] dark:to-[#1A1F3A]">
  {/* content */}
</section>
```

### Accent Elements

```tsx
// FLOATING ACCENT BLOB (Saffron)
<div className="absolute w-96 h-96 bg-gradient-to-br from-[#D4A574]/25 to-transparent dark:from-[#D4A574]/15 rounded-full blur-3xl float-blob-1"></div>

// FLOATING ACCENT BLOB (Emerald)
<div className="absolute w-96 h-96 bg-gradient-to-br from-[#2F5233]/20 to-transparent dark:from-[#2F5233]/12 rounded-full blur-3xl float-blob-2"></div>

// FLOATING ACCENT BLOB (Maroon)
<div className="absolute w-96 h-96 bg-gradient-to-br from-[#8B3A3A]/15 to-transparent dark:from-[#8B3A3A]/8 rounded-full blur-3xl float-blob-3"></div>

// DECORATIVE DIVIDER
<div className="h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent opacity-30"></div>

// ACCENT BORDER
<div className="border-b-2 border-[#D4A574] opacity-40"></div>
```

---

## ANIMATION COPY-PASTE

### Add to Your `<style>` Tag

```css
/* Floating animations */
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.35; }
  50% { transform: translateY(-25px) scale(1.03); opacity: 0.55; }
}

@keyframes floatSlowReverse {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
  50% { transform: translateY(25px) scale(1.02); opacity: 0.5; }
}

/* Apply to elements */
.float-blob-1 { animation: floatSlow 8s ease-in-out infinite; }
.float-blob-2 { animation: floatSlowReverse 7s ease-in-out infinite; }
.float-blob-3 { animation: floatSlow 9s ease-in-out infinite; }
```

### Scroll Fade-in Animation

```tsx
const FadeInSection = ({ children, delay = '0s', direction = 'up' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const getTransform = () => {
    if (!isVisible) {
      if (direction === 'up') return 'translateY(20px)';
      if (direction === 'left') return 'translateX(-20px)';
      if (direction === 'right') return 'translateX(20px)';
    }
    return 'none';
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease-out ${delay}, transform 0.8s ease-out ${delay}`,
      }}
    >
      {children}
    </div>
  );
};
```

---

## DARK MODE QUICK SETUP

### Apply Everywhere

```tsx
// Text that changes for dark mode
<h1 className="text-[#2C2416] dark:text-[#FFFBF5]">Heading</h1>

// Background that changes
<div className="bg-[#FFFBF5] dark:bg-[#1A1F3A]">Content</div>

// Button that inverts colors
<button className="bg-[#8B3A3A] dark:bg-[#D4A574] text-white dark:text-[#1A1F3A]">
  Click Me
</button>

// Border that becomes lighter in dark
<input className="border border-[#D4A574]/40 dark:border-[#D4A574]/60" />
```

---

## SHADOW COPY-PASTE

### Soft Luxury Shadows

```tsx
// LIGHT SHADOW (Cards)
<div className="shadow-lg" style={{
  boxShadow: `
    0 2px 4px rgba(44,36,22,0.06),
    0 4px 8px rgba(44,36,22,0.04),
    0 8px 16px rgba(44,36,22,0.02)
  `
}}>
  {/* content */}
</div>

// DARK MODE SHADOW
className="dark:shadow-black/50"
```

---

## QUICK COLOR MATRIX

### Use This Table to Pick Colors

| Component | Light Mode | Dark Mode | Hover |
|-----------|-----------|-----------|-------|
| **Primary Button** | #8B3A3A | #D4A574 | Lighter |
| **Secondary Button** | Outline | #D4A574 | #D4A574/10 |
| **Input Border** | #D4A574/40 | #D4A574/60 | Same |
| **Focus Ring** | #8B3A3A | #D4A574 | N/A |
| **Background** | #FFFBF5 | #1A1F3A | N/A |
| **Text** | #2C2416 | #FFFBF5 | N/A |
| **Accent** | #D4A574 | #D4A574 | Lighter |

---

## COMMON PATTERNS

### Error State
```tsx
<div className="text-[#8B3A3A] dark:text-[#A24A4A]">
  ✗ This field is required
</div>
```

### Success State
```tsx
<div className="text-[#2F5233] dark:text-[#5FA85E]">
  ✓ Successfully saved
</div>
```

### Disabled State
```tsx
<button disabled className="opacity-50 cursor-not-allowed">
  Disabled Button
</button>
```

### Loading State
```tsx
<button className="flex items-center gap-2">
  <span className="animate-spin">⟳</span>
  Loading...
</button>
```

### Hover Effect
```tsx
<button className="hover:scale-105 hover:shadow-lg transition-all duration-200">
  Hover Me
</button>
```

---

## FORM VALIDATION

### Complete Form Example

```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleEmail = (e) => {
  const value = e.target.value;
  setEmail(value);
  
  if (!value.includes('@')) {
    setError('Please enter a valid email');
  } else {
    setError('');
  }
};

return (
  <div>
    <input
      value={email}
      onChange={handleEmail}
      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
        error 
          ? 'border-[#8B3A3A] focus:ring-[#8B3A3A]' 
          : 'border-[#D4A574]/40 focus:ring-[#8B3A3A]'
      }`}
    />
    {error && <p className="text-[#8B3A3A] text-sm mt-2">{error}</p>}
  </div>
);
```

---

## RESPONSIVE CLASSES

```tsx
// Mobile first approach
<div className="p-4 md:p-8 lg:p-16 text-sm md:text-base lg:text-lg">
  {/* Responsive padding and text */}
</div>

// Hidden on mobile, visible on desktop
<div className="hidden md:block">
  {/* Desktop only */}
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive columns */}
</div>
```

---

## FREQUENTLY USED HEX CODES

Bookmark these for quick reference:

```
#FFFBF5 - Ivory (light bg)
#8B3A3A - Maroon (primary CTA)
#D4A574 - Saffron (secondary CTA, accents)
#2F5233 - Emerald (success/trust)
#1A1F3A - Indigo (dark bg)
#2C2416 - Charcoal (dark text/secondary)
```

---

## TEMPLATE FOR NEW COMPONENTS

```tsx
// New component template with design system colors
function NewComponent() {
  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1A1F3A] p-8">
      {/* Light background, dark mode support */}
      
      <h2 className="text-[#2C2416] dark:text-[#FFFBF5] text-2xl font-bold mb-4">
        Heading
      </h2>
      
      <p className="text-[#D4C5B0] dark:text-[#D4C5B0] mb-6">
        Supporting text
      </p>
      
      <button className="bg-[#8B3A3A] hover:bg-[#A24A4A] dark:bg-[#D4A574] dark:hover:bg-[#E0B587] text-white dark:text-[#1A1F3A] font-bold py-3 px-6 rounded-lg">
        Action Button
      </button>
    </div>
  );
}
```

---

## DEBUGGING TIPS

### Colors Look Wrong?
```
1. Check dark mode toggle
2. Verify Tailwind config includes custom colors
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check DevTools color picker
5. Compare hex code character by character
```

### Focus Ring Missing?
```
Make sure you have:
focus:outline-none
focus:ring-2
focus:ring-[#8B3A3A] or focus:ring-[#D4A574]
```

### Dark Mode Not Working?
```
Verify you have:
1. dark: prefix on classes
2. Dark mode enabled in Tailwind config
3. HTML has dark class when needed
4. All components have both light AND dark versions
```

---

## PERFORMANCE NOTES

- ✅ All hex colors are performant
- ✅ Gradients use standard Tailwind
- ✅ Animations use transform (GPU accelerated)
- ✅ Shadows are minimal and optimized
- ✅ No external image dependencies needed

---

## FINAL CHECKLIST FOR NEW COMPONENTS

- [ ] Uses only colors from the palette
- [ ] Has dark mode support (dark: classes)
- [ ] Buttons use #8B3A3A or #D4A574
- [ ] Inputs have saffron borders
- [ ] Focus states are visible
- [ ] Text meets contrast standards
- [ ] Works on mobile (responsive)
- [ ] Follows spacing conventions
- [ ] No hardcoded colors outside palette

---

**Print or bookmark this page for quick reference during development!** 📌

All color codes, animations, and patterns ready to copy and paste.
