import React from 'react';
// Using deprecated import because import does not work properly with es modules
import QRCode from 'qrcode.react';
import { blockDefaultProps } from '@lowdefy/block-utils';

const QRCodeBlock = ({ properties }) => (
  <QRCode
    bgColor={properties.bgColor}
    fgColor={properties.fgColor}
    imageSettings={properties.imageSettings}
    includeMargin={properties.includeMargin}
    level={properties.level}
    size={properties.size}
    value={properties.value}
    renderAs={properties.renderAs ?? 'svg'}
  />
);

QRCodeBlock.defaultProps = blockDefaultProps;
QRCodeBlock.meta = {
  category: 'display',
  icons: [],
  styles: [],
};

export default QRCodeBlock;
