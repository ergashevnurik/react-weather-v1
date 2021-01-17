import React from 'react'
import './formStyle.css'

const Form = props => {
    return(
        <div className="container">
            <div>
                {props.error ? error() : null}
            </div>
            <form onSubmit={props.loadWeather}>
                <div className="row">
                    <div className="col-md-3 offset-md-2 my-2">
                        <input type="text" className="form-control" name="city" placeholder="City" autoComplete="off"/>
                    </div>
                    <div className="col-md-3 my-2">
                        <input type="text" className="form-control" name="country" placeholder="Country" autoComplete="off"/>
                    </div>
                    <div className="col-md-3 mt-md-0 text-md-left my-2">
                        <button className="btn btn-warning w-100">Get Weather</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function error() {
    return (
        <div className="alert alert-danger-mx-5 text-light bg-danger" role="alert">
            Please Enter City and Country
        </div>
    );
}

export default Form;