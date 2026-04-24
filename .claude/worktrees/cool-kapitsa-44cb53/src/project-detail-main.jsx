import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProjectDetailPage from '@/components/projects-page/ProjectDetailPage';

ReactDOM.createRoot(document.getElementById('project-detail-root')).render(
  <React.StrictMode>
    <ProjectDetailPage />
  </React.StrictMode>
);
