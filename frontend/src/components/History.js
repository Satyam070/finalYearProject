import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

const History = ({ history }) => {
  return (
    <div className="mt-8 px-4 py-6 bg-white rounded-xl shadow-lg border border-blue-100 animate-fadeIn">
      <div className="flex items-center mb-4">
        <Clock className="text-blue-500 mr-2" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Translation History</h2>
      </div>
      
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <Clock className="mb-3 text-gray-400" size={48} />
          <p className="text-lg">No history found yet.</p>
          <p className="text-sm">Your translations will appear here</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {history.map((item, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Extracted Text:</p>
                  <p className="font-medium text-gray-800 bg-white p-2 rounded-md border border-gray-200">{item.extracted}</p>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="text-blue-500" size={20} />
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Translated Text:</p>
                  <p className="font-medium text-blue-800 bg-white p-2 rounded-md border border-blue-200">{item.translated}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;