// pages/Users.tsx

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "Employee",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Manager",
    status: "Inactive",
  },
];

export default function Users() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-500">
            Manage all users in the system.
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center space-x-2">
                  <button className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600">
                    Edit
                  </button>

                  <button className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}