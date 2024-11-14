// paypal.d.ts
declare global {
  const paypal: {
    Buttons: (options: {
      style: { shape: string; color: string; layout: string; label: string };
      createSubscription: (data: any, actions: any) => Promise<any>;
      onApprove: (data: any, actions: any) => void;
    }) => {
      render: (containerId: string) => void;
    };
  };
}

export {};
