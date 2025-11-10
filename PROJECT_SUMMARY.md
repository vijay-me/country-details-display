# Country Details Display - Project Summary

## 📋 Project Overview

A fully-featured React application that displays country information from the REST Countries API with advanced filtering, sorting, and dynamic column management capabilities.

## ✅ Requirements Fulfilled

### 1. Display Country Information ✓
- Successfully fetches data from `https://restcountries.com/v3.1/all?fields=...`
- Displays data in a clean, organized table format
- Handles JSON response parsing and error states

### 2. Filter Functionality ✓
- **Name Filter:** Real-time search through country names (common and official)
- **Currency Filter:** Search by currency name or symbol
- Both filters work together and are case-insensitive

### 3. Pagination ✓
- Maximum 10 rows per page (excluding header)
- Previous/Next navigation buttons
- Direct page number selection
- Page info display (current page, total pages, row range)
- Smart pagination with ellipsis for many pages

### 4. Sorting ✓
- All columns are sortable
- Click header to sort ascending
- Click again to sort descending
- Visual indicator (▲/▼) shows current sort state
- Handles various data types (strings, numbers, arrays, objects)

### 5. Dynamic Column Addition ✓
- Dropdown populated from FIELDS.md
- Excludes fields already in endpoint 1
- Label: "Additional Columns"
- Selected fields dynamically added on right side

### 6. Label Implementation ✓
- "Additional Columns" label displayed prominently
- All UI elements properly labeled for accessibility

### 7. Show Button ✓
- "Show" button positioned right of dropdown
- Triggers table refresh with new column
- Disabled when no field selected or max reached

### 8. Dynamic Column Management ✓
- Table refreshes when "Show" clicked
- New column appears on the right
- API call made with updated fields list
- Selected option removed from dropdown

### 9. Dropdown Option Management ✓
- Selected options disappear from dropdown
- Prevents duplicate selections
- Re-calculates available options after each addition

### 10. Maximum Columns Validation ✓
- Tracks active column count (8 initial + up to 2 additional = 10 max)
- Shows error: "Maximum number of columns reached"
- Prevents API calls with >10 fields
- Disables controls when limit reached

## 🎯 Additional Features & Best Practices

### Exception Handling
- **API Errors:** Try-catch blocks with user-friendly error messages
- **Network Issues:** Loading states and error recovery
- **Invalid Data:** Null/undefined checks with fallback displays
- **User Input:** Validation for column additions and filters

### Responsive Design
- **Desktop (>1024px):** Full table with all features
- **Tablet (768-1024px):** Optimized layout with adjusted spacing
- **Mobile (480-768px):** Stacked filters, scrollable table
- **Small Mobile (<480px):** Compact view with touch-friendly controls
- **Tested Devices:** Works on all screen sizes mentioned

### Code Best Practices

#### React Patterns
- Functional components with hooks
- `useMemo` for expensive computations (sorting, filtering)
- `useEffect` for data fetching and side effects
- Proper dependency arrays to prevent infinite loops
- Component reusability and separation of concerns

#### Performance Optimizations
- Memoized sorted and filtered data
- Pagination to limit DOM nodes
- Efficient re-render prevention
- Optimized field list management

#### Accessibility (A11y)
- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Color contrast compliance

#### Code Organization
- Clear component structure
- Separated styles per component
- Descriptive variable names
- Commented complex logic
- Modular helper functions

### Error Handling Examples

```javascript
// API Error Handling
try {
  const response = await axios.get(apiUrl);
  setCountries(response.data);
} catch (err) {
  setError('Failed to fetch country data. Please try again later.');
}

// User Input Validation
if (!selectedAdditionalField) {
  setErrorMessage('Please select a field from the dropdown');
  return;
}

// Maximum Columns Check
if (activeFields.length >= 10) {
  setErrorMessage('Maximum number of columns reached');
  return;
}

// Data Safety
const value = country?.name?.common || '-';
```

## 📦 Project Structure

