
import React from 'react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, user }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'classes', label: 'Turmas', icon: '🏫' },
    { id: 'activities', label: 'Atividades', icon: '📝' },
    { id: 'reports', label: 'Relatórios', icon: '📄' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ id: 'admin', label: 'Administração', icon: '⚙️' });
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col no-print">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <span>🧩</span> PRÁXIS+
        </h1>
        <p className="text-xs text-slate-500 mt-1">Prática Docente Inclusiva</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentView === item.id 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-sm font-semibold truncate">{user?.name}</p>
          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          <button className="mt-2 text-xs text-red-600 font-medium hover:underline">Sair</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
