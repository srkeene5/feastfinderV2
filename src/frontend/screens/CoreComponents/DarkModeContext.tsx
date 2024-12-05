import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../config';
import { useAuth } from '../UserComponents/Authorizer.tsx'; // Adjust the import path accordingly

interface DarkModeContextType {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

interface DarkModeContextProps {
    children: React.ReactNode;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<DarkModeContextProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchDarkMode = async () => {
            if (user) {
                try {
                    const res = await fetch(`${API_BASE_URL}/api/auth/preferences`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.token}`,
                        },
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setDarkMode(data.darkMode);
                        console.log('Recieved DarkMode');
                    } else {
                        console.error('Failed to fetch user preferences');
                    }
                } catch (err) {
                    console.error('Error fetching user preferences', err);
                }
            }
        };

        fetchDarkMode();
    }, [user]);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = (): DarkModeContextType => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};
