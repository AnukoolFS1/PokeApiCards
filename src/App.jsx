import { useState, useEffect } from 'react';
import Card from './Card';
import SearchBar from './searchBar';
import './style.css'

const App = () => {
    const [pokemons, setPokemons] = useState([])
    const [data, setData] = useState([]);

    async function next(api) {
        if (!api.next) {
            return []
        }

        const res = await fetch(api.next)
        const result = await res.json()
        setPokemons(prev => prev.concat(result.results))

        return next(result)
    }


    useEffect(() => {
        try {
            async function fetchData() {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
                const result = await res.json();
                setPokemons(result.results)
                next(result)
            }
            fetchData()
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        setData(pokemons)
    }, [pokemons])
    return (
        <div>
            <SearchBar pokemons={pokemons} data={data} setData={setData} />
            <div className='base-card'>
                {data.map(pokemon => {

                    return (
                        <Card key={pokemon.url} url={pokemon.url} />
                    )
                })}
            </div>
        </div>
    )
}

export default App