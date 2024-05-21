// src/client/index.jsx
import React from "react";
import { hydrateRoot } from 'react-dom/client';
import App from '../shared/App';

console.log("#module", module);

hydrateRoot(document.getElementById("root"), <App data={123} />);
