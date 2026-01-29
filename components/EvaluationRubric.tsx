
import React, { useState } from 'react';
import { Student, Activity, EvaluationIndicator } from '../types';

interface EvaluationRubricProps {
  students: Student[];
  activities: Activity[];
}

const EvaluationRubric: React.FC<EvaluationRubricProps> = ({ students, activities }) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [rubrics, setRubrics] = useState<EvaluationIndicator[]>([
    { criteria: 'Compreensão Conceitual', score: 0, feedback: '' },
    { criteria: 'Engajamento e Participação', score: 0, feedback: '' },
    { criteria: 'Autonomia na Execução', score: 0, feedback: '' },
  ]);

  const scores = [
    { value: 1, label: '🌱 Início', color: 'bg-red-100 text-red-700' },
    { value: 2, label: '🌿 Em Desenv.', color: 'bg-yellow-100 text-yellow-700' },
    { value: 3, label: '🌳 Consolidado', color: 'bg-emerald-100 text-emerald-700' },
    { value: 4, label: '✨ Avançado', color: 'bg-indigo-100 text-indigo-700' },
  ];

  const updateScore = (index: number, score: number) => {
    const newRubrics = [...rubrics];
    newRubrics[index].score = score;
    setRubrics(newRubrics);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Avaliação Formativa</h2>
        <p className="text-slate-500">Registro qualitativo do desenvolvimento dos estudantes.</p>
      </header>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Estudante</label>
            <select 
              className="w-full bg-white text-slate-900 border border-slate-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedStudent}
              onChange={e => setSelectedStudent(e.target.value)}
            >
              <option value="">Selecione o aluno...</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Atividade Referência</label>
            <select 
              className="w-full bg-white text-slate-900 border border-slate-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedActivity}
              onChange={e => setSelectedActivity(e.target.value)}
            >
              <option value="">Selecione a atividade...</option>
              {activities.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-8 mt-8">
          {rubrics.map((rubric, idx) => (
            <div key={idx} className="border-b border-slate-100 pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h4 className="font-semibold text-slate-800">{rubric.criteria}</h4>
                <div className="flex flex-wrap gap-2">
                  {scores.map(s => (
                    <button
                      key={s.value}
                      onClick={() => updateScore(idx, s.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        rubric.score === s.value 
                        ? `${s.color} border-current scale-105 shadow-sm` 
                        : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <textarea 
                className="w-full mt-4 bg-white text-slate-900 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Observações pedagógicas específicas sobre este critério..."
                rows={2}
              />
            </div>
          ))}
        </div>

        <div className="pt-4">
          <button className="w-full py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-900 transition flex items-center justify-center gap-2">
            💾 Finalizar Avaliação
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationRubric;
