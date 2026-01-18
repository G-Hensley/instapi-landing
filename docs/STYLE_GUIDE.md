# InstAPI Design Style Guide

This document defines the visual design system for InstAPI. Reference this when creating or modifying UI components.

---

## Color Palette

### Brand Gradients
The primary visual identity uses a progression of gradients:

```
Gradient 1: emerald-500 → cyan-500    (start/primary)
Gradient 2: cyan-500 → blue-500       (secondary)
Gradient 3: blue-500 → violet-500     (tertiary)
Gradient 4: violet-500 → pink-500     (accent/end)
```

**Text gradient variants** use 400-level colors for better visibility on dark backgrounds:
- `from-emerald-400 to-cyan-400`
- `from-cyan-400 to-blue-400`
- `from-blue-400 to-violet-400`
- `from-violet-400 to-pink-400`

### Background Colors
| Use Case | Color |
|----------|-------|
| Page background | `bg-black` or `bg-zinc-950` (alternate sections) |
| Card background | `bg-zinc-900/30` or `bg-zinc-900/40` |
| Elevated surface | `bg-zinc-800/30` |
| Border default | `border-zinc-800/50` |
| Border hover | `border-zinc-700/50` |

### Text Colors
| Use Case | Color |
|----------|-------|
| Headings | `text-white` |
| Body text | `text-zinc-400` |
| Muted/secondary | `text-zinc-500` |
| Accent text | Gradient text with `bg-clip-text text-transparent` |

---

## Typography

### Font Stack
- Primary: System fonts (Next.js default)
- Code/mono: `font-mono`

### Heading Sizes
```tsx
// Hero headline
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"

// Section headers
className="text-3xl sm:text-4xl font-bold"

// Card titles
className="text-lg font-semibold" // or text-xl for emphasis

// Subsection titles
className="text-base font-medium"
```

### Body Text
```tsx
// Section descriptions
className="text-zinc-400 max-w-xl mx-auto"

// Card descriptions
className="text-sm text-zinc-400 leading-relaxed"

// Small labels
className="text-xs text-zinc-500"
```

---

## Component Patterns

### Section Layout
Every major section follows this structure:

```tsx
<section className="relative py-24 px-6 bg-black">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <motion.div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Section Title
      </h2>
      <p className="text-zinc-400 max-w-xl mx-auto">
        Section description text.
      </p>
    </motion.div>

    {/* Content */}
    <div className="grid ...">
      {/* Cards/items */}
    </div>
  </div>
</section>
```

Alternate section backgrounds between `bg-black` and `bg-zinc-950` for visual separation.

### Card Styles

#### Standard Card
Used in HowItWorks, Problem sections:

```tsx
<div className="relative bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all h-full">
  {/* Content */}
</div>
```

#### Card with Left Accent Border
Used in Features section for emphasis:

```tsx
<div className="relative h-full bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all overflow-hidden">
  {/* Gradient accent line */}
  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

  <div className="pl-4">
    {/* Content */}
  </div>
</div>
```

### Badges & Pills

#### Outlined Gradient Badge (Numbers/Icons)
Used for step numbers and icon containers:

```tsx
<span className="relative flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
  {/* Gradient border */}
  <span className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-lg`} />
  {/* Dark inner background */}
  <span className="absolute inset-[1.5px] bg-zinc-900 rounded-[6px]" />
  {/* Content (number or icon) */}
  <span className={`relative text-sm font-bold bg-gradient-to-br ${gradientText} bg-clip-text text-transparent`}>
    01
  </span>
</span>
```

#### Outlined Pill Badge
Used for feature highlights:

```tsx
<span className="relative text-xs font-medium rounded-full overflow-hidden">
  {/* Gradient border */}
  <span className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full`} />
  {/* Dark inner background */}
  <span className="absolute inset-[1px] bg-zinc-900 rounded-full" />
  {/* Gradient text */}
  <span className={`relative block px-2.5 py-1 bg-gradient-to-r ${gradientText} bg-clip-text text-transparent`}>
    Label
  </span>
</span>
```

#### Status Dot
Used in hero bullet points:

```tsx
<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
```

### Buttons

#### Primary CTA (Gradient with Glow)
```tsx
<a href="#" className="group relative">
  {/* Glow effect */}
  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

  {/* Button */}
  <span className="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
    Button Text
    {/* Optional arrow icon */}
  </span>
</a>
```

