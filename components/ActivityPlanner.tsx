
import React, { useState } from 'react';
import { getInclusiveAdaptation } from '../services/geminiService';
import { Student } from '../types';

interface ActivityPlannerProps {
  students: Student[];
}

const ActivityPlanner: React.FC<ActivityPlannerProps> = ({ students }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [adaptations, setAdaptations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAdaptation = async () => {
    if (!selectedStudent || !content) return;
    setIsLoading(true);
    const profileText = `Forças: ${selectedStudent.pedagogicalProfile.strengths}. Desafios: ${selectedStudent.pedagogicalProfile.challenges}. Necessidades: ${selectedStudent.pedagogicalProfile.specialNeeds}.`;
    const results = await getInclusiveAdaptation(content, profileText);
    setAdaptations(results);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Planejador de Atividades</h2>
        <p className="text-slate-500">Crie conteúdos e receba sugestões de adaptações inclusivas via IA.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Conteúdo Base</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Título da Atividade</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Ex: Introdução à Fotossíntese"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Descrição / Comandos</label>
              <textarea 
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Descreva os objetivos e passos da atividade..."
              />
            </div>
            <button className="w-full py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium">
              Salvar Rascunho
            </button>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-indigo-900">IA de Adaptação Inclusiva</h3>
            <span className="px-2 py-1 bg-indigo-200 text-indigo-700 text-[10px] font-bold uppercase rounded">Beta</span>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-indigo-700">Selecione um estudante para gerar sugestões personalizadas de adaptação.</p>
            
            <select 
              className="w-full px-4 py-2 bg-white text-slate-900 border border-indigo-200 rounded-lg outline-none"
              onChange={(e) => setSelectedStudent(students.find(s => s.id === e.target.value) || null)}
            >
              <option value="">Selecione um aluno...</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.pedagogicalProfile.specialNeeds})</option>
              ))}
            </select>

            <button 
              disabled={isLoading || !selectedStudent || !content}
              onClick={handleGenerateAdaptation}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processando...
                </>
              ) : (
                <>✨ Gerar Adaptação</>
              )}
            </button>

            {adaptations.length > 0 && (
              <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2">
                {adaptations.map((adapt, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">{adapt.type}</span>
                    <p className="text-sm text-slate-700 mt-1">{adapt.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPlanner;
