const ProductCategories = () => {
  return (
    <div className="product-categories grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Category />
      <Category />
      <Category />
    </div>
  );
};

const Category = () => (
  <div>
    <h3 className="font-bold text-xl mb-4">titkle</h3>
  </div>
);

export default ProductCategories;
