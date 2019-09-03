import React from 'react';

const Navigation = ( {onRouteChange, signedIn} ) => {
    const styleParam = {display: 'flex', justifyContent: 'flex-end'};
    
    if (signedIn) {
        return (
            <nav style={styleParam}> 
                <p onClick={() => onRouteChange('signOut')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
            </nav>
        );
    } else { 
        return (
            <nav style={styleParam}> 
                <p onClick={() => onRouteChange('signIn')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        );
    }
}

export default Navigation; 