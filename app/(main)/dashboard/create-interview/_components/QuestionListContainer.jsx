import React from 'react';

const QuestionListContainer = ({ questionList }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Generated Questions:</h3>
      {questionList.length === 0 ? (
        <p className="text-gray-500 italic">No questions generated yet</p>
      ) : (
        <ul className="space-y-4">
          {questionList.map((item, index) => (
            <li key={index} className="border-b border-gray-100 pb-4 last:border-0">
              <p className="text-gray-700 mb-1">{item.question}</p>
              <p className="text-sm text-gray-500 font-medium">Type: {item.type}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionListContainer;