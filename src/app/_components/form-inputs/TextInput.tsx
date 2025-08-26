import React from 'react';

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'number' | 'email' | 'tel' | 'url' | 'date';
}

export default function TextInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error,
  type = 'text' 
}: TextInputProps) {
  return (
    <div>
      <p className='mb-1 font-light'>{label}</p>
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border focus:border-2 focus:border-gray-600 border-gray-300 outline-none rounded-lg px-3 p-2 w-full ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
}