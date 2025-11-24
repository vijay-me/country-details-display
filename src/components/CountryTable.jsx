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

  // Helper function to get nested values
  const getNestedValue = (obj, key) => {
    const fields = {
      name: obj.name?.common || '',
      capital: Array.isArray(obj.capital) ? obj.capital.join(', ') : '',
      currencies: obj.currencies ? Object.values(obj.currencies).map(c => c.name).join(', ') : '',
      languages: obj.languages ? Object.values(obj.languages).join(', ') : '',
      continents: Array.isArray(obj.continents) ? obj.continents.join(', ') : '',
      timezones: Array.isArray(obj.timezones) ? obj.timezones.join(', ') : ''
    };
    return fields[key] || obj[key] || '';
  };

  // Sorting logic
  const sortedCountries = useMemo(() => {
    if (!sortConfig.key) return [...countries];
    
    return [...countries].sort((a, b) => {
      const aVal = String(getNestedValue(a, sortConfig.key)).toLowerCase();
      const bVal = String(getNestedValue(b, sortConfig.key)).toLowerCase();
      const dir = sortConfig.direction === 'asc' ? 1 : -1;
      return aVal < bVal ? -dir : aVal > bVal ? dir : 0;
    });
  }, [countries, sortConfig]);

  // Filtering logic
  const filteredCountries = useMemo(() => {
    return sortedCountries.filter(country => {
      const name = country.name?.common?.toLowerCase() || '';
      const currency = country.currencies ? Object.values(country.currencies).map(c => c.name).join(' ').toLowerCase() : '';
      
      return name.includes(filterName.toLowerCase()) && currency.includes(filterCurrency.toLowerCase());
    });
  }, [sortedCountries, filterName, filterCurrency]);

  // Pagination logic
  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredCountries.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredCountries, currentPage]);

  const totalPages = Math.ceil(filteredCountries.length / rowsPerPage);

  // Format cell value for display
  const formatCellValue = (country, field) => {
    const value = country[field];
    if (!value && value !== 0) return '-';

    const formatters = {
      name: () => country.name?.common || '-',
      capital: () => Array.isArray(country.capital) ? country.capital.join(', ') : '-',
      currencies: () => country.currencies ? Object.entries(country.currencies).map(([code, curr]) => `${curr.name} (${curr.symbol || code})`).join(', ') : '-',
      flag: () => country.flag || '-',
      languages: () => country.languages ? Object.values(country.languages).join(', ') : '-',
      continents: () => Array.isArray(country.continents) ? country.continents.join(', ') : '-',
      timezones: () => Array.isArray(country.timezones) ? country.timezones.join(', ') : '-',
      population: () => typeof value === 'number' ? value.toLocaleString() : value,
      area: () => typeof value === 'number' ? `${value.toLocaleString()} km²` : value,
      flags: () => (value?.svg || value?.png) ? <img src={value.svg || value.png} alt="Flag" className="flag-img" /> : '-',
      coatOfArms: () => (value?.svg || value?.png) ? <img src={value.svg || value.png} alt="Coat of Arms" className="coat-img" /> : '-',
      maps: () => value?.googleMaps ? <a href={value.googleMaps} target="_blank" rel="noopener noreferrer">View Map</a> : '-',
      latlng: () => Array.isArray(value) ? value.join(', ') : '-',
      borders: () => Array.isArray(value) ? value.join(', ') : '-',
      tld: () => Array.isArray(value) ? value.join(', ') : '-',
      independent: () => value ? 'Yes' : 'No',
      unMember: () => value ? 'Yes' : 'No',
      landlocked: () => value ? 'Yes' : 'No',
      car: () => typeof value === 'object' ? `Side: ${value.side || '-'}, Signs: ${Array.isArray(value.signs) ? value.signs.join(', ') : '-'}` : '-',
      idd: () => typeof value === 'object' ? (value.suffixes ? `${value.root || ''} (${value.suffixes.join(', ')})` : value.root || '-') : '-',
      gini: () => typeof value === 'object' ? (Object.entries(value).length ? Object.entries(value).map(([year, val]) => `${year}: ${val}`).join(', ') : '-') : '-',
      demonyms: () => (value?.eng) ? `${value.eng.m || '-'} / ${value.eng.f || '-'}` : '-',
      translations: () => typeof value === 'object' ? `${Object.keys(value).length} languages` : '-',
      altSpellings: () => Array.isArray(value) ? value.join(', ') : '-'
    };

    return formatters[field] ? formatters[field]() : (typeof value === 'object' ? JSON.stringify(value) : String(value));
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
        <div className="filter-group">
          <button 
            onClick={() => {
              setFilterName('');
              setFilterCurrency('');
              setSortConfig({ key: null, direction: 'asc' });
            }}
            className="reset-button"
            disabled={filterName === '' && filterCurrency === '' && sortConfig.key === null}
          >
            Reset
          </button>
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
