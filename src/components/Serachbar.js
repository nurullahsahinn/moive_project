import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Serachbar extends Component {

  formSubmit = (event) => {
    event.preventDefault();

  }

  render() {
    return <form  onSubmit={this.formSubmit}>
      <div className='row col-12' >
        <div className='col-10' >
          
          <input onChange={this.props.searchMovieProp}
            type="text" className='form-control' placeholder='Search movie'/>
        </div>
        <div className='col-2' >
       
          <Link
          to="/add"
          type='button' className='btn btn-md btn-danger' 
          style={{float:"right"}}>Add move</Link>
        </div>
      </div>
    </form>
  }
}
export default Serachbar;
