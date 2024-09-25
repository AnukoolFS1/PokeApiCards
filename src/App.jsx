import { useState, useEffect } from 'react';
import Card from './Card';
import './style.css'

const App = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        try {
            async function fetchData() {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
                const result = await res.json();
                setData(result.results)
            }
            fetchData()
        }
        catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <div className='base-card'>
            {data?.map((pokemon, index) => {
                return (
                    <Card key={index} url={pokemon.url} />
                )
            })}
        </div>
    )
}

export default App