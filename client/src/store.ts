import { create } from "zustand";

interface CookieQuery {
    selectedActive: boolean | null;
    selectedLabel: string;
    searchText?: string;
  }
  
interface CookieQueryStore {
    cookieQuery: CookieQuery;
    setSearchText: (searchText: string) => void;
    setSelectedActive: (selectedActive: boolean | null, selectedLabel: string) => void;
}

const useCookieQueryStore = create<CookieQueryStore>(set => ({
    cookieQuery: {selectedActive: null, selectedLabel: "All Cookies"},
    setSearchText: (searchText) => set(store => ({ cookieQuery: { ...store.cookieQuery, searchText, selectedActive: null, selectedLabel: "Searched For: " + searchText } })),
    setSelectedActive: (selectedActive, selectedLabel) => set(store => ({ cookieQuery: { ...store.cookieQuery, selectedActive, selectedLabel}})),
}))

export default useCookieQueryStore;

