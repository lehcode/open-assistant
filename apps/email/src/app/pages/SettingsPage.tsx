const SettingsPage = () => {
  const settings = [
    {
      id: 'account',
      title: 'Account Settings',
      description: 'Manage your account preferences',
      fields: [
        { id: 'name', label: 'Full Name', type: 'text', value: 'John Doe' },
        { id: 'email', label: 'Email', type: 'email', value: 'john@example.com' }
      ]
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      description: 'Choose what notifications you receive',
      fields: [
        { id: 'email_notif', label: 'Email Notifications', type: 'checkbox', value: true },
        { id: 'push_notif', label: 'Push Notifications', type: 'checkbox', value: false }
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Settings updated');
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account settings and preferences.</p>
      </div>

      {/* Settings Forms */}
      {settings.map((section) => (
        <div key={section.id} className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{section.description}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {section.fields.map((field) => (
                <div key={field.id} className="space-y-1">
                  {field.type === 'checkbox' ? (
                    <div className="flex items-center">
                      <input
                        id={field.id}
                        type="checkbox"
                        defaultChecked={field.value.toString() === 'true'}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={field.id} className="ml-2 text-sm text-gray-700">
                        {field.label}
                      </label>
                    </div>
                  ) : (
                    <>
                      <label htmlFor={field.id} className="text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        defaultValue={field.value.toString()} // Convert the value to a string
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </>
                  )}
                </div>
              ))}
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsPage;
