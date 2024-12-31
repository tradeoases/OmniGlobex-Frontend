const RFQDropdownHomePage = () => {
  const units = [
    "Bags",
    "Barrels",
    "Boxes",
    "Cartons",
    "Containers",
    "Kilograms",
    "Liters",
    "Metric Tonnes",
    "Pieces",
    "Sets",
  ];

  return (
    <div className="mod-dropdown">
      <div className="dropdown-title-box">
        <input
          type="text"
          readOnly
          value="Select Unit"
          className="dropdown-input"
        />
        <i className="iconfont ic_arrow_down_14"></i>
      </div>
      <ul className="dropdown-list">
        {units.map((unit, index) => (
          <li key={index} className="dItem">
            {unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RFQDropdownHomePage;
