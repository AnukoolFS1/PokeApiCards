import React from 'react';

const Testing = () => {
    const [data, setData] = React.useState({ name: 'anukool' })

    function change(){
        setData(prev => {return {...prev,name:'anuk'}})
    }
    return (<>
        <h1>{data.name}</h1>
        <button onClick={change}>change it</button>
    </>)
}

export default Testing