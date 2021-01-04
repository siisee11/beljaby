import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size: string; 
    color: string;
    outline?: boolean;
    fullWidth?: boolean;   
}

function Button({ children, size, color, outline, fullWidth, ...rest }: ButtonProps): JSX.Element {
    return (
        <button
            className={classNames('Button', size, color, { outline, fullWidth })}
            {...rest}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
  size: 'medium',
  color: 'blue',
  outline: false,
  fullWidth: false,
};

export default Button;