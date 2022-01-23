import { FoodChain } from './food-chain/food-chain';

export const local = window.location.origin.includes('localhost');

export const FoodApp = () => {
  return <FoodChain />;
};
