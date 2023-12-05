/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import useGetUsersVM from './useGetUsers.vm'
export default function UsersView() {
  const [count, setCount] = React.useState(0);
  const { data, isLoading } = useGetUsersVM();
  if (isLoading) {
    return 'loading ...'
  }
  return (
    <>
      <p>{count}</p>
      {
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {data?.map((user) => (
            <div
              key={user.id}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
              <img
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                style={{ width: 180, height: 180 }}
              />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      }
    </>
  );
}
