import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', size = 'md' }) => {
  const { toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        flex items-center justify-center
        bg-gray-200 dark:bg-gray-700
        hover:bg-gray-300 dark:hover:bg-gray-600
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{ rotate: isDark ? 180 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className={`${iconSizes[size]} text-yellow-500`} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className={`${iconSizes[size]} text-blue-400`} />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
