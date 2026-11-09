# KG Coffee Studio - Kawaii Drag-and-Drop Kitchen Upgrade

Rebrand the application to "KG Coffee Studio" and introduce an ultra-cute, tactile ingredient dragging system where users physically pick up and drop kawaii kitchen items (coffee spoon, sugar bowl, water kettle, ice cubes, milk carton, spice shaker) into the mug with bouncy physics, sound effects, and snap-back returns.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following enhancements were confirmed during Phase 1 clarification:
> - **Brand Name**: Updated to **KG Coffee Studio** across all headers, cards, titles, and toasts.
> - **Ingredient Dragging Style**: Floating actual kawaii ingredient objects with bouncy physics, tilt on drag, and tactile sound effects.
> - **Counter Layout**: A cozy wooden/pastel kitchen counter beside the cup where cute physical items sit and snap back smoothly if dropped outside the target zone.

- **Confirmed Decision 1**: Interactive kawaii SVG/motion props for each step:
  - Coffee: Cute wooden spoon loaded with dark coffee granules.
  - Sugar: Sweet pastel sugar scoop/bowl with sparkling crystals.
  - Water: Miniature pastel kettle that tilts when dragged near the cup.
  - Frother: Kawaii electric whisk that lowers directly into the foam.
  - Ice: Crystalline smiling ice cubes that bounce and drop with a clink.
  - Milk: Adorable pastel strawberry-milk carton that pours smooth cream.
  - Cinnamon & Vanilla: Cute spice shaker and syrup bottle that dust and drizzle.
- **Confirmed Decision 2**: Fallback click/tap affordance remains available so mobile users or quick players can still simply tap the ingredient or action button to pour automatically.

---

### 1. Overview & Core Concept

- **What It Does**: Upgrades the brewing studio from standard button clicks into an immersive, hands-on pastel kitchen experience. Users can reach over to the kitchen counter, grab realistic/kawaii ingredient props with their mouse or finger, drag them right over the mug with live magnetic suction/glow feedback, and release to pour or drop them in.
- **Target Audience / Persona**: Users who love cozy tactile cooking games (like Cooking Mama, Good Pizza Great Pizza, and cozy cafe simulators) with cute pastel aesthetics.
- **Key Value**: Dramatically elevates interactivity from a linear slideshow into a playful toy-like simulation with tactile joy.

---

### 2. User Experience & Visual Design

#### Kitchen Counter & Draggable Prop Visuals
- **The Cozy Kitchen Counter**:
  - Positioned beside the main mug on desktop (and right above/below on mobile).
  - Styled with a warm cream/pastel countertop trim, soft shadow, and dedicated prop pedestals.
- **Interactive Drag Gestures**:
  - **On Hover / Touch Start**: Prop scales up with a cheerful bounce (`scale: 1.1`, shadow expands, playful tilt).
  - **While Dragging**: Prop tilts following the drag motion direction (`rotate: 10deg`), leaves subtle pastel sparkle particles, and plays a soft paper/cloth pick-up sound.
  - **Over Mug Hotzone**: Mug rim pulses with a warm golden/pink magnetic ring; helper text says *"Drop to pour!"*.
  - **On Drop Success**: Prop pours/drops particles into the mug, sound triggers, and prop smoothly vanishes or resets.
  - **On Drop Cancel (Outside Cup)**: Prop springs back to its counter pedestal with an elastic snap-back animation (`transition: { type: 'spring', damping: 15 }`).

#### Rebranding to "KG Coffee Studio"
- Top navigation brand mark: **KG Coffee Studio ☕**
- Hero taglines: *"Welcome to KG Coffee Studio · wanna make coffee?"*
- Preloader, recipe cards, and final completion screen all display the official **KG Coffee Studio** artisan crest.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Native Pointer & Motion Dragging vs HTML5 Drag-and-Drop**:
  - *Chosen Approach*: Use pointer event listeners / `motion` drag gestures with bounding-box collision detection.
  - *Why*: HTML5 Drag and Drop (`dragstart`/`dragover`) is notoriously clunky on mobile touchscreens and renders semi-transparent ghost images without custom CSS rotations. Motion/pointer dragging gives smooth 60fps physics, full rotation, and seamless touch screen support.
- **Decision 2: Dual Interaction (Physical Drag + Quick Tap)**:
  - *Chosen Approach*: Tapping an ingredient also immediately performs the pour action.
  - *Why*: Guarantees zero friction for users on smaller phone screens or users with accessibility needs who prefer single-tap interactions.

---

### 4. Technical Architecture & Data Strategy (Technical Reference)

```
┌─────────────────────────────────────────────────────────────┐
│                      BrewingStudio                          │
│                                                             │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │ Cozy Ingredient Shelf │       │ Interactive Cup Zone  │  │
│  │                       │       │                       │  │
│  │ [Spoon / Granules] ───┼─Drag──┼─> [Mug Target Rect]   │  │
│  │ [Sugar Bowl]          │       │   - Magnetic Ring     │  │
│  │ [Milk Carton]         │       │   - Collision Trigger │  │
│  │ [Ice Cube]            │       │   - Liquid Reaction   │  │
│  │ [Spice Shaker]        │       │                       │  │
│  └───────────────────────┘       └───────────────────────┘  │
│             │                                               │
│  ┌──────────▼────────────────────────────────────────────┐  │
│  │ Sound Engine: Clinks, Sprinkles, Pours, Swirls        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

- **Collision Detection**: `getBoundingClientRect()` checks whether the dragged prop's center overlaps the cup bounding box within a generous hit tolerance.
- **Props State**: Active step highlights the specific current ingredient on the shelf, disabling future ingredients until prerequisites are satisfied.
