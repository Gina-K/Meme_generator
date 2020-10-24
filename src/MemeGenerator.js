import React, {Component} from "react";

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({allMemeImgs: memes})
            })
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input
                        type="text"
                        name="topText"
                        placeholder="Enter a top text..."
                        value={this.state.topText}
                        onChange={this.changeHandler}/>

                    <input
                        type="text"
                        name="bottomText"
                        placeholder="...and a bottom text"
                        value={this.state.bottomText}
                        onChange={this.changeHandler}/>

                    <button>Gen</button>
                </form>
            </div>
        );
    }
}

export default MemeGenerator;