import React, { Component } from 'react';
import Serachbar from "./components/Serachbar"
import Movielist from "./components/Movielist"
import axios from "axios";
import Addmovie from './components/Addmovie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Edit from './components/Edit';



class App extends Component {
  state = {
    movies: [],
    searchQuery: ""
  }
  // async componentDidMount() {
  //   const baseURL="http://localhost:3002/movies";
  //   const response=await fetch(baseURL);
  //   console.log(response);
  //   const data= await response.json();
  //   console.log(data);
  //   this.setState({movies:data})
  // }


  componentDidMount() {
    this.getMovies();


  }
  //---------------
  async getMovies() {
    const response = await axios.get("http://localhost:3002/movies")

    this.setState({ movies: response.data })


  }



  // deleteMovie=(movie)=>{
  //   const newMovieList=this.state.movies.filter(
  //     m=> m.id !== movie.id

  //   );
  //   this.setState(state => ({
  //     movies:newMovieList
  //   }))
  // }

  /// fetch yapısı
  // deleteMovie= async (movie)=>{
  //   const url=`http://localhost:3002/movies/${movie.id}`
  //   await fetch(url,{
  //     method:"DELETE"
  //   })
  //   const newMovieList=this.state.movies.filter(
  //     m=> m.id !== movie.id

  //   );
  //   this.setState(state => ({
  //     movies:newMovieList
  //   }))
  // }

  /// axios delete

  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3002/movies/${movie.id}`)
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id

    );
    this.setState(state => ({
      movies: newMovieList
    }))
    this.getMovies();
  }


  // filtrleme
  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  Addmovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie)

    this.setState(state => ({
      movies: state.movies.concat([movie])
    }))
    this.getMovies();
  }

  //güncelleme
  editMovie = async (id, updateMovie) => {
    await axios.put(`http://localhost:3002/movies/${id}`, updateMovie)
this.getMovies();

  }
  render() {
    //filtlrme fonskiyonu
    let filteredMovies = this.state.movies.filter(
      (movie) => {
        return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
      }
    ).sort((a, b) => {
      return a.id < b.id ? 1 : -1; // id seçimin terisne döndürür :D
    })
    return (


      <Router>
        <div className='container'>
          <Switch>



            {/* <Route path="/edit/:id" component={Edit} /> */}

            <Route path="/add" exact render={({ history }) => (
              <Addmovie
                onAddMovie={(movie) => {
                  this.Addmovie(movie)
                  history.push("/");
                }} />
            )} />

            <Route path="/edit/:id" render={(props) => (
              <Edit
                {...props}
                onEditMovie={(id, movie) => {
                  this.editMovie(id, movie);

                }} />
            )} />

            <Route path="/" render={() => (
              <React.Fragment>
                <div className='row'>
                  <div className='col-12'>
                    <Serachbar
                      searchMovieProp={this.searchMovie}
                    />
                  </div>
                </div>
                <Movielist
                  movies={filteredMovies}
                  deleteITem={this.deleteMovie}
                />
              </React.Fragment>
            )} />

          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;