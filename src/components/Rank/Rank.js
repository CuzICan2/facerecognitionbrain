import React from 'react';

const Rank = ({user}) => {
    console.log(user.name, user.entries);
    return (
       <div>
            <div className='f3 white'>
                {'Welcome ' + user.name +  ', your current rank is...'}
            </div>
            <div className='f1 white'>
                {user.entries}
            </div>
       </div>
/*        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='center f3 link dim black underline pa3 pointer'>Rank #</p>
        </nav> */
    );
}

export default Rank; 