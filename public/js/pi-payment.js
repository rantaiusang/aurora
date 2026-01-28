function pay() {
  initPiSDK();

  Pi.createPayment(
    { amount: 1, memo: "Test Payment" },
    {
      onReadyForServerApproval(id) {
        console.log("Approve:", id);
      },
      onReadyForServerCompletion(id) {
        console.log("Done:", id);
      }
    }
  );
}

window.pay = pay;
