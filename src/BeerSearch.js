import React, { useState } from "react";

function BeerSearch() {
  const [query, setQuery] = useState("");
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBeer = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openbrewerydb.org/breweries?by_name=${encodeURIComponent(
          query
        )}`
      );

      const data = await response.json();
      if (data.length === 0) {
        setError("No such beers found, Try another Search..");
      }

      setBeers(data);
    } catch (error) {
      console.error("Error Fetching the beer: ", error.message);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="beer-search">
      <h1>Find Your Beer</h1>
      <form onSubmit={searchBeer}>
        <input
          type="text"
          placeholder="Search for a beer..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p> Loading beers... </p>}
      {error && <p> {error}</p>}

      {!loading && !error && beers.length > 0 && (
        <ul className="beer-list">
          {beers.map((beers) => (
            <li key={beers.id} className="beer-item">
              <h2>{beers.name}</h2>

              <p>
                <strong> {beers.brewery_type}</strong>
              </p>
              <p>
                {beers.city}, {beers.state}
              </p>
              <p>{beers.country}</p>
              {beers.website_url && (
                <p>
                  <a
                    href="beers.website_url"
                    target="_blank"
                    rel="noopener noreference"
                  >
                    Visite Website
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && beers.length === 0 && query && (
        <p>No beers Found, Try Another Search</p>
      )}
    </div>
  );
}

export default BeerSearch;
