 import React from "react";

function Home({
  beachSearch,
  setBeachSearch,
  fetchBSI,
  loading,
  leaderboardComponent
}) {
  return (
    <div>

      <header className="App-header">

        <div className="header-top-row">
          <h1>BeachBuddy India</h1>
        </div>

        <p>Find the best beach conditions right now.</p>

        <div className="input-container">

          <input
            type="text"
            value={beachSearch}
            onChange={(e) => setBeachSearch(e.target.value)}
            placeholder="Enter beach name"
          />

          <button
            onClick={fetchBSI}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Suitability"}
          </button>

        </div>

      </header>

      {leaderboardComponent}

    </div>
  );
}

export default Home;