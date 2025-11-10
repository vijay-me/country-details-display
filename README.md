# Country Details Display

A modern, responsive React application for browsing and filtering country information from the REST Countries API.

## Features

✨ **Core Functionality:**
- Display country data in a sortable, filterable table format
- Filter by country name and currency
- Pagination with 10 rows per page
- Sort all columns (ascending/descending)
- Dynamic column addition (up to 10 fields total)

🎨 **User Experience:**
- Responsive design for all devices (Desktop, Laptop, Mobile, Tablet)
- Intuitive interface with clear visual feedback
- Smooth animations and transitions
- Comprehensive error handling

📊 **Data Fields:**
- **Initial Fields:** name, capital, currencies, flag, languages, continents, region, timezones
- **Additional Fields:** Can be added dynamically from 25+ available fields including:
  - Country codes (cca2, cca3, cioc, fifa)
  - Geographic data (area, borders, latlng, landlocked)
  - Demographics (population, demonyms)
  - Political info (independent, unMember, status)
  - And many more!

## Technology Stack

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool and dev server
- **Axios 1.6** - HTTP client for API requests
- **CSS3** - Styling with responsive design
- **REST Countries API v3.1** - Data source

## Installation

### Prerequisites
- Node.js 16+ and npm

### Steps

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Usage Guide

### Filtering
1. **By Name:** Type in the "Filter by Name" input to search for countries
2. **By Currency:** Type in the "Filter by Currency" input to search by currency name or symbol

### Sorting
- Click any column header to sort by that column
- Click again to reverse the sort direction
- Sort indicator (▲/▼) shows current sort state

### Adding Columns
1. Select a field from the "Additional Columns" dropdown
2. Click the "Show" button
3. The new column will appear on the right side of the table
4. Selected fields are removed from the dropdown to prevent duplicates
5. Maximum of 10 columns can be displayed (error shown if limit exceeded)

### Pagination
- Use Previous/Next buttons to navigate pages
- Click page numbers for direct navigation
- Each page shows 10 countries
- Current page info displayed at bottom

## API Endpoint

The application uses the REST Countries API:
```
https://restcountries.com/v3.1/all?fields={selected_fields}
```

## Project Structure

```
frontend/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── src/
    ├── main.jsx           # React entry point
    ├── App.jsx            # Main app component
    ├── components/
    │   └── CountryTable.jsx   # Main table component
    └── styles/
        ├── index.css          # Global styles
        ├── App.css            # App component styles
        └── CountryTable.css   # Table component styles
```

## Best Practices Implemented

✅ **Code Quality:**
- Component-based architecture
- React Hooks for state management (useState, useEffect, useMemo)
- Proper error handling and loading states
- Accessible HTML with ARIA labels

✅ **Performance:**
- Memoized computed values to prevent unnecessary re-renders
- Efficient filtering and sorting algorithms
- Optimized re-renders with proper dependency arrays

✅ **UX/UI:**
- Responsive design with mobile-first approach
- Clear visual feedback for user actions
- Smooth transitions and animations
- Error messages with helpful information

✅ **Accessibility:**
- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

1. REST Countries API allows maximum of 10 fields per request
2. Some fields may not be available for all countries (displayed as "-")
3. Large complex objects (like translations) are simplified in display

## Troubleshooting

**Issue:** Countries not loading
- Check internet connection
- Verify REST Countries API is accessible
- Check browser console for errors

**Issue:** Columns not adding
- Ensure maximum of 10 columns not exceeded
- Select a field from dropdown before clicking "Show"

**Issue:** Filters not working
- Filters are case-insensitive and match partial strings
- Clear filters by deleting text from input fields

## License

This project is created for educational purposes.

## Credits

- Data provided by [REST Countries API](https://restcountries.com)
- Flags from [Flagpedia](https://flagpedia.net)
- Built with React and Vite
