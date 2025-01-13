 const ProductDeliveryTermsTab = ({deliveryTerms}: {deliveryTerms:string}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-lg font-semibold">Delivery Terms</p>
        <p className="text-gray-400">
          {deliveryTerms}
        </p>
      </div>

      {/* <div className="space-y-2">
        <p className="text-lg font-semibold">Features: </p>
        <ul className="text-gray-400 list-disc list-inside text-sm">
          <li>slim body with metal cover</li>
          <li>latest Intel Core i5-1135G7 processor (4 cores / 8 threads)</li>
          <li>8GB DDR4 RAM and fast 512GB PCIe SSD</li>
          <li>
            NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit keyboard,
            touchpad with gesture support
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default ProductDeliveryTermsTab
