
import React, { useState } from 'react';
import { Student } from '../types';

interface StudentListProps {
  students: Student[];
  onAddStudent: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onAddStudent }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    pedagogicalProfile: { strengths: '', challenges: '', interests: '', specialNeeds: '' }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: Math.random().toString(36).substr(2, 9),
      classId: 'class-1',
      name: newStudent.name || '',
      pedagogicalProfile: newStudent.pedagogicalProfile as any
    };
    onAddStudent(student);
    setIsAdding(false);
    setNewStudent({ name: '', pedagogicalProfile: { strengths: '', challenges: '', interests: '', specialNeeds: '' } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Estudantes</h2>
          <p className="text-slate-500">Perfil pedagógico e necessidades educacionais.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <span>➕</span> Novo Estudante
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl w-full max-w-lg p-8 space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-800">Cadastrar Novo Estudante</h3>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Nome Completo</label>
              <input 
                required
                className="w-full bg-white text-slate-900 border border-slate-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={newStudent.name}
                onChange={e => setNewStudent({...newStudent, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Potencialidades</label>
                <textarea 
                  className="w-full bg-white text-slate-900 border border-slate-300 p-2 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                  rows={3} 
                  onChange={e => setNewStudent({...newStudent, pedagogicalProfile: {...newStudent.pedagogicalProfile!, strengths: e.target.value}})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Desafios</label>
                <textarea 
                  className="w-full bg-white text-slate-900 border border-slate-300 p-2 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                  rows={3} 
                  onChange={e => setNewStudent({...newStudent, pedagogicalProfile: {...newStudent.pedagogicalProfile!, challenges: e.target.value}})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Necessidade Educacional Especial (NEE)</label>
              <input 
                className="w-full bg-white text-slate-900 border border-slate-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Ex: Autismo, TDAH, Baixa Visão..." 
                onChange={e => setNewStudent({...newStudent, pedagogicalProfile: {...newStudent.pedagogicalProfile!, specialNeeds: e.target.value}})} 
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancelar</button>
              <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition">Salvar Perfil</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map(student => (
          <div key={student.id} className="bg-white border border-slate-200 p-5 rounded-xl hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                {student.name.charAt(0)}
              </div>
              {student.pedagogicalProfile.specialNeeds && (
                <span className="px-2 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded border border-orange-100 uppercase">
                  NEE
                </span>
              )}
            </div>
            <h4 className="mt-4 font-bold text-slate-800">{student.name}</h4>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-slate-500"><span className="font-semibold text-slate-600">Perfil:</span> {student.pedagogicalProfile.specialNeeds || 'Ensino Regular'}</p>
              <p className="text-xs text-slate-500 line-clamp-2"><span className="font-semibold text-slate-600">Potencial:</span> {student.pedagogicalProfile.strengths}</p>
            </div>
            <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
              Ver Dossiê Pedagógico
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
