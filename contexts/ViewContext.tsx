import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ViewState } from '../types';

interface ViewContextType {
  view: ViewState;
  setView: (view: ViewState) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

// Map URL paths to ViewState enums
const PATH_TO_VIEW: Record<string, ViewState> = {
  '/': ViewState.LANDING,
  '/contact': ViewState.CONTACT,
  '/structures': ViewState.STRUCTURES,
  '/technology': ViewState.TECHNOLOGY,
  '/atmosphere': ViewState.ATMOSPHERE,
  '/sustainability': ViewState.SUSTAINABILITY,
  '/careers': ViewState.CAREERS,
  '/press': ViewState.PRESS,
  '/about': ViewState.ABOUT,
  '/privacy': ViewState.PRIVACY,
};

// Map ViewState enums back to URL paths
const VIEW_TO_PATH: Record<string, string> = Object.entries(PATH_TO_VIEW).reduce((acc, [path, view]) => {
  acc[view] = path;
  return acc;
}, {} as Record<string, string>);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state based on current URL
  const [view, setViewState] = useState<ViewState>(() => {
    if (typeof window === 'undefined') return ViewState.LANDING;
    // Normalize path by removing trailing slash (unless it's root)
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    return PATH_TO_VIEW[path] || ViewState.LANDING;
  });

  // Listen for browser back/forward button events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      const newView = PATH_TO_VIEW[path] || ViewState.LANDING;
      setViewState(newView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update internal state and push new URL
  const setView = (newView: ViewState) => {
    setViewState(newView);
    
    const newPath = VIEW_TO_PATH[newView];
    // Only push state if the path actually changes and exists in our map
    if (newPath && window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  };

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
};