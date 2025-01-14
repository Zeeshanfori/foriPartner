'use client'

import Data from './data.json'; // Assuming data.json contains the "users" array
import { useEffect, useState } from 'react';

export default function ChristmasDonationForm() {
  const [providerTree, setProviderTree] = useState({});
  const [collapsedProviders, setCollapsedProviders] = useState({});

  useEffect(() => {
    const users = Data.users;

    // Group users by provider
    const groupedByProvider = users.reduce((acc, user) => {
      const { provider } = user;

      if (!acc[provider]) {
        acc[provider] = [];
      }

      acc[provider].push(user); // Add user under the respective provider
      return acc;
    }, {});

    // Set grouped data to state
    setProviderTree(groupedByProvider);
  }, []);

  const toggleCollapse = (providerName) => {
    setCollapsedProviders((prevState) => ({
      ...prevState,
      [providerName]: !prevState[providerName],
    }));
  };

  const renderTreeView = (providerName, users) => {
    const isCollapsed = collapsedProviders[providerName];

    return (
      <div className="tree-node">
        <div className="provider" onClick={() => toggleCollapse(providerName)}>
          <strong>{providerName}</strong> ({users.length} users)
          <span className={`collapse-icon ${isCollapsed ? 'collapsed' : ''}`}>
            {isCollapsed ? '▶' : '▼'}
          </span>
        </div>
        {!isCollapsed && (
          <div className="children">
            {users.map((user, index) => (
              <div key={index} className="user-node">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="family-tree">
      {Object.keys(providerTree).map((providerName) => (
        <div key={providerName}>
          {renderTreeView(providerName, providerTree[providerName])}
        </div>
      ))}
    </div>
  );
}
