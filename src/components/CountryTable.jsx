import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/CountryTable.css';

const CountryTable = () => {
  // Initial fields from endpoint 1
  const initialFields = ['name', 'capital', 'currencies', 'flag', 'languages', 'continents', 'region', 'timezones'];
  
  // All available fields from FIELDS.md (v3.1 supported) - memoized to prevent re-creation
  const allAvailableFields = useMemo(() => [
    'cca2', 'cca3', 'altSpellings', 'area', 'borders', 'idd', 'capitalInfo',
    'car', 'cioc', 'coatOfArms', 'demonyms', 'independent', 'fifa', 'flags',
    'gini', 'landlocked', 'latlng', 'maps', 'ccn3', 'population', 'postalCode',
    'startOfWeek', 'status', 'subregion', 'tld', 'translations', 'unMember'
  ], []);

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterName, setFilterName] = useState('');
  const [filterCurrency, setFilterCurrency] = useState('');
  const [activeFields, setActiveFields] = useState(initialFields);
  const [selectedAdditionalField, setSelectedAdditionalField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const rowsPerPage = 10;

  // Fetch countries data
  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const fieldsParam = activeFields.join(',');
      const response = await axios.get(
        `https://restcountries.com/v3.1/all?fields=${fieldsParam}`
      );
      setCountries(response.data);
    } catch (err) {
      setError('Failed to fetch country data. Please try again later.');
      console.error('Error fetching countries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFields]);

  // Get available additional fields (exclude already active fields)
  const availableAdditionalFields = useMemo(() => {
    return allAvailableFields.filter(field => !activeFields.includes(field));
  }, [activeFields, allAvailableFields]);

  // Handle adding additional column
  const handleAddColumn = () => {
    setErrorMessage('');
    
    if (!selectedAdditionalField) {
      setErrorMessage('Please select a field from the dropdown');
      return;
    }

    if (activeFields.length >= 10) {
      setErrorMessage('Maximum number of columns reached');
      return;
    }

    setActiveFields([...activeFields, selectedAdditionalField]);
    setSelectedAdditionalField('');
  };

  // Sorting logic
  const sortedCountries = useMemo(() => {
    let sortableCountries = [...countries];
    
    if (sortConfig.key !== null) {
      sortableCountries.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();

        if (aString < bString) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aString > bString) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableCountries;
  }, [countries, sortConfig]);

  // Filtering logic
  const filteredCountries = useMemo(() => {
    return sortedCountries.filter(country => {
      const nameMatch = filterName === '' || 
        (country.name?.common?.toLowerCase().includes(filterName.toLowerCase()) ||
         country.name?.official?.toLowerCase().includes(filterName.toLowerCase()));

      let currencyMatch = true;
      if (filterCurrency !== '') {
        currencyMatch = false;
        if (country.currencies) {
          const currencyString = Object.values(country.currencies)
            .map(curr => `${curr.name} ${curr.symbol}`)
            .join(' ')
            .toLowerCase();
          currencyMatch = currencyString.includes(filterCurrency.toLowerCase());
        }
      }

      return nameMatch && currencyMatch;
    });
  }, [sortedCountries, filterName, filterCurrency]);

  // Pagination logic
  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredCountries.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredCountries, currentPage]);

  const totalPages = Math.ceil(filteredCountries.length / rowsPerPage);

  // Helper function to get nested values
  const getNestedValue = (obj, key) => {
    if (!obj) return '';
    
    switch (key) {
      case 'name':
        return obj.name?.common || '';
      case 'capital':
        return Array.isArray(obj.capital) ? obj.capital.join(', ') : '';
      case 'currencies':
        if (!obj.currencies) return '';
        return Object.values(obj.currencies).map(curr => curr.name).join(', ');
      case 'languages':
        if (!obj.languages) return '';
        return Object.values(obj.languages).join(', ');
      case 'continents':
        return Array.isArray(obj.continents) ? obj.continents.join(', ') : '';
      case 'timezones':
        return Array.isArray(obj.timezones) ? obj.timezones.join(', ') : '';
      default:
        return obj[key] !== undefined ? obj[key] : '';
    }
  };

  // Format cell value for display
  const formatCellValue = (country, field) => {
    const value = country[field];
    
    if (value === null || value === undefined) return '-';

    switch (field) {
      case 'name':
        return country.name?.common || '-';
      
      case 'capital':
        return Array.isArray(country.capital) ? country.capital.join(', ') : '-';
      
      case 'currencies':
        if (!country.currencies) return '-';
        return Object.entries(country.currencies)
          .map(([code, curr]) => `${curr.name} (${curr.symbol || code})`)
          .join(', ');
      
      case 'flag':
        return country.flag || '-';
      
      case 'languages':
        if (!country.languages) return '-';
        return Object.values(country.languages).join(', ');
      
      case 'continents':
        return Array.isArray(country.continents) ? country.continents.join(', ') : '-';
      
      case 'timezones':
        return Array.isArray(country.timezones) ? country.timezones.join(', ') : '-';
      
      case 'population':
        return typeof value === 'number' ? value.toLocaleString() : value;
      
      case 'area':
        return typeof value === 'number' ? `${value.toLocaleString()} km²` : value;
      
      case 'flags':
        if (value?.svg || value?.png) {
          return <img src={value.svg || value.png} alt="Flag" className="flag-img" />;
        }
        return '-';
      
      case 'coatOfArms':
        if (value?.svg || value?.png) {
          return <img src={value.svg || value.png} alt="Coat of Arms" className="coat-img" />;
        }
        return '-';
      
      case 'maps':
        if (value?.googleMaps) {
          return <a href={value.googleMaps} target="_blank" rel="noopener noreferrer">View Map</a>;
        }
        return '-';
      
      case 'latlng':
        return Array.isArray(value) ? value.join(', ') : '-';
      
      case 'borders':
        return Array.isArray(value) ? value.join(', ') : '-';
      
      case 'tld':
        return Array.isArray(value) ? value.join(', ') : '-';
      
      case 'independent':
      case 'unMember':
      case 'landlocked':
        return value ? 'Yes' : 'No';
      
      case 'car':
        if (typeof value === 'object') {
          return `Side: ${value.side || '-'}, Signs: ${Array.isArray(value.signs) ? value.signs.join(', ') : '-'}`;
        }
        return '-';
      
      case 'idd':
        if (typeof value === 'object') {
          const root = value.root || '';
          const suffixes = Array.isArray(value.suffixes) ? value.suffixes.join(', ') : '';
          return suffixes ? `${root} (${suffixes})` : root || '-';
        }
        return '-';
      
      case 'gini':
        if (typeof value === 'object') {
          const entries = Object.entries(value);
          return entries.length > 0 ? entries.map(([year, val]) => `${year}: ${val}`).join(', ') : '-';
        }
        return '-';
      
      case 'demonyms':
        if (typeof value === 'object' && value.eng) {
          return `${value.eng.m || '-'} / ${value.eng.f || '-'}`;
        }
        return '-';
      
      case 'translations':
        if (typeof value === 'object') {
          return Object.keys(value).length > 0 ? `${Object.keys(value).length} languages` : '-';
        }
        return '-';

      case 'altSpellings':
        return Array.isArray(value) ? value.join(', ') : '-';
      
      default:
        if (typeof value === 'object' && value !== null) {
          return JSON.stringify(value);
        }
        return String(value);
    }
  };

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Format field name for display
  const formatFieldName = (field) => {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterName, filterCurrency]);

  if (loading) {
    return <div className="loading">Loading country data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="country-table-container">
      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="filter-name">Filter by Name:</label>
          <input
            id="filter-name"
            type="text"
            placeholder="Search by country name..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filter-currency">Filter by Currency:</label>
          <input
            id="filter-currency"
            type="text"
            placeholder="Search by currency..."
            value={filterCurrency}
            onChange={(e) => setFilterCurrency(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {/* Additional Columns Control */}
      <div className="additional-columns">
        <label htmlFor="additional-field">Additional Columns:</label>
        <select
          id="additional-field"
          value={selectedAdditionalField}
          onChange={(e) => setSelectedAdditionalField(e.target.value)}
          className="additional-select"
          disabled={availableAdditionalFields.length === 0}
        >
          <option value="">Select a field...</option>
          {availableAdditionalFields.map(field => (
            <option key={field} value={field}>
              {formatFieldName(field)}
            </option>
          ))}
        </select>
        <button 
          onClick={handleAddColumn}
          className="show-button"
          disabled={!selectedAdditionalField || activeFields.length >= 10}
        >
          Show
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="error-message" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Info Bar */}
      <div className="info-bar">
        <span>Total Countries: {filteredCountries.length}</span>
        <span>Active Columns: {activeFields.length}/10</span>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="country-table">
          <thead>
            <tr>
              {activeFields.map(field => (
                <th key={field} onClick={() => handleSort(field)} className="sortable">
                  <div className="th-content">
                    <span>{formatFieldName(field)}</span>
                    <span className="sort-indicator">
                      {sortConfig.key === field && (
                        sortConfig.direction === 'asc' ? ' ▲' : ' ▼'
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedCountries.length > 0 ? (
              paginatedCountries.map((country, index) => (
                <tr key={country.cca3 || country.name?.common || index}>
                  {activeFields.map(field => (
                    <td key={field}>{formatCellValue(country, field)}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={activeFields.length} className="no-data">
                  No countries found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
            aria-label="Previous page"
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              // Show first, last, current, and adjacent pages
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                    aria-label={`Page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return <span key={pageNum} className="page-ellipsis">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-button"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="page-info">
        Page {currentPage} of {totalPages} | 
        Showing {((currentPage - 1) * rowsPerPage) + 1} - {Math.min(currentPage * rowsPerPage, filteredCountries.length)} of {filteredCountries.length}
      </div>
    </div>
  );
};

export default CountryTable;
