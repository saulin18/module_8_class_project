import { useContext } from 'react';
import {
  WordleDispatchContext,
  WordleStateContext,
  type WordleDispatch,
  type WordleState,
} from './WordleProvider';

export function useWordleState(): WordleState {
  const ctx = useContext(WordleStateContext);
  if (!ctx)
    throw new Error('useWordleState must be used within WordleProvider');
  return ctx;
}

export function useWordleDispatch(): WordleDispatch {
  const ctx = useContext(WordleDispatchContext);
  if (!ctx)
    throw new Error('useWordleDispatch must be used within WordleProvider');
  return ctx;
}
