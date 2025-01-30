import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Checkout = ({ categories, transactions }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Checkout</h1>
      <div className="flex h-fit items-center">
        <div className="mx-auto w-full px-5 lg:container">
          <div className="mx-auto max-w-screen-lg">
            <div className="my-10 min-w-full overflow-x-auto rounded-md border shadow-sm dark:border-gray-700">
              <table className="min-w-full whitespace-nowrap rounded bg-white">
                <thead className="border-b bg-gray-50">
                  <tr className="">
                    <th className="px-3 py-3 text-left align-middle text-xs font-normal uppercase text-gray-500">
                      Category Name
                    </th>
                    <th className="px-3 py-3 text-left align-middle text-xs font-normal uppercase text-gray-500">
                      Date
                    </th>
                    <th className="px-3 py-3 text-left align-middle text-xs font-normal uppercase text-gray-500">
                      Customer
                    </th>
                    <th className="px-3 py-3 text-left align-middle text-xs font-normal uppercase text-gray-500">
                      Transaction
                    </th>
                    <th className="px-3 py-3 text-right align-middle text-xs font-normal uppercase text-gray-500">
                      Amount
                    </th>
                    <th className="px-3 py-3 text-left align-middle text-xs font-normal uppercase text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-sm">
                  {transactions?.map(
                    (e,index) =>
                      e.userId == user?.uid && (
                        <tr key={index}>
                          <td className="px-3 py-4">
                            {categories?.map(
                              (e) =>
                                e.userId == user?.uid && (
                                  <span
                                    key={e?.name}
                                    className="w-full text-center font-nohemiLight text-2xl text-sky-200"
                                    onClick={() => setData(e)}
                                  >
                                    {e.name}
                                  </span>
                                ),
                            )}
                          </td>

                          <td className="px-3 py-4 text-gray-500">May 07, 2021</td>
                          <td className="px-3 py-4">
                            <div className="flex w-max items-center">
                              <img
                                width="50"
                                height="50"
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=faces&amp;fit=crop&amp;h=200&amp;w=200&amp;s=3e378252a934e660f231666b51bd269a"
                                alt="avatar"
                              />
                              <div className="ml-4">
                                <div>Chase Maxwell</div>
                                <div className="text-sm text-gray-400">
                                  chase@anothercompany.com
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-gray-600 border">{e.name}</td>
                          <td className="px-3 py-4 text-right text-gray-500 border">
                            {e.amount}
                          </td>
                          <td className="w-20 px-3 py-2 text-center text-gray-500">
                            <div className="flex place-content-center">
                              <a href="#!">
                                <svg
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                  ></path>
                                </svg>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
