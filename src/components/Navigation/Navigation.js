import React from 'react';

const Navigation = () => {
    const styleParam = {display: 'flex', justifyContent: 'flex-end'};
    
    return (
        <nav style={styleParam}> 
            <p className='f3 link dim black underline pa3 pointer'>Sign out</p>
        </nav>
    );
}

export default Navigation; 