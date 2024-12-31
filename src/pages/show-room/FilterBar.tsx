const FilterBar = () => {
  return (
    <div className="filter-bar mb-6">
      <select className="border p-2 w-full">
        <option value="">Filter by Supplier Location</option>
        {/* Add more filter options here */}
      </select>
    </div>
  );
};

export default FilterBar;
