import React from 'react';

export default function HandleChange(setFormData) { 


const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
    return handleChange;
}