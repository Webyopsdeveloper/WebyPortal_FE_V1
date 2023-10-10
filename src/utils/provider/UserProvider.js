import React, { createContext, useState } from "react";

const initialUsers = {
  users: [
    {
      customer_id: 1,
      customer_lastname: "Smith",
      customer_firstname: "Alice",
      customer_dob: "1990-03-22",
      customer_read_access: true,
      customer_write_access: true,
      customer_admin_access: false,
      customer_ct: "2023-07-27 10:15:30",
      customer_ut: "2023-07-27 10:15:30",
      customer_comment: "Regular user with read and write access.",
      customer_username: "alice90",
      customer_email: "alice@example.com",
      customer_password: "alicepass123",
    },
    {
      customer_id: 2,
      customer_lastname: "Johnson",
      customer_firstname: "Bob",
      customer_dob: "1982-09-12",
      customer_read_access: true,
      customer_write_access: false,
      customer_admin_access: false,
      customer_ct: "2023-07-27 09:20:45",
      customer_ut: "2023-07-27 09:20:45",
      customer_comment: "Standard user with read access only.",
      customer_username: "bobjohn82",
      customer_email: "bob@example.com",
      customer_password: "bobpass456",
    },
    {
      customer_id: 3,
      customer_lastname: "Williams",
      customer_firstname: "Emma",
      customer_dob: "1988-06-05",
      customer_read_access: true,
      customer_write_access: true,
      customer_admin_access: true,
      customer_ct: "2023-07-27 08:12:10",
      customer_ut: "2023-07-27 08:12:10",
      customer_comment: "Administrator with full access rights.",
      customer_username: "emma88",
      customer_email: "emma@example.com",
      customer_password: "emmapass789",
    },
    {
      customer_id: 4,
      customer_lastname: "Brown",
      customer_firstname: "Michael",
      customer_dob: "1995-11-02",
      customer_read_access: true,
      customer_write_access: false,
      customer_admin_access: false,
      customer_ct: "2023-07-27 11:45:55",
      customer_ut: "2023-07-27 11:45:55",
      customer_comment: "Standard user with read access only.",
      customer_username: "michael95",
      customer_email: "michael@example.com",
      customer_password: "mikepass101",
    },
    {
      customer_id: 5,
      customer_lastname: "Lee",
      customer_firstname: "Sophia",
      customer_dob: "1980-12-18",
      customer_read_access: true,
      customer_write_access: true,
      customer_admin_access: false,
      customer_ct: "2023-07-27 07:05:20",
      customer_ut: "2023-07-27 07:05:20",
      customer_comment: "Regular user with read and write access.",
      customer_username: "sophia80",
      customer_email: "sophia@example.com",
      customer_password: "sophiapass246",
    },
  ],
};

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}
