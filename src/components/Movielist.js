import React from 'react';
import {Link} from  'react-router-dom'

const Movielist = (props)=>{
    // yazı kısaltma
    const truncateOverview=(string,maxLenght) => {
        if (!string) return null 
        if(!string.lenght<=maxLenght) return string;
        return `${string.substring(0, 98)}...`;
    }

   return ( <div className='row'>
          
            {props.movies.map((movie,i) => (
                <div className='col-lg-4 ' key={i}>
                    <div className='card mb-4 shadow-sm'>
                        <img className='card-img-top' alt="sample movie" src={movie.imageURL} />
                        <div className='card-body'>
                            <h5 className='card-title'>{movie.name}</h5>
                            <p className='card-text'>{truncateOverview(movie.overview)}</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <button className='btn btn-md btn-outline-danger' onClick={(event)=>props.deleteITem(movie)}>Delete</button>

                                <Link type="button" className="btn btn-md btn-outline-warning" to={`edit/${movie.id}`}>Edit</Link>

                                <h2><span>{movie.rating}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
   )
  
}
export default Movielist;
