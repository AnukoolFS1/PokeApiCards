import { useState} from 'react'
const SearchBar = ({ pokemons, loading, setData, setPage }) => {
    let [search, setSearch] = useState('');
    let [memoPage, setMemoPage] = useState(true);

    const searchBar = (e) => {
        setSearch(new RegExp(`${(e.target.value).toLowerCase()}`));
        if (e.target.value.length === 0) {
            setData(pokemons)
            setPage(prev => {
                return {...prev, multiPage:memoPage}
            })
        }
    }

    const submitSearch = () => {
        if(search.length === 0) return
        setData(() => {
            return pokemons.filter(e => {
                return search.test(e.name)
            })
        })
        try{
            setPage(prev => {
                setMemoPage(prev.multiPage)
                return {...prev, multiPage:false}
            })
        }catch{}
    }

    return (
        <div className='searchBase'>
            <input type="text" className='search' onChange={searchBar} />
            <button onClick={submitSearch} className='button'>{loading ? 'loading...' : `Search`}</button>
        </div>
    )
}

export default SearchBar