import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ArticleEditor: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="overflow-x-auto rtl text-right">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200">
              تشغيل ضرورة مديرية
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200">
              اعادة الضبط
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td 
              colSpan={2}
              className="px-4 py-2 text-sm text-gray-900 border border-gray-200"
            >
              مدسموم برامج أو أيّي أو وسن الحجم الشخص 800 كيلو
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{
          toolbar: [
            [{ 'align': [] }, { 'direction': 'rtl' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'align': [] }],
            ['link'],
          ],
        }}
        style={{
          direction: 'rtl',
          border: '1px solid #e2e8f0', // border color
          borderRadius: '8px', // rounded corners
          padding: '10px', // padding inside editor
        }}
      />
      <button
        onClick={() => console.log(value)}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Save
      </button>
      <div
        dangerouslySetInnerHTML={{ __html: value }}
        className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-300"
      />
    </div>
  );
};

export default ArticleEditor;
