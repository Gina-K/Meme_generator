import React, {Component} from "react";

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "нельзя так просто взять",
            bottomText: "и сохранить картинку",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImages: []
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({allMemeImages: memes})
            })
    }

    handlerChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handlerSubmit(event) {
        event.preventDefault();
        const meme = this.state.allMemeImages[Math.floor(Math.random() * (this.state.randomImage.length + 1))];
        let {url} = meme;
        this.setState({randomImage: url});
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handlerSubmit}>
                    <input
                        type="text"
                        name="topText"
                        placeholder="Enter a top text..."
                        value={this.state.topText}
                        onChange={this.handlerChange}/>

                    <input
                        type="text"
                        name="bottomText"
                        placeholder="...and a bottom text"
                        value={this.state.bottomText}
                        onChange={this.handlerChange}/>

                    <button>Gen</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;