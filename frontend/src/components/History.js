import React from 'react';

const History = ({ history }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Translation History</h2>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {history.map((item, index) => (
            <li key={index} className="border p-2 rounded">
              <p className="font-semibold">Extracted: {item.extracted}</p>
              <p>Translated: {item.translated}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
