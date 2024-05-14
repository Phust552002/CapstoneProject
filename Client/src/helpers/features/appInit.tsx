import { useEffect, useState } from 'react';

export const useAppInIt = () => {
  const [isDone, setIsDone] = useState(false);
 
  

  const initData = async () => {
   
  };
  useEffect(() => {
      setIsDone(true);
  }, []);
  return {isDone, initData};
};
