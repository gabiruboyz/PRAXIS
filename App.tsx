
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ActivityPlanner from './components/ActivityPlanner';
import StudentList from './components/StudentList';
import EvaluationRubric from './components/EvaluationRubric';
import { Student, Activity } from './types';

const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    classId: 'class-1',
    name: 'Ana Silva',
    pedagogicalProfile: {
      strengths: 'Comunicação oral, memória visual',
      challenges: 'Interação social, foco prolongado',
      interests: 'Animais, desenho',
      specialNeeds: 'Autismo Nível 1'
    }
  },
  {
    id: '2',
    classId: 'class-1',
    name: 'Bruno Souza',
    pedagogicalProfile: {
      strengths: 'Raciocínio lógico, curiosidade',
      challenges: 'Alfabetização, coordenação motora fina',
      interests: 'Tecnologia, jogos',
      specialNeeds: 'TDAH'
    }
  }
];

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    classId: 'class-1',
    title: 'Ciclo da Água',
    content: 'Aula expositiva sobre as fases da água na natureza.',
    createdAt: new Date().toISOString()
  }
];

const App: React.FC = () => {
  const [currentView, setView] = useState('dashboard');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);

  const user = {
    name: 'Prof. Ricardo Mendes',
    email: 'ricardo.mendes@escola.gov.br',
    role: 'teacher' as const
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <header>
              <h2 className="text-3xl font-bold text-slate-900">Bem-vindo, {user.name.split(' ')[1]}!</h2>
              <p className="text-slate-500">Aqui está o resumo pedagógico das suas turmas.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total de Alunos</p>
                <h3 className="text-4xl font-bold mt-2">{students.length}</h3>
                <div className="mt-4 flex items-center gap-2 text-indigo-600 text-sm font-semibold">
                  <span>📊</span> 100% com perfil mapeado
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Atividades Adaptadas</p>
                <h3 className="text-4xl font-bold mt-2">{activities.length}</h3>
                <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-semibold">
                  <span>✨</span> IA ativa no suporte
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Relatórios Mensais</p>
                <h3 className="text-4xl font-bold mt-2">0</h3>
                <div className="mt-4 flex items-center gap-2 text-amber-600 text-sm font-semibold">
                  <span>⏳</span> Próximo em 5 dias
                </div>
              </div>
            </div>
            
            <section className="mt-10">
              <h3 className="text-xl font-bold mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button onClick={() => setView('activities')} className="p-4 bg-indigo-600 text-white rounded-xl text-left hover:bg-indigo-700 transition">
                  <span className="text-2xl mb-2 block">📝</span>
                  <span className="font-bold">Nova Atividade</span>
                  <p className="text-xs text-indigo-100 mt-1">Planeje e adapte conteúdo</p>
                </button>
                <button onClick={() => setView('reports')} className="p-4 bg-slate-800 text-white rounded-xl text-left hover:bg-slate-900 transition">
                  <span className="text-2xl mb-2 block">📄</span>
                  <span className="font-bold">Gerar Relatório</span>
                  <p className="text-xs text-slate-400 mt-1">Exportar dossiê pedagógico</p>
                </button>
                <button onClick={() => setView('classes')} className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-indigo-300 transition group">
                  <span className="text-2xl mb-2 block">👥</span>
                  <span className="font-bold text-slate-800 group-hover:text-indigo-600">Ver Estudantes</span>
                  <p className="text-xs text-slate-500 mt-1">Gerencie perfis e NEE</p>
                </button>
              </div>
            </section>
          </div>
        );
      case 'activities':
        return <ActivityPlanner students={students} />;
      case 'classes':
        return <StudentList students={students} onAddStudent={(s) => setStudents([...students, s])} />;
      case 'reports':
        return <EvaluationRubric students={students} activities={activities} />;
      default:
        return <div>Em breve...</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentView={currentView} setView={setView} user={user} />
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
