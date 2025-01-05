import type {
  UseMutationResult,
  UseQueryResult
} from '@tanstack/react-query';

import { ResponseObject } from './_modulesTypes';
export type VoidFunction = (...args: any[]) => void;
export type OutputFunction<T> = (...args: any[]) => T;
export type AnyObject = {[key: string]:any}
export type DispatchSetStateAction<T> = React.Dispatch<React.SetStateAction<T>>
export type RQMutationResult<RESPONSE,PARAMS> = UseMutationResult<
    ResponseObject<RESPONSE>,
    Error,
    PARAMS,
    unknown
  >;


export type RQResult<T> = UseQueryResult<ResponseObject<T>, Error>