import { useState, useEffect } from 'react';
import Card from './Card';
import './style.css'

const App = () => {
    const [pokemons, setPokemons] = useState([])
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');


    const searchBar = (e) => {
        setSearch(new RegExp(`${(e.target.value).toLowerCase()}`));
    }

    const submitSearch = () => {
        setData(() => {
            return pokemons.filter(e => {
                return search.test(e.name)
            })
        })
    }

    useEffect(() => {
        try {
            async function fetchData() {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
                const result = await res.json();
                setPokemons(result.results)
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
            <div className='searchBase'>
                <input type="text" className='search' onChange={searchBar} />
                <button onClick={submitSearch} className='button'>Search</button>
            </div>
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