import React from 'react';

class PotentialError extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
    }
    componentDidCatch(error, info) {
        this.setState({ error, info });
    }
    render() {
        if (this.state.error) {
            return (
                <div>
                    <h1>
                        Error AGAIN: {this.state.error.toString()}
                    </h1>
                    {this.state.info &&
                    this.state.info.componentStack.split("\n").map(i => {
                        return (
                            <div key={i}>
                                {i}
                            </div>
                        );
                    })}
                </div>
            );
        }
        return this.props.children;
    }
}

export default PotentialError