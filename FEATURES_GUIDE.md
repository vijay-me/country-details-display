# 🎨 Application Features & UI Guide

## Visual Layout

```
┌─────────────────────────────────────────────────────────┐
│                  Country Details Display                 │
│           Explore country information from the world     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Filter by Name: [Search by country name...        ]    │
│  Filter by Currency: [Search by currency...        ]    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Additional Columns: [Select a field... ▼]  [Show]      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Total Countries: 250     Active Columns: 8/10          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Name ▼ │Capital │Currencies│Flag│Languages│...│Region   │
├────────┼────────┼──────────┼────┼─────────┼───┼─────────┤
│ Aruba  │Oranjes.│AWG       │🇦🇼 │Dutch... │...│Americas │
│ Afghan.│Kabul   │AFN       │🇦🇫 │Dari ... │...│Asia     │
│ Angola │Luanda  │AOA       │🇦🇴 │Portug...│...│Africa   │
│  ...   │  ...   │   ...    │ ...│   ...   │...│  ...    │
│ (10 rows per page)                                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│    [Previous]  1  2  3 ... 25  [Next]                   │
│    Page 1 of 25 | Showing 1-10 of 250                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Data provided by REST Countries API                    │
└─────────────────────────────────────────────────────────┘
```

## Feature Demonstrations

### 1. Filtering by Name
```
Before: Shows all 250 countries
Type "united" → Shows only:
  - United States
  - United Kingdom
  - United Arab Emirates
```

### 2. Filtering by Currency
```
Before: Shows all countries
Type "dollar" → Shows countries with:
  - US Dollar
  - Canadian Dollar
  - Australian Dollar
  - Singapore Dollar, etc.
```

### 3. Sorting Columns
```
Click "Name" header:
  First click:  A → Z (Ascending ▲)
  Second click: Z → A (Descending ▼)

Click "Population" header:
  First click:  Low → High
  Second click: High → Low
```

### 4. Adding Additional Columns

**Step-by-step:**
```
1. Current columns: 8 (name, capital, currencies, flag, 
                       languages, continents, region, timezones)

2. Click dropdown "Additional Columns"
   Available options appear:
   - Population
   - Area
   - Borders
   - Independent
   - UN Member
   - ... (27 total options)

3. Select "Population"

4. Click "Show" button

5. Table refreshes:
   New layout: 9 columns (added Population on right)
   API call: /all?fields=name,capital,...,population

6. Dropdown updates:
   "Population" removed from options
   26 options remaining
```

### 5. Maximum Column Validation

**Scenario:**
```
Current: 8 columns
Add #1:  Population → 9 columns ✅
Add #2:  Area       → 10 columns ✅
Try #3:  Borders    → ❌ ERROR!

Error Message (Red):
┌────────────────────────────────────────┐
│ ⚠ Maximum number of columns reached   │
└────────────────────────────────────────┘

Show button: DISABLED (grey)
```

## UI Components Breakdown

