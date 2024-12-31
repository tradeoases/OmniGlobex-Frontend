const MembershipPlansTable = () => {
  // Subscription plans data
  const plans = [
    {
      name: 'Basic Membership',
      price: 'Free for 1 month',
      availability: 'Available',
      features: {
        basicServices: true,
        analytics: 'Basic',
        messaging: 'Limited',
        consortium: false,
        verification: false,
        support: 'Basic',
        upgrade: true,
        advancedServices: false,
        prioritySupport: false,
        advertising: false,
        accountManager: false,
      },
    },
    {
      name: 'Standard Membership',
      price: '$1,000 per year',
      availability: 'Not Available',
      features: {
        basicServices: true,
        analytics: 'Enhanced',
        messaging: 'Unlimited',
        consortium: true,
        verification: 'Coming Soon',
        support: 'Standard',
        upgrade: true,
        advancedServices: 'Coming Soon',
        prioritySupport: false,
        advertising: 'Coming Soon',
        accountManager: false,
      },
    },
    {
      name: 'Premium Membership',
      price: '$2,500 per year',
      availability: 'Not Available',
      features: {
        basicServices: true,
        analytics: 'Advanced',
        messaging: 'Unlimited',
        consortium: true,
        verification: 'Coming Soon',
        support: 'Priority',
        upgrade: true,
        advancedServices: 'Coming Soon',
        prioritySupport: true,
        advertising: 'Coming Soon',
        accountManager: 'Coming Soon',
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">OmniGlobex Membership Plans</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-2 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Features</th>
              {plans.map((plan) => (
                <th key={plan.name} className="px-2 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {plan.name} <br />({plan.price}) <br></br>
                  <div className={`font-bold ${plan.availability !== 'Available'? 'text-red-500': 'text-black'}`}>{plan.availability}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Access to basic services</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-2 py-4 text-center text-xs md:text-sm">{plan.features.basicServices ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Analytics and reporting tools</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-2 py-4 text-center text-xs md:text-sm">{plan.features.analytics}</td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Messaging capability</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-2 py-4 text-center text-xs md:text-sm">{plan.features.messaging}</td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Access to Consortium feature</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-2 py-4 text-center text-xs md:text-sm">{plan.features.consortium ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Verification sign included</td>
              {plans.map((plan) => (
                <td
                  key={plan.name}
                  className={`px-2 py-4 text-center text-xs md:text-sm ${
                    plan.features.verification === 'Coming Soon' ? 'text-gray-500 italic' : ''
                  }`}
                >
                  {plan.features.verification === 'Coming Soon' ? 'Coming Soon' : plan.features.verification ? '✔️' : '❌'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Customer support level</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-2 py-4 text-center text-xs md:text-sm">{plan.features.support}</td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Upgrade options available</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-2 py-4 text-center text-xs md:text-sm">{plan.features.upgrade ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Advanced business services</td>
              {plans.map((plan) => (
                <td
                  key={plan.name}
                  className={`px-2 py-4 text-center text-xs md:text-sm ${
                    plan.features.advancedServices === 'Coming Soon' ? 'text-gray-500 italic' : ''
                  }`}
                >
                  {plan.features.advancedServices === 'Coming Soon' ? 'Coming Soon' : plan.features.advancedServices ? '✔️' : '❌'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Priority customer support</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-2 py-4 text-center text-xs md:text-sm">{plan.features.prioritySupport ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Advertising tools</td>
              {plans.map((plan) => (
                <td
                  key={plan.name}
                  className={`px-2 py-4 text-center text-xs md:text-sm ${
                    plan.features.advertising === 'Coming Soon' ? 'text-gray-500 italic' : ''
                  }`}
                >
                  {plan.features.advertising === 'Coming Soon' ? 'Coming Soon' : plan.features.advertising ? '✔️' : '❌'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Dedicated account manager</td>
              {plans.map((plan) => (
                <td
                  key={plan.name}
                  className={`px-2 py-4 text-center text-xs md:text-sm ${
                    plan.features.accountManager === 'Coming Soon' ? 'text-gray-500 italic' : ''
                  }`}
                >
                  {plan.features.accountManager === 'Coming Soon' ? 'Coming Soon' : plan.features.accountManager ? '✔️' : '❌'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipPlansTable;
