import React from 'react';
import './button.css'


function Button({label}){
    console.log(label)//undefined
    return <div data-testid="button" className = "button-style">
      hi Jack {label}
    </div>
}

export default Button