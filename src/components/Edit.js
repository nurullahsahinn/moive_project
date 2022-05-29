import React, { Component } from 'react';
import axios from "axios";

class Edit extends Component{   
    
        state = {
        name: "",
        rating:"",
        overview:"",
        imageURL:""

        }
      
   
   
    // gety request kullan 

    async componentDidMount() {
        const id = this.props.match.params.id;
        // console.log(id);
         const response = await axios.get(`http://localhost:3002/movies/${id}`);
        //  console.log(response.data);
        this.setState({
            name:response.data.name,
            rating:response.data.rating,
            overview:response.data.overview,
            imageURL:response.data.imageURL
        })
    }
    // onchane
    onInputChange = (e)=>{
        // console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // yenilme iptali
    handleFormSubmit = (e) => {
        e.preventDefault();
        // güncelleme

        const {name, rating, overview, imageURL }=this.state;
        const id = this.props.match.params.id;

        const updateMovie={
            name,
            rating,
            overview,
            imageURL
        }
        this.props.onEditMovie(id,updateMovie);
        this.props.history.push("/");
    }

    
    render() {
        return (
            <div className="container">
                <form className="mt-5" onSubmit={this.handleFormSubmit}>
                    <input className="form-control" id="disabledInput" type="text" placeholder="Fill The Form To Edit A Movie.." disabled />
                    <div className="form-row">
                        <div className="form-group col-md-10">
                            <label htmlFor="inputName">Name</label>
                            <input type="text"
                                className="form-control"
                                name="name" 
                         value={this.state.name}
                         onChange={this.onInputChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputRating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rating"
                                value={this.state.rating}
                                onChange={this.onInputChange} 
                                />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputImage">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageURL" 
                                value={this.state.imageURL}
                                onChange={this.onInputChange} 
                                 />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="overviewTextarea">Overview</label>
                            <textarea
                                className="form-control"
                                name="overview" rows="5"
                                value={this.state.overview}
                                onChange={this.onInputChange} 
                                ></textarea>
                        </div>
                    </div>
                    <br></br>
                    <input type="submit" className="btn btn-danger w-100" value="Edit Movie" />
                </form>
            </div>
        )
    }
}
export default Edit;