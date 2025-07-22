import React from 'react';
import { Diamond } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-screen pt-32 flex items-center justify-center">
    <div className="text-center">
      <Diamond className="w-16 h-16 mx-auto mb-4 text-purple-600" />
      <h1 className="text-2xl font-bold">NotFound</h1>
      <p>En cours de développement</p>
    </div>
  </div>
);

export default NotFoundPage;
