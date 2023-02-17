import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchInboxApi } from "../../../libs/services/endpoints/actions";
import { convertDateTime } from "../../helper/convertDateTime";
import { PortalWithState } from "react-portal";
import InboxPagination from "./inboxTools/inboxPaggination";
import { inboxTypeResponse } from "../../../types/respTypes";
import InboxModal from "../../dialogs/inboxModal/inboxModal";

const Inbox = () => {
  const [totalInbox, setTotalInbox] = useState<number>(0);
  const [postsPerPage] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<Array<inboxTypeResponse>>();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState<Array<inboxTypeResponse>>();
  const { data, isLoading, isError, isIdle } = useQuery(
    "inbox",
    fetchInboxApi,
    {
      staleTime: 60000,
      onSuccess: (data) => {
        if (data) {
          setPosts(data);
          setCurrentPosts(
            data && data.slice(indexOfFirstPost, indexOfLastPost)
          );

          setTotalInbox(data.length);
        }
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    setCurrentPosts(data && data.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage]);

  const paginate = (type: string) => {
    if (type === "increment") setCurrentPage(currentPage + 1);
    else setCurrentPage(currentPage - 1);
  };

  const updateVisitedPost = (id: string) => {
    const filteredData =
      posts &&
      posts.map((item) => {
        if (item._id === id) {
          return { ...item, visited: true };
        } else return item;
      });

    setCurrentPosts(
      filteredData && filteredData.slice(indexOfFirstPost, indexOfLastPost)
    );
  };

  return (
    <>
      <div className="shadow-md sm:rounded-lg justify-center w-full">
        <header className="w-full flex">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Messages from ContactUs form
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              all message received with a type that show message come from what
              type(project,tutorial ,...)
            </p>
          </caption>
        </header>

        {/* table tools */}

        <div className="relative w-full h-12 left-0 top-0 p-5">
          {data && (
            <InboxPagination
              totalInbox={totalInbox}
              indexOfFirstPost={indexOfFirstPost}
              indexOfLastPost={indexOfLastPost}
              currentPage={currentPage}
              postPerPage={postsPerPage}
              paginate={paginate}
            />
          )}
        </div>
        <div className="overflow-x-auto p-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="border-b">
                <th scope="col" className="px-6 py-3">
                  Name Family
                </th>
                <th scope="col" className="px-6 py-3">
                  Email Address
                </th>
                <th scope="col" className="px-6 py-3">
                  type
                </th>
                <th scope="col" className="px-6 py-3">
                  date
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">read message</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPosts &&
                currentPosts.map((item) => (
                  <tr
                    key={self.crypto.randomUUID()}
                    className="bg-white border-b hover:bg-gray-50 "
                  >
                    <td
                      scope="row"
                      className={`px-6 py-4 ${
                        !item.visited
                          ? "font-medium text-gray-900"
                          : "font-normal"
                      }  whitespace-nowrap `}
                    >
                      {item.nameFamily}
                    </td>
                    <td className="px-6 py-4">{item.emailAddress}</td>
                    <td className="px-6 py-4">{item.requestType}</td>
                    <td className="px-6 py-4">{convertDateTime(item.date)}</td>
                    <td className="px-6 py-4 text-right flex justify-end">
                      <PortalWithState closeOnOutsideClick closeOnEsc>
                        {({ openPortal, closePortal, isOpen }) => (
                          <>
                            <span className="iconRipple" onClick={openPortal}>
                              <svg
                                className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="read">
                                  <g>
                                    <path d="M12,18.883a10.8,10.8,0,0,1-9.675-5.728,2.6,2.6,0,0,1,0-2.31A10.8,10.8,0,0,1,12,5.117a10.8,10.8,0,0,1,9.675,5.728h0a2.6,2.6,0,0,1,0,2.31A10.8,10.8,0,0,1,12,18.883ZM12,6.117a9.787,9.787,0,0,0-8.78,5.176,1.586,1.586,0,0,0,0,1.415A9.788,9.788,0,0,0,12,17.883a9.787,9.787,0,0,0,8.78-5.176,1.584,1.584,0,0,0,0-1.414h0A9.787,9.787,0,0,0,12,6.117Z" />
                                    <path d="M12,16.049A4.049,4.049,0,1,1,16.049,12,4.054,4.054,0,0,1,12,16.049Zm0-7.1A3.049,3.049,0,1,0,15.049,12,3.052,3.052,0,0,0,12,8.951Z" />
                                    <circle cx="12" cy="12" r="2.028" />
                                  </g>
                                </g>
                              </svg>
                            </span>
                            {isOpen && (
                              <InboxModal
                                data={item}
                                onClickOutside={closePortal}
                                onUpdateMessage={(id) => updateVisitedPost(id)}
                                onClose={closePortal}
                                key={self.crypto.randomUUID()}
                              />
                            )}
                          </>
                        )}
                      </PortalWithState>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Inbox;
