import React from 'react';

function HeaderLayout({ children }) {
    return (
        <header>
            <nav>
                {children}
            </nav>
        </header>
    );
}

export default HeaderLayout;