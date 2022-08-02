import React from 'react';
import qrcode from 'qrcode.react';
import { blockDefaultProps } from '@lowdefy/block-utils';
const { QRCodeSVG  } = qrcode;
const QRCode = ({ properties  })=>/*#__PURE__*/ React.createElement(QRCodeSVG, {
        bgColor: properties.bgColor,
        fgColor: properties.fgColor,
        imageSettings: properties.imageSettings,
        includeMargin: properties.includeMargin,
        level: properties.level,
        size: properties.size,
        value: properties.value
    });
QRCode.defaultProps = blockDefaultProps;
QRCode.meta = {
    category: 'display',
    icons: [],
    styles: []
};
export default QRCode;
