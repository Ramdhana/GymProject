import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Creation from '../../../componentes/memberCreation';
import Profile from '../../../componentes/memberProfile';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Member Creation', href: '#', current: false },
  { name: 'Member Profile', href: '#', current: false },
];

const MemberCreation = () => <Creation />;
const MemberProfile = () => <Profile />;
const Dashboard = () => <div>Comming soon</div>;

export default function Layout() {
  const router = useRouter();
  const [selectedSubmenu, setSelectedSubmenu] = useState('Dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerText, setHeaderText] = useState('Dashboard');

  const handleSubmenuClick = (name:string) => {
    setSelectedSubmenu(name === 'Action' ? 'Member Creation' : name);
    setHeaderText(name); // Set the header text based on the submenu item clicked
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const renderSubmenuContent = () => {
    switch (selectedSubmenu) {
      case 'Member Creation':
        return <MemberCreation />;
      case 'Member Profile':
        return <MemberProfile />;
      case 'Dashboard':
        return <Dashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-64 p-4 ${menuOpen ? 'block' : 'hidden'} sm:block`}>
      <img className="mx-auto h-10 w-auto mb-4" src="https://th.bing.com/th/id/OIP.35UAQnFvhD2xfs_3Ct4RLAHaHa?rs=1&amp;pid=ImgDetMain" alt="Map"></img>
        
        <div>
          {navigation.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => handleSubmenuClick(item.name)}
                className={`block py-2 w-full text-left ${
                  selectedSubmenu === item.name ? 'bg-gray-900' : ''
                }`}
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="bg-gray-800 text-white py-2 px-4 fixed bottom-0 left-0 w-full">
          {menuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <header className="bg-white shadow p-4 flex-row">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{headerText}</h1>
        </header>
        <main className="mt-8 p-4 bg-white shadow">{renderSubmenuContent()}</main>
      </div>
    </div>
  );
}