```
frontend/
├── index.html                    # Entry HTML
├── package.json                  # Dependencies
├── vite.config.js               # Vite config
├── README.md                     # Documentation
├── .gitignore                    # Git ignore rules
└── src/
    ├── main.jsx                 # React entry
    ├── App.jsx                  # Main component
    ├── components/
    │   └── CountryTable.jsx     # Table component (500+ lines)
    └── styles/
        ├── index.css            # Global styles
        ├── App.css              # App styles
        └── CountryTable.css     # Table styles (responsive)
```

## 🚀 Getting Started

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

## 🧪 Testing Checklist

✅ **Functionality:**
- [x] Data loads from API
- [x] Table displays correctly
- [x] Name filter works
- [x] Currency filter works
- [x] Sorting works on all columns
- [x] Pagination navigates correctly
- [x] Additional columns can be added
- [x] Maximum 10 columns enforced
- [x] Selected options disappear from dropdown
- [x] Error messages display appropriately

✅ **Responsive Design:**
- [x] Desktop (1920x1080)
- [x] Laptop (1366x768)
- [x] Tablet (768x1024)
- [x] Mobile (375x667)

✅ **Error Handling:**
- [x] Network errors handled
- [x] Invalid data handled
- [x] User input validated
- [x] Edge cases covered

## 🔧 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| Vite | 5.0.8 | Build Tool |
| Axios | 1.6.2 | HTTP Client |
| CSS3 | - | Styling |

## 📊 Features Summary

| Feature | Status | Notes |
|---------|--------|-------|
| API Integration | ✅ | REST Countries v3.1 |
| Table Display | ✅ | Clean, organized layout |
| Name Filter | ✅ | Real-time, case-insensitive |
| Currency Filter | ✅ | Searches name and symbol |
| Sorting | ✅ | All columns, bi-directional |
| Pagination | ✅ | 10 rows/page |
| Dynamic Columns | ✅ | Up to 10 fields |
| Field Validation | ✅ | Max columns enforced |
| Error Handling | ✅ | Comprehensive |
| Responsive | ✅ | All devices |
| Accessibility | ✅ | ARIA, semantic HTML |
| Performance | ✅ | Optimized renders |

## 🎨 Design Highlights

- **Color Scheme:** Purple gradient theme (#667eea to #764ba2)
- **Typography:** System font stack for optimal performance
- **Spacing:** Consistent 1rem base unit
- **Interactions:** Smooth transitions and hover effects
- **Icons:** Unicode symbols for sort indicators
- **Images:** Flag and coat of arms thumbnails

## 📝 Key Implementation Details

### Initial Fields (8)
1. name
2. capital
3. currencies
4. flag
5. languages
6. continents
7. region
8. timezones

### Available Additional Fields (27)
cca2, cca3, altSpellings, area, borders, idd, capitalInfo, car, cioc, coatOfArms, demonyms, independent, fifa, flags, gini, landlocked, latlng, maps, ccn3, population, postalCode, startOfWeek, status, subregion, tld, translations, unMember

### Data Formatting
- Arrays → Comma-separated
- Objects → Formatted strings
- Booleans → Yes/No
- Numbers → Localized (commas)
- Nulls → "-"
- Images → Thumbnail tags
- Links → Anchor tags

## 🐛 Known Issues & Solutions

**Issue:** API has 10 field limit
**Solution:** Enforced at UI level with clear error message

**Issue:** Some fields may be undefined for certain countries
**Solution:** Null checks with fallback "-" display

**Issue:** Large datasets can slow filtering
**Solution:** useMemo for computed values

## 🔮 Future Enhancements

- Export to CSV/Excel
- Save filter/sort preferences
- Bookmark favorite countries
- Dark mode toggle
- Multi-language support
- Advanced filters (range, multi-select)
- Data visualization charts
- Comparison mode

## 📄 License

Educational project - free to use and modify

---

**Built with ❤️ using React and REST Countries API**
