import React from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  ArrowUpRight,
  Clock,
  Calendar 
} from 'lucide-react';

const DashboardPage = () => {
  // Sample data - in a real app, this would come from your backend
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$45,231.89', 
      change: '+20.1%',
      icon: DollarSign 
    },
    { 
      title: 'Active Users', 
      value: '2,338', 
      change: '+15.3%',
      icon: Users 
    },
    { 
      title: 'Recent Sales', 
      value: '432', 
      change: '+12.5%',
      icon: BarChart3 
    }
  ];

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Created new account', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'Completed purchase', time: '5 minutes ago' },
    { id: 3, user: 'Mike Johnson', action: 'Updated profile', time: '10 minutes ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <stat.icon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">{stat.change}</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <div className="mt-6 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-50 rounded-full">
                    <Clock className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
