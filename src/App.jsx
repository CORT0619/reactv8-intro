import { createRoot } from 'react-dom/client';
import SearchParams from './SearchParams';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './Details';
import { useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';

const queryClient = new QueryClient({
  defaultOptions: { // how long do we want to cache things
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
});

const App = () => {
  const adoptedPet = useState(null); // the components have access to the value and can update that
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}> {/* makes adoptedPet context available to anything inside */}
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);