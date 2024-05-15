export const PaymentPlansPurchase = () => {
  return <>Development</>;
  // const { query } = useRouter();

  // const type = query.type as PaymentPlanType | undefined;
  // const { onCallAfar } = useCallFromAfar();
  // const submitBtnPortal = usePortal();

  // const getFormErrors = useGetFormErrors();

  // if (!type) {
  //   return <Navigate to="/payment-plans" />;
  // }

  // if (!plan) {
  //   return <></>;
  // }

  // const { price } = plan;

  // const getLabel = () => {
  //   switch (type) {
  //     case 'free':
  //       return 'gratis';
  //     case 'beginner':
  //       return 'principiante';
  //     case 'professional':
  //       return 'profesional';
  //     case 'company':
  //       return 'empresarial';
  //   }
  // };

  // return (
  //   <LayoutPage title="Planes de negocios">
  //     <Step
  //       text={`1: Escanea el siguiente código QR para realizar la compra de plan ${getLabel()} por un costo de $${price}.00 CUP.`}
  //     >
  //       <QrCode
  //         value={getQrCodeValueTransfer({ account: '9227959870847147', phone: '54811429' })}
  //       />
  //     </Step>

  //     <Step
  //       text="2: Ingresa el código de transferencia para validar la compra. Automáticamente su cuenta será actualizada de acuerdo con el plan contratado y podrá hacer uso de la misma. En cuanto la transferencia sea confirmada por nosotros, recibirá un correo de confirmación. En caso de haber algún problema con la confirmación, nuestro equipo se pondrá en contacto con usted."
  //       className="mt-16"
  //     >
  //       <>
  //         {addOnePaymentPlanPurchase.status.wasCalled ? (
  //           <div className="flex items-center">
  //             <CheckCircleIcon className="w-8 h-8 mr-2 text-green-500" />
  //             Pagado
  //           </div>
  //         ) : (
  //           <>
  //             <Formik
  //               initialValues={{
  //                 validationPurchaseCode: '',
  //               }}
  //
  //               validate={(values) => {
  //                 return getFormErrors(values, [
  //                   {
  //                     field: 'validationPurchaseCode',
  //                     type: 'required',
  //                   },
  //                 ]);
  //               }}
  //
  //             >
  //               {({ values, isValid }) => {
  //                 return (
  //                   <form className="mt-8">
  //                     <FieldInput
  //                       placeholder="Código de pago"
  //                       name="validationPurchaseCode"
  //                       className="w-full sm:w-64 mr-auto"
  //                     />

  //                     {submitBtnPortal.getPortal(
  //                       <Button
  //                         label="Enviar código de pago"
  //                         variant="primary"
  //                         disabled={!isValid}
  //                         isBusy={addOnePaymentPlanPurchase.status.isBusy}
  //                         onClick={() => {
  //                           const { validationPurchaseCode } = values;

  //                           addOnePaymentPlanPurchase.fetch(
  //                             {
  //                               planType: type,
  //                               validationPurchaseCode,
  //                             },
  //                             {
  //                               onAfterSuccess: () => {
  //                                 onCallAfar(callAfarIds.getUserPaymentPlan);
  //                               },
  //                             },
  //                           );
  //                         }}
  //                       />,
  //                     )}
  //                   </form>
  //                 );
  //               }}
  //             </Formik>

  //             <div ref={submitBtnPortal.ref} />
  //           </>
  //         )}
  //       </>
  //     </Step>
  //   </LayoutPage>
  // );
};
