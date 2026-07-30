import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '#/store';
import type { ReduxStore } from '#/types/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<ReduxStore>();
