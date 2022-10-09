import { useState } from "react";

function EditGenre({genres}) {
    const [editGenre, setEditGenre] = useState(false);
    const [selGenreId, setSelGenreId] = useState('');


    return (
        <>
            {editGenre ? 
            <>
                <select className='genre-edit' value={selGenreId} onChange={evt => setSelGenreId(Number(evt.target.value))}>
                    {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select> 
                <button onClick={() => setEditGenre(false)}>Cancel</button>
            </> : 
            <button onClick={() => setEditGenre(true)}>Edit</button>}
        </>
    );
}

export default EditGenre;