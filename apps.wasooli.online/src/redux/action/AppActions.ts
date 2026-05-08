import { USER } from './ActionTypes';
// import type { AuctionsResponse } from '../../types/auctions';

// Action creators
export const setUser = (user: any) => ({
  type: USER,
  payload: user,
});

export const clearUser = () => ({
  type: USER,
  payload: null,
});