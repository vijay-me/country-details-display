# 🚀 Quick Start Guide

## Installation & Running

### Step 1: Navigate to Frontend Directory
```cmd
cd c:\Users\lenovo\projects\restcountries\frontend
```

### Step 2: Install Dependencies
```cmd
npm install
```

This will install:
- React 18.2.0
- React DOM 18.2.0
- Axios 1.6.2
- Vite 5.0.8
- @vitejs/plugin-react 4.2.1

### Step 3: Start Development Server
```cmd
npm run dev
```

The application will start on `http://localhost:3000` and automatically open in your browser.

## Using the Application

### 1️⃣ View Countries
- The table loads automatically with 8 default columns
- First 10 countries are displayed (page 1)

### 2️⃣ Filter Countries
**By Name:**
- Type in "Filter by Name" input box
- Searches both common and official names
- Example: Type "united" to find United States, United Kingdom, etc.

**By Currency:**
- Type in "Filter by Currency" input box
- Searches currency names and symbols
- Example: Type "euro" or "€" to find Euro-using countries

### 3️⃣ Sort Data
- Click any column header to sort
- First click: Sort ascending (▲)
- Second click: Sort descending (▼)
- Works on all columns

### 4️⃣ Navigate Pages
- Use **Previous/Next** buttons
- Click page numbers directly
- 10 countries per page

### 5️⃣ Add Additional Columns
1. Click "Additional Columns" dropdown
2. Select a field (e.g., "Population", "Area", "Borders")
3. Click **Show** button
4. New column appears on the right
5. Maximum 10 columns total

### 6️⃣ Maximum Columns
- You can have up to 10 columns active
- Error shown if you try to add an 11th column
- Initial: 8 columns (so you can add 2 more)

## Features at a Glance

| Feature | How to Use |
|---------|-----------|
| **Filter by Name** | Type in name search box |
| **Filter by Currency** | Type in currency search box |
| **Sort Columns** | Click column headers |
| **Change Page** | Use pagination controls |
| **Add Columns** | Select from dropdown + click Show |
| **Remove Filters** | Clear text from filter inputs |

## Common Use Cases

### Find all European countries
1. Type "europe" in name filter OR
2. Add "Continents" column and sort

### Find countries using Euro
1. Type "euro" in currency filter

### Compare country sizes
1. Add "Area" column
2. Click "Area" header to sort

### Find landlocked countries
1. Add "Landlocked" column
2. Sort by landlocked

### Find UN member countries
1. Add "Un Member" column
2. Sort by un member

## Keyboard Shortcuts

- **Tab**: Navigate between inputs
- **Enter**: In dropdown/inputs (submits action)
- **Arrow Keys**: Navigate page numbers

## Troubleshooting

### ❌ Countries not loading?
- Check internet connection
- REST Countries API might be down
- Check browser console (F12) for errors

### ❌ Can't add more columns?
- Already at 10 column maximum
- Error message will display

### ❌ Filters not working?
- Make sure you're typing in the correct filter box
- Filters are case-insensitive
- Check that countries exist matching your filter

### ❌ Page looks broken on mobile?
- Clear browser cache
- Try rotating device
- Use latest browser version

## Production Build

To create a production build:

```cmd
npm run build
```

Files will be in `frontend/dist/` directory.

To preview production build:

```cmd
npm run preview
```

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

## Browser Compatibility

✅ **Recommended Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Mobile Testing

The app is fully responsive on:
- 📱 iPhone (all sizes)
- 📱 Android phones
- 📱 iPad / Tablets
- 💻 Laptops
- 🖥️ Desktops

## Need Help?

Check these files:
- `README.md` - Full documentation
- `PROJECT_SUMMARY.md` - Complete feature list
- `src/components/CountryTable.jsx` - Main component code

---

**Enjoy exploring countries around the world! 🌍**
