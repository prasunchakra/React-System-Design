// src/App.jsx

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'; // or wherever your logo is
import LocalStorage from './components/LocalStorage/LocalStorage';
import SessionStorage from './components/SessionStorage/SessionStorage';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
      <header className="flex items-center justify-center space-x-8 mb-10">
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="w-16 h-16 hover:scale-110 transition-transform duration-200 animate-spin"
            alt="React logo"
          />
        </a>
      </header>

      <main className="w-full max-w-2xl px-4 text-center">
        {/* Define your routes here */}
        <Routes>
          {/* Home / Landing page */}
          <Route
            path="/"
            element={
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  React System Design
                </h1>
                <p className="text-gray-600 mb-8 leading-6">
                  Problems find a way of repeating themselves. 
                  So I'm building a bunch of different components 
                  for my future reference. If you find this useful, 
                  feel free to use it. If you have any suggestions, 
                  please let me know. If you want to contribute, 
                  you're welcome to do so.
                </p>

                <ul className="grid gap-4 md:grid-cols-2">
                  <li className="bg-white rounded shadow p-4">
                    <Link
                      to="/local-storage"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Using Local Storage
                    </Link>
                    <p className="text-gray-700 text-sm mt-2">
                      Local Storage persists data on a user’s device, tied to a specific domain.
                    </p>
                  </li>
                  <li className="bg-white rounded shadow p-4">
                    <Link
                      to="/session-storage"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Using Session Storage
                    </Link>
                    <p className="text-gray-700 text-sm mt-2">
                      Session Storage persists data only for the current browser session.
                    </p>
                  </li>
                </ul>
              </>
            }
          />
  
          <Route path="/local-storage" element={<LocalStorage />} />

          <Route path="/session-storage" element={<SessionStorage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