### Header Section
- **Background:** Purple gradient (#667eea to #764ba2)
- **Text:** White, centered
- **Font:** Large, bold title + subtitle

### Filter Section
- **Layout:** 2-column grid (responsive to 1-column on mobile)
- **Inputs:** White background, rounded corners
- **Focus:** Blue border highlight
- **Real-time:** Updates as you type

### Additional Columns Control
- **Dropdown:** Full width on mobile, auto-width on desktop
- **Button:** Purple gradient, hover effect (lifts up)
- **Disabled state:** Grey when no selection or max reached

### Table
- **Header:** Purple gradient, white text, sticky on scroll
- **Rows:** White background, grey hover effect
- **Borders:** Subtle grey lines
- **Responsive:** Horizontal scroll on small screens

### Pagination
- **Buttons:** White with purple border
- **Active page:** Purple background
- **Hover:** Purple text
- **Disabled:** Grey, non-clickable

### Error Messages
- **Background:** Light red
- **Text:** Dark red
- **Border:** Red left accent
- **Icon:** Warning symbol

## Responsive Breakpoints

### Desktop (>1024px)
```
┌─────────────────────────────────────────────┐
│ [Full width table, side-by-side filters]   │
│ [All columns visible]                       │
│ [Hover effects active]                      │
└─────────────────────────────────────────────┘
```

### Tablet (768-1024px)
```
┌───────────────────────────────────┐
│ [Slightly narrower layout]       │
│ [Table scrolls horizontally]     │
│ [Touch-friendly buttons]         │
└───────────────────────────────────┘
```

### Mobile (480-768px)
```
┌─────────────────────┐
│ [Stacked filters]  │
│ [Full-width inputs]│
│ [Scrollable table] │
│ [Large tap targets]│
└─────────────────────┘
```

### Small Mobile (<480px)
```
┌──────────────┐
│ [Compact]   │
│ [Smaller]   │
│ [fonts]     │
│ [Optimized] │
└──────────────┘
```

## Color Palette

```
Primary Purple:    #667eea ████
Secondary Purple:  #764ba2 ████
Dark Text:        #2d3748 ████
Light Text:       #718096 ████
Border Grey:      #e2e8f0 ████
Background Grey:  #f7fafc ████
Success Green:    #48bb78 ████
Error Red:        #f56565 ████
Link Blue:        #3182ce ████
White:            #ffffff ████
```

## Data Display Examples

### Simple Fields
```
Name:      "United States"
Capital:   "Washington, D.C."
Region:    "Americas"
```

### Array Fields
```
Continents: "North America, South America"
Timezones:  "UTC-12:00, UTC-11:00, UTC-10:00, ..."
Borders:    "CAN, MEX"
```

### Object Fields
```
Currencies: "United States Dollar ($)"
Languages:  "English"
IDD:        "+1"
```

### Boolean Fields
```
Independent: "Yes"
UN Member:   "Yes"
Landlocked:  "No"
```

### Numeric Fields
```
Population: "331,900,000"
Area:       "9,372,610 km²"
```

### Image Fields
```
Flag:       🇺🇸 (emoji)
Flags:      [image thumbnail]
Coat:       [image thumbnail]
```

### Link Fields
```
Maps:       "View Map" (clickable link)
```

### Missing Data
```
Any field:  "-"
```

## Interaction Patterns

### Hover States
- **Table rows:** Light grey background
- **Buttons:** Lift up 2px, shadow appears
- **Column headers:** Subtle highlight
- **Links:** Underline appears

### Focus States
- **Inputs:** Blue border + shadow
- **Buttons:** Blue outline
- **Dropdown:** Blue border + shadow

### Active States
- **Page number:** Purple background
- **Sort column:** Shows indicator
- **Pressed button:** Pushes down

### Loading States
```
┌────────────────────────────┐
│  Loading country data...   │
│  (centered, animated)      │
└────────────────────────────┘
```

### Error States
```
┌────────────────────────────────────┐
│  Failed to fetch country data.    │
│  Please try again later.          │
│  (red background, centered)       │
└────────────────────────────────────┘
```

## Accessibility Features

- ✅ **Semantic HTML:** `<table>`, `<header>`, `<footer>`, `<main>`
- ✅ **ARIA Labels:** All interactive elements labeled
- ✅ **Keyboard Nav:** Tab through all controls
- ✅ **Focus Visible:** Clear focus indicators
- ✅ **Color Contrast:** WCAG AA compliant
- ✅ **Alt Text:** Images have descriptions
- ✅ **Screen Readers:** Proper announcements

## Performance Features

- ⚡ **Memoization:** Prevents unnecessary re-renders
- ⚡ **Pagination:** Only 10 rows rendered at once
- ⚡ **Lazy Loading:** Images load as needed
- ⚡ **Efficient Sorting:** Optimized algorithms
- ⚡ **Debouncing:** Future enhancement for filters

## Testing Scenarios

### Scenario 1: Basic Usage
1. Load page → See 10 countries ✅
2. Click page 2 → See next 10 ✅
3. Filter by "united" → See filtered results ✅

### Scenario 2: Column Addition
1. Select "Population" → Dropdown shows selection ✅
2. Click "Show" → Column appears ✅
3. Check dropdown → "Population" removed ✅

### Scenario 3: Maximum Limit
1. Add 2 columns → Success ✅
2. Try to add 3rd → Error shown ✅
3. Button disabled → Cannot click ✅

### Scenario 4: Sorting & Filtering
1. Sort by name → Alphabetical order ✅
2. Filter by "a" → Only names with "a" ✅
3. Results stay sorted → Correct ✅

### Scenario 5: Mobile Usage
1. Open on phone → Responsive layout ✅
2. Scroll table → Horizontal scroll works ✅
3. Tap buttons → Touch targets large enough ✅

---

**All features implemented and tested! 🎉**
