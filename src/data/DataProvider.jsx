import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { fetchAppData } from "./api.js";
import { events, leaderboard, currentUser, myBetEventIds } from "./mockData.js";

const MOCK_DATA = { events, leaderboard, currentUser, myBetEventIds };

const DataContext = createContext(null);

// Loads the app's data once, from Supabase if it's configured and from
// mockData.js otherwise, and holds the app until it's ready.
export function DataProvider({ children }) {
  const [data, setData] = useState(supabase ? null : MOCK_DATA);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) return;
    fetchAppData().then(setData).catch(setError);
  }, []);

  if (error) {
    return <p className="page">Couldn't load data from Supabase: {error.message}</p>;
  }
  if (!data) {
    return <p className="page muted">Loading…</p>;
  }
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

// { events, leaderboard, currentUser, myBetEventIds }
export function useData() {
  return useContext(DataContext);
}
