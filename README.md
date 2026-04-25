# ✦ To Do List

A clean, minimal to-do list app built with vanilla HTML, CSS, and JavaScript — styled with a warm earthy palette of Rosy Copper, Coral Glow, Powder Blush, Dry Sage, and Muted Teal.

---

## Preview

```
┌─────────────────────────────────────────┐
│  ✦  │  Saturday, April 25               │
│     │  My Tasks                         │
│ All │  ████████░░░░  2 / 3 done         │
│ Act │                                   │
│ Done│  [ What needs to be done? ] [Add] │
│     │  ○  Try adding a task above!      │
│     │  ● ~~Click the circle to mark~~   │
└─────────────────────────────────────────┘
```

---

## Features

- **Add tasks** — type and press `Enter` or click Add
- **Complete tasks** — click the circle checkbox to toggle done/undone
- **Delete tasks** — hover a task to reveal the × button
- **Filter view** — sidebar tabs for All / Active / Done
- **Progress bar** — live completion percentage at the top
- **Auto priority** — tasks are colour-coded automatically:
  - End with `!` or include `urgent`/`asap` → 🔴 High (Rosy Copper)
  - End with `?` or include `maybe`/`later` → 🟢 Low (Muted Teal)
  - Everything else → 🟡 Medium (Dry Sage)
- **Persistent storage** — tasks survive page refresh via `localStorage`
- **Clear done** — one-click button to remove all completed tasks

---

## Colour Palette

| Name         | Hex       | Used for                              |
|--------------|-----------|---------------------------------------|
| Rosy Copper  | `#DD614A` | Sidebar, Add button, high priority    |
| Coral Glow   | `#F48668` | Hover borders, input focus ring       |
| Powder Blush | `#F4A698` | Placeholders, checkboxes, delete icon |
| Dry Sage     | `#C5C392` | Medium priority dot                   |
| Muted Teal   | `#73A580` | Done checkboxes, progress bar, low priority |

---

## File Structure

```
todo/
├── index.html   — markup and layout
├── style.css    — all styles and palette variables
├── script.js    — task logic, filtering, localStorage
└── README.md    — this file
```

---

## Getting Started

No build tools, no dependencies, no install needed.

1. Download or clone the `todo/` folder
2. Open `index.html` in any modern browser
3. Start adding tasks

```bash
# If you have Python installed, you can also serve it locally:
python -m http.server 8080
# then open http://localhost:8080
```

---

## How It Works

### Adding a task
Type in the input field and press `Enter` or click **Add**. The app reads the text, assigns a priority, and prepends it to the list. Tasks are saved to `localStorage` immediately.

### Priority detection
The app scans the task text on creation:

```js
if (text.endsWith('!') || text.includes('urgent')) priority = 'high';
else if (text.endsWith('?') || text.includes('maybe')) priority = 'low';
else priority = 'medium';
```

Priority is shown as a small coloured dot on the right of each task.

### localStorage
All tasks are stored as a JSON array under the key `gm_tasks`. They persist across page refreshes and browser restarts until cleared.

---

## Customisation

All colours are defined as CSS variables at the top of `style.css`:

```css
:root {
  --rosy:  #DD614A;
  --coral: #F48668;
  --blush: #F4A698;
  --sage:  #C5C392;
  --teal:  #73A580;
}
```

Change any value there and the whole UI updates consistently.

---

## Browser Support

Works in all modern browsers — Chrome, Firefox, Safari, Edge. No polyfills required.

---

*Built with ♥ using plain HTML, CSS & JS — no frameworks, no dependencies.*
