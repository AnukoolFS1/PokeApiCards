import { useState, useEffect } from 'react'
const SearchBar = ({ pokemons, loading, setData, setPage }) => {
    let [search, setSearch] = useState('');
    let [memoPage, setMemoPage] = useState(null);

    const searchBar = (e) => {
        setSearch(new RegExp(`${(e.target.value).toLowerCase()}`));
        if (e.target.value.length === 0) {
            setData(pokemons)
            setPage(() => {
                return memoPage
            })
        }
    }

    const submitSearch = () => {
        setData(() => {
            return pokemons.filter(e => {
                return search.test(e.name)
            })
        })
        setPage(prev => {
            setMemoPage(prev)
            return false
        })
    }

    return (
        <div className='searchBase'>
            <input type="text" className='search' onChange={searchBar} />
            <button onClick={submitSearch} className='button'>{loading ? 'loading...' : `Search`}</button>
        </div>
    )
}

export default SearchBar