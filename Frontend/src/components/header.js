import React from "react"

class Header extends React.Component{
    render() {
        return (
            <h1 className="title_1"> {this.props.title} </h1>
        )
    }
}

export default Header