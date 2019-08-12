import React from 'react';

import QRCode from 'qrcode';

export default class MyQRCode extends React.Component {

    componentDidMount() {
        const { value } = this.props;
        QRCode.toString()
    }

    render() {
        return (
            <canvas ref="canvas"></canvas>
        )
    }
}