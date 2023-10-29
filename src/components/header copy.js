import React from "react"

class Quote extends React.Component{
    render() {
        return (
            <div> 
                <div class="quote">
                    {this.props.text}
                </div>
                <div class="autor_quote">
                    {this.props.autor}
                </div>
            </div>
        )
    }
}

export default Quote