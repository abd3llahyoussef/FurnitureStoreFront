import React from 'react'

export default function InputComponent({title,type,placeholder,name,value,onChange}) {
  return (
    <div>
        <fieldset className="fieldset">
        <legend className="fieldset-legend">{title}</legend>
        <input type={type} className="input" placeholder={placeholder} name={name} value={value} onChange={onChange} />
        </fieldset>
    </div>
  )
}