#### Secondary Button (Outlined)
```tsx
<a href="#" className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-zinc-100 rounded-xl border border-zinc-700/80 bg-zinc-900/40 hover:bg-zinc-900 transition-colors">
  Button Text
</a>
```

---

## Animation Patterns

### Scroll Animations (Framer Motion)
All sections use consistent entrance animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
```

For staggered items (cards in a grid):
```tsx
transition={{ duration: 0.5, delay: index * 0.1 }}
```

### Background Orbs (Hero)
Floating gradient orbs use slow, subtle movement:

```tsx
<motion.div
  animate={{
    x: [0, 100, 0],
    y: [0, -50, 0],
  }}
  transition={{
    duration: 20,  // Very slow
    repeat: Infinity,
    ease: "linear",
  }}
  className="absolute ... w-96 h-96 bg-emerald-500/30 rounded-full blur-[128px]"
/>
```

### Glowing Effects
Pulsing glow for code blocks or feature highlights:

```tsx
<motion.div
  animate={{
    opacity: [0.5, 0.8, 0.5],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute -inset-4 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl"
/>
```

---

## Icons

### Style Guidelines
- Use outline/stroke icons (not filled)
- Stroke width: 2 (default) or 1.5 for lighter feel
- Size: `w-4 h-4` in badges, `w-5 h-5` in buttons, `w-6 h-6` standalone

### Color in Badges
When icons are inside outlined gradient badges, use solid colors matching the gradient's primary color:

```tsx
// For emerald-cyan gradient badge
<svg className="w-4 h-4 text-emerald-400" ...>

// For cyan-blue gradient badge
<svg className="w-4 h-4 text-cyan-400" ...>

// For blue-violet gradient badge
<svg className="w-4 h-4 text-blue-400" ...>
```

---

## Spacing System

### Section Padding
- Vertical: `py-24` (96px)
- Horizontal: `px-6` (24px)

### Content Max Width
- Standard sections: `max-w-6xl mx-auto`
- Narrow content: `max-w-4xl mx-auto` or `max-w-2xl mx-auto`
- Text blocks: `max-w-xl mx-auto`

### Grid Gaps
- Card grids: `gap-5` or `gap-6`
- Tight grids: `gap-3`

### Component Spacing
- Section header margin: `mb-16`
- Card padding: `p-6`
- Between title and description: `mb-3` or `mb-4`

---

## Responsive Breakpoints

Follow Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Common Patterns
```tsx
// Grid columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"

// Text sizing
className="text-3xl sm:text-4xl"

// Flex direction
className="flex flex-col sm:flex-row"
```

---

## Code Block Styling

For displaying code examples:

```tsx
<div className="relative bg-zinc-900/90 border border-zinc-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
  {/* Window controls */}
  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50 bg-zinc-900/50">
    <div className="w-3 h-3 rounded-full bg-red-500/80" />
    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
    <div className="w-3 h-3 rounded-full bg-green-500/80" />
    <span className="ml-2 text-xs text-zinc-500 font-mono">filename.ts</span>
  </div>

  {/* Code content */}
  <div className="p-4 font-mono text-sm text-left overflow-x-auto">
    {/* Syntax highlighted code */}
  </div>
</div>
```

### Syntax Highlighting Colors
- Keywords: `text-purple-400`
- Strings: `text-emerald-400`
- Functions: `text-yellow-400`
- Operators: `text-cyan-400`
- Comments: `text-zinc-500`
- Default text: `text-zinc-300`

---

## Voice & Tone

### Writing Style
- Developer-to-developer: Direct, technical, no fluff
- Confident but not arrogant
- Short sentences preferred
- Avoid corporate jargon ("leverage", "synergy", "solutions")
- Use contractions naturally ("you're", "it's", "don't")

### Headline Patterns
- Lead with benefit: "Ship backends in minutes, not days"
- Be specific: "20+ hours" not "a long time"
- Use strong verbs: "Generate", "Deploy", "Own"

### Description Patterns
- Keep under 2-3 sentences
- End with impact, not features
- Use "you" language, not "we" language

---

## Don'ts

1. **Don't use solid-filled gradient backgrounds** for badges/icons - use outlined style
2. **Don't use red/orange/yellow** outside of specific warning contexts
3. **Don't center-align card content** - keep text left-aligned within cards
4. **Don't add borders AND left accent lines** - choose one
5. **Don't use more than 4 gradient colors** in the progression
6. **Don't use opacity lower than 0.3** for gradient backgrounds (too faint)
7. **Don't exceed 2 levels of nesting** for visual effects (border + inner bg is max)
