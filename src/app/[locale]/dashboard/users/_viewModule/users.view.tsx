'use client';

import { IconEdit, IconX } from '@tabler/icons-react';
import { Button, type TableColumnsType } from 'antd';
import { ContentEditableTable } from 'papak/kits/ContentEditableTable';
import { PageFilterInlineSearch } from '@/components/PageFilterInlineSearch';
import { Users } from '@/modules/users/domains/models/Users';
import { AddModal } from '../_components/AddModal';
import { EditModal } from '../_components/EditModal';
import { RemoveModal } from '../_components/RemoveModal';
import { useUsersContext } from './users.context';

export function UsersView() {
  const {
    selectedRowState,
    setSelectedRowsState,
    getAllUsers,
    setOpenEditModal,
    setOpenAddModal,
    setOpenRemoveModal,
  } = useUsersContext();

  const { data: response, isLoading } = getAllUsers;
  const data = response?.data;

  const inlineFilter = () => {
    return (
      <div className="mr-4">
        <Button
          size="small"
          type="primary"
          onClick={() => setOpenAddModal(true)}
        >
          Add
        </Button>
      </div>
    );
  };

  const columns: TableColumnsType<Users> = [
    {
      title: 'name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'username',
      width: 100,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'email',
      width: 100,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'actions',
      width: 50,
      key: 'actions',
      render: (_value, records) => {
        return (
          <div className="flex items-center justify-center gap-4">
            <IconEdit
              className="cursor-pointer"
              onClick={() => {
                setSelectedRowsState([records]);
                setOpenEditModal(true);
              }}
            />
            <IconX
              className="cursor-pointer"
              onClick={() => {
                setSelectedRowsState([records]);
                setOpenRemoveModal(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageFilterInlineSearch
        searchBar={true}
        title="Users Management"
        inlineFilter={inlineFilter}
      />
      <ContentEditableTable<Users>
        onSelectNone={true}
        count={data?.count}
        data={data?.results || []}
        isPending={isLoading}
        columns={columns}
        rowKey="id"
        setSelectedRowsState={setSelectedRowsState}
        selectedRowsState={selectedRowState}
        actions={[]}
        paginationPath="/en/dashboard/users"
      />
      <AddModal />
      <EditModal />
      <RemoveModal />
    </>
  );
}
