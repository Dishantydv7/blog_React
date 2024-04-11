import React from 'react'

function Button({
    children , 
    type = 'button',
  bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    // props will signify more property that user will pass
    ...props
    }) {
  return (
    <Button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </Button>
  )
}

export default Button