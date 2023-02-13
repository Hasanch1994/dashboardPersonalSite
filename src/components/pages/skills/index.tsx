import { useQuery } from "react-query";
import { fetchSkillsApi } from "../../../libs/services/endpoints/actions";
import { PortalWithState } from "react-portal";
import { Suspense, lazy, useContext, useEffect, useRef, useState } from "react";
import ProgressBar from "./progressBar/progressBar";
import {
  addSkillTypeRequest,
  editSkillTypeRequest,
} from "../../../types/reqTypes";
import { skillTypeResponse } from "../../../types/respTypes";
import { MainContext, mainContextType } from "../../../contexts/mainContext";
import { CSSTransition } from "react-transition-group";
import "./style.css";
import DeleteSkillModal from "../../dialogs/skillsModal/deleteSkillModal";
import AddSkillModal from "../../dialogs/skillsModal/addNewSkillModal";
import EditSkillModal from "../../dialogs/skillsModal/editSkillModal";

const Skills = () => {
  const [skills, setSkills] = useState<Array<skillTypeResponse>>([]);
  const { showToast } = useContext(MainContext) as mainContextType;
  const deleteNodeRef = useRef(null);
  const updateNodeRef = useRef(null);
  const addNodeRef = useRef(null);
  const { isLoading } = useQuery("skills", fetchSkillsApi, {
    staleTime: 160000,
    onSuccess: (data) => {
      setSkills(data);
    },
  });

  const listInsertUpdate = (skill: addSkillTypeRequest, _id: string) => {
    const cp = skills && [...skills];
    if (cp) {
      cp.unshift({ _id: _id, name: skill.name, value: skill.value });

      setSkills(cp);

      showToast({
        message: "new skill added successfully",
        position: "bottomRight",
        state: true,
        type: "success",
      });
    }
  };

  const listDeleteUpdate = (_id: string) => {
    const cp = skills.filter((item) => item._id !== _id);

    setSkills(cp);

    showToast({
      message: "skill Deleted successfully",
      position: "bottomRight",
      state: true,
      type: "success",
    });
  };

  const listUpdate = (data: editSkillTypeRequest) => {
    const cp = [...skills];
    const findItem = cp.find((obj) => obj._id === data.id);
    if (findItem) {
      findItem.name = data.name;
      findItem.value = data.value;
    }

    setSkills(cp);

    showToast({
      message: "skill updated successfully",
      position: "bottomRight",
      state: true,
      type: "success",
    });
  };

  return (
    <>
      <div className="justify-center w-full">
        <header className="w-full flex">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            your skills
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              you can see your skills with values and add new skill, delete
              skill and update your skill
            </p>
          </caption>
        </header>

        {/* table tools */}

        <div className="px-5 w-full">
          <PortalWithState closeOnOutsideClick closeOnEsc>
            {({ openPortal, closePortal, isOpen, portal }) => (
              <>
                <span
                  className="spanLink flex items-center w-28 gap-x-1"
                  onClick={openPortal}
                >
                  <svg
                    className="w-4 h-4 transition duration-75  "
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#2563EB"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                    </g>
                  </svg>
                  add new skill
                </span>

                <CSSTransition
                  nodeRef={addNodeRef}
                  in={isOpen}
                  timeout={300}
                  classNames="alert"
                  onExit={closePortal}
                  unmountOnExit
                >
                  <AddSkillModal
                    nodeRef={addNodeRef}
                    onClose={closePortal}
                    onUpdate={listInsertUpdate}
                    key={self.crypto.randomUUID()}
                  />
                </CSSTransition>
              </>
            )}
          </PortalWithState>
        </div>
        <div className="overflow-x-auto mt-5 px-5">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
              <tr className="border-b">
                <th scope="col" className="px-6 py-3">
                  skill name
                </th>
                <th scope="col" className="px-6 py-3">
                  skill value
                </th>
                <th scope="col" className="px-6 py-3 w-16">
                  delete
                </th>
                <th scope="col" className="px-6 py-3 w-16">
                  update
                </th>
              </tr>
            </thead>
            <tbody>
              {skills &&
                skills.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.name}
                    </td>

                    <td className="px-6 py-4">
                      <ProgressBar percent={item.value} />
                    </td>

                    <td className="px-6 py-4">
                      <PortalWithState closeOnEsc>
                        {({ openPortal, closePortal, isOpen }) => (
                          <>
                            <span
                              className="cursor-pointer"
                              onClick={openPortal}
                            >
                              <svg
                                className="w-4 h-4 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                                fill="#f20707"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#f20707"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />

                                <g id="SVGRepo_iconCarrier">
                                  <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
                                </g>
                              </svg>
                            </span>

                            <CSSTransition
                              nodeRef={deleteNodeRef}
                              in={isOpen}
                              timeout={300}
                              classNames="alert"
                              onExit={closePortal}
                              unmountOnExit
                            >
                              <DeleteSkillModal
                                nodeRef={deleteNodeRef}
                                data={item}
                                onUpdate={listDeleteUpdate}
                                onClose={closePortal}
                                key={self.crypto.randomUUID()}
                              />
                            </CSSTransition>
                          </>
                        )}
                      </PortalWithState>
                    </td>

                    <td className="px-6 py-4 ">
                      <PortalWithState closeOnEsc>
                        {({ openPortal, closePortal, isOpen, portal }) => (
                          <>
                            <span
                              className="cursor-pointer"
                              onClick={openPortal}
                            >
                              <svg
                                fill="#7e6fc8"
                                className="w-4 h-4 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#7e6fc8"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />

                                <g id="SVGRepo_iconCarrier">
                                  <path d="M20.548,3.452a1.542,1.542,0,0,1,0,2.182L12.912,13.27,9.639,14.361l1.091-3.273,7.636-7.636A1.542,1.542,0,0,1,20.548,3.452ZM4,21H19a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7H5V6h7a1,1,0,0,0,0-2H4A1,1,0,0,0,3,5V20A1,1,0,0,0,4,21Z" />
                                </g>
                              </svg>
                            </span>
                            <CSSTransition
                              nodeRef={updateNodeRef}
                              in={isOpen}
                              timeout={300}
                              classNames="alert"
                              onExit={closePortal}
                              unmountOnExit
                            >
                              <EditSkillModal
                                nodeRef={updateNodeRef}
                                preData={item}
                                onUpdate={listUpdate}
                                onClose={closePortal}
                                key={self.crypto.randomUUID()}
                              />
                            </CSSTransition>
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

export default Skills;
