import { useState } from 'react';

export type Order = 'asc' | 'desc';

const orderKey = 'order';

const getStoredOrder = (): Order => {
  const order = localStorage.getItem(orderKey);
  return order === 'asc' || order === 'desc' ? order : 'asc';
}

export const useOrderState = (): [Order, (order: Order) => void] => {
    const [order, setStateOrder] = useState<Order>(getStoredOrder);
  
    const setOrder = (newOrder: Order): void => {
      setStateOrder(newOrder);
      localStorage.setItem(orderKey, newOrder);
    }
  
    return [order, setOrder];
  }
