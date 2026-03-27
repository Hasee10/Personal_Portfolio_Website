import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProjectsPage from '@/components/projects-page/ProjectsPage';

ReactDOM.createRoot(document.getElementById('projects-root')).render(
  <React.StrictMode>
    <ProjectsPage />
  </React.StrictMode>
);
