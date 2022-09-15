import React from 'react'

function Modal({ title, children }) {
  return (
    <div className="card modal">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default Modal