import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '@/types/Task';
import { getTasks } from '@/services/taskService';
import { useEffect } from 'react';

interface AppContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<any>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
          const data = await getTasks();
          setTasks(data);
        };
        fetchTasks();
      }, []);

    return (
        <AppContext.Provider value={{ tasks, setTasks }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};