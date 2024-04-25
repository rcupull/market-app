export const getQrCodeValueTransfer = (args: { phone: string; account: string }) => {
  const { account, phone } = args;
  return `TRANSFERMOVIL_ETECSA,TRANSFERENCIA,${account},${phone},`;
};
