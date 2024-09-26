import { useState, useEffect } from 'react';
import Card from './Card';
import SearchBar from './searchBar';
import './style.css'

const App = () => {
    const [pokemons, setPokemons] = useState([])
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState([]);
    const [paginators, setPaginators] = useState([]);
    const [multiPage, setMultipagpe] = useState(true)


    function pagination(x) {
        let setPage = (x - 1) * 20
        setDisplay(() => {
            let arr = [];
            for (let i = setPage; i < setPage + 20; i++) {
                if (pokemons[i] === undefined) {
                    break;
                }
                console.log(pokemons[i])
                arr.push(
                    pokemons[i]
                )
            }
            return arr
        })
    }


    useEffect(() => {
        try {
            async function next(api) {
                if (!api.next) {
                    return setLoading(false)
                }

                const res = await fetch(api.next)
                const result = await res.json()
                setPokemons(prev => prev.concat(result.results))

                next(result)
            }

            async function fetchData() {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
                const result = await res.json();
                setPokemons(result.results)
                next(result)
                setDisplay(result.results)
            }
            fetchData()
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        setData(pokemons)
        setPaginators(() => {
            let arr = []
            for (let i = (Math.floor(pokemons.length / 20)) + 1; i > 0; i--) {
                arr.push(
                    <span
                        className='paginators'
                        key={i}
                        onClick={() => pagination(i)}
                    >
                        {i}
                    </span>
                )
            }
            return arr.reverse()
        })

    }, [pokemons])


    return (
        <div>
            <button className='view' onClick={()=>setMultipagpe(!multiPage)}>{multiPage?'single page view':'multipage view'}</button>
            <SearchBar pokemons={pokemons} loading={loading} setData={setData} setPage={setMultipagpe} />
            <div className='base-card'>
                {
                    multiPage ?
                        display.map(pokemon => {
                            return <Card key={pokemon.url} url={pokemon.url} />
                        })
                        :
                        data.map(pokemon => {
                            return (
                                <Card key={pokemon.url} url={pokemon.url} />
                            )
                        })
                }
            </div>
            {multiPage && paginators}

        </div>
    )
}

export default App