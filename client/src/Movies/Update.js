import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams, useHistory } from 'react-router-dom';



const Update = props =>{
    const initialItem={
        title:'',
        director: '',
        metascore:'',
        stars:[]
    };
    const [movie, setMovie] = useState(initialItem)
    const {id} = useParams()
    const history= useHistory()

    useEffect(()=>{
      axios.get(`http://localhost:7000/api/movies/${id}`)
      .then(response=>{
          console.log(response)
          setMovie(response.data)
      })
      .catch(error=>{
          console.log("ERROR FROM UPDATE", error)
      })
    }, [id]);

    const handleChanges = e =>{
        // let value = e.target.value
        setMovie ({
            ...movie,
            [e.target.name] : e.target.value
        })
     
    };

    const handleSubmit = event =>{
        event.preventDefault()
        movie.stars=movie.stars.split('');
        axios
        .put(`http://localhost:7000/api/movies/${id}`,movie)
        .then(res=>{
            console.log(res)
            setMovie(initialItem)
            history.push('/')
        })
     };

    return(
        <div>
            <h1>Update Film</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder ="...title" 
                    value={movie.title}
                    onChange={handleChanges}
                />
                <input
                    type="text" 
                    name="director"
                    placeholder="director" 
                    value={movie.director} 
                    onChange={handleChanges} 
                />
                <input 
                    type="number" 
                    name="metascore" 
                    placeholder="meta score" 
                    value={movie.metascore}
                    onChange={handleChanges} 
                />
                <input 
                    type="text" 
                    name="stars"
                    placeholder="stars" 
                    value={movie.stars} 
                    onChange={handleChanges}
                />
              
               <button>Update(do not click it twice)</button>
                

            </form>
        </div>
    )
}

export default Update