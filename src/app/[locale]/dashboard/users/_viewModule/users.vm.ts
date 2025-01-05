import { useContext, useEffect, useState } from 'react';
import { PaginationList } from 'papak/_modulesTypes';
import type {
  DispatchSetStateAction,
  RQMutationResult,
  RQResult,
} from 'papak/_utilsTypes';
import { NotificationContext } from 'papak/configs/notificationContextProvider';
import { useSearchParamsToObject } from 'papak/utils/useSearchParamsToObject';
import { UsersPresentation } from '@/modules/users/Users.presentation';
import {
  Users,
  UsersCreateParams,
  UsersUpdateParams,
} from '@/modules/users/domains/models/Users';

export interface IUsersVM {
  selectedRowState: Users[];
  setSelectedRowsState: DispatchSetStateAction<Users[]>;
  openEditModal: boolean;
  setOpenEditModal: DispatchSetStateAction<boolean>;
  openRemoveModal: boolean;
  setOpenRemoveModal: DispatchSetStateAction<boolean>;
  openAddModal: boolean;
  setOpenAddModal: DispatchSetStateAction<boolean>;
  getAllUsers: RQResult<PaginationList<Users>>;
  updateUser: RQMutationResult<null, UsersUpdateParams>;
  removeUser: RQMutationResult<null, { id: string }>;
  addUser: RQMutationResult<null, UsersCreateParams>;
}
export function useUsersVM(): IUsersVM {
  const searchParams = useSearchParamsToObject();
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { useGetAll, useUpdate, useRemove, useCreate } = UsersPresentation(
    openNotificationWithIcon,
  );

  const [selectedRowState, setSelectedRowsState] = useState<Users[]>([]);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);

  const getAllUsers = useGetAll(searchParams);
  const updateUser = useUpdate();
  const removeUser = useRemove();
  const addUser = useCreate();

  useEffect(() => {
    if (updateUser.isSuccess || removeUser.isSuccess || addUser.isSuccess) {
      getAllUsers.refetch();
      setOpenEditModal(false);
      setOpenAddModal(false);
      setOpenRemoveModal(false);
      setSelectedRowsState([]);
    }
  }, [updateUser.isSuccess, removeUser.isSuccess, addUser.isSuccess]);

  return {
    selectedRowState,
    setSelectedRowsState,
    getAllUsers,
    openEditModal,
    setOpenEditModal,
    updateUser,
    openRemoveModal,
    setOpenRemoveModal,
    removeUser,
    openAddModal,
    setOpenAddModal,
    addUser,
  };
}
