import ReactQRCode, { QRCodeProps as ReactQRCodeProps } from 'react-qr-code';

interface QrCodeProps extends ReactQRCodeProps {}

export const QrCode = ({ value, className, onClick }: QrCodeProps) => {
  return <ReactQRCode value={value} className={className} onClick={onClick} />;
};
