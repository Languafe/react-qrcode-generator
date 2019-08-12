import React from 'react';

import QRCode from 'qrcode';

// import './App.css';

class App extends React.Component {

  state = {
    url: 'https://www.office.com',
    svgXml: ''
  }

  componentDidMount() {
    this.getQRCodeSvgXml();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.getQRCodeSvgXml();
    });
  }

  getQRCodeSvgXml = async () => {
    if (this.state.url) {
      QRCode.toString(this.state.url, (err, string) => {
        if (err)
          this.setState({ errorMessage: JSON.stringify(err) });
        else
          this.setState({ svgXml: string });
      });
    }
    else
      this.setState({svgXml: ''});

  }

  drawQRCode = () => {
    var canvas = document.createElement('canvas');
    QRCode.toCanvas(canvas, this.state.url, (error) => {
      if (error)
        console.error(error);
      else
        console.log('Successfully generated QR Code');
    });

    return canvas;
  }

  render() {


    return (
      <div className="container p-4">
        {this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>}
        <div className="row">
          <div className="col-md-12">
            <form className="form" autoComplete="off">
              <label htmlFor="url">URL</label>
              <input className="form-control" name="url" value={this.state.url} onChange={this.handleChange} />
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3 p-3">
            <div dangerouslySetInnerHTML={{ __html: this.state.svgXml }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
