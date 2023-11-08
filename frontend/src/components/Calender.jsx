import React, { useState, useEffect, Fragment, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Dialog, Transition } from "@headlessui/react";

import "../assets/css/calendar.css";
import {
  makeUnauthenticatedGETRequestToken,
  makeUnauthenticatedPOSTRequestToken,
} from "../utils/serverHelpers";

export default function Home({ currentUser }) {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const [reloadCalendar, setReloadCalendar] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [idToDelete, setIdToDelete] = useState(null);
  const [idToChange, setIdToChange] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    des: "",
    start: "",
    allDay: false,
    id: 0,
  });

  const [dragEvent, setDragEvent] = useState("");
  const [description, setDescription] = useState("");
  const [showDragEvent, setShowDragEvent] = useState(false);
  const [currentClickEvent, setCurrentClickEvent] = useState(null);
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        },
      });
    }
    getCalendar();
  }, []);

  console.log(allEvents)

  useEffect(() => {
    // Tạo một effect để theo dõi sự thay đổi của allEvents
    if (reloadCalendar) {
      // Khi reloadCalendar thay đổi, tải lại dữ liệu

      // Tải lại dữ liệu, ví dụ:
      getCalendar(); // Đảm bảo rằng bạn có hàm getCalendar để tải lại dữ liệu

      // Sau khi tải lại dữ liệu, reset reloadCalendar về false
      setReloadCalendar(false);
    }
  }, [reloadCalendar]);

  // Call API

  const createCalendar = async (newEvent) => {
    try {
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/calendar/create",
        {
          event: newEvent,
          currentUserId: currentUser._id,
        }
      );
    } catch (error) {
      console.error("Error fetching create Calendar: ", error);
    }
  };

  const getCalendar = async () => {
    try {
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/calendar/getCalendar",
        {
          currentUser: currentUser,
        }
      );
      setAllEvents(response);
    } catch (error) {
      console.log("Error fetching get Calendar: ", error);
    }
  };

  const deleteCalendar = async (eventId) => {
    try {
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/calendar/delete",
        {
          currentUserId: currentUser._id,
          eventId: eventId,
        }
      );
    } catch (error) {
      console.log("Error fetching delete Calendar: ", error);
    }
  };

  const updateCalendar = async (eventToUpdate) => {
    try {
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/calendar/update",
        {
          eventToUpdate: eventToUpdate,
          currentUserId: currentUser._id,
        }
      );
    } catch (error) {
      console.log("Error fetching update Calendar: ", error);
    }
  };

  // Ended Call

  function handleDateClick(arg) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  }

  function addEvent(data) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      des: data.draggedEl.getAttribute("des"),
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
    // createCalendar(allEvents[allEvents.length - 1]);
  }

  // function handleDeleteModal(data) {
  //   setShowDeleteModal(true);
  //   setIdToDelete(Number(data.event.id));
  // }

  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
    );
    deleteCalendar(idToDelete);
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: "",
      des: "",
      start: "",
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setShowUpdateModal(false);
    setIdToDelete(null);
    setIdToChange(null);
  }

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit() {
    // e.preventDefault();
    createCalendar(newEvent);
    // setAllEvents([...allEvents, newEvent]);
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: "",
      des: "",
      start: "",
      allDay: false,
      id: 0,
    });
  }

  function handleSubmitUpdate(e) {
    e.preventDefault();
  }

  const handleCreateDragEvent = () => {
    setShowDragEvent(true);
    if (dragEvent) {
      const newEvent = {
        title: dragEvent,
        id: new Date().getTime().toString(),
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setDragEvent("");
    } else {
      return;
    }
  };

  // Update Event

  const handleUpdateModal = (data) => {
    setIdToChange(data.event.id);
    setIdToDelete(Number(data.event.id));
    setShowUpdateModal(true);
    const filteredEvents = allEvents.filter((event) => event.id !== 0);

    // Cập nhật danh sách sự kiện
    setAllEvents(filteredEvents);
  };

  function handleUpdate() {
    // Tìm sự kiện cần cập nhật bằng id hoặc một trường khác
    const eventToUpdate = allEvents.find(
      (event) => Number(event.id) === Number(idToChange)
    );

    if (eventToUpdate) {
      // Cập nhật thông tin của sự kiện
      eventToUpdate.title = currentClickEvent.event._def.title;
      eventToUpdate.des = currentClickEvent.event._def.extendedProps.des;

      // Cập nhật danh sách sự kiện
      setAllEvents([...allEvents]);

      const filteredEvents = allEvents.filter((event) => event.id !== 0);

      // Cập nhật danh sách sự kiện
      setAllEvents(filteredEvents);

      setCurrentClickEvent(false);
      setShowUpdateModal(false);
      setIdToChange(null);
    }
    updateCalendar(eventToUpdate);
    getCalendar();
  }

  return (
    <div className="w-full relative py-16">
      <nav className="flex justify-center mb-12 border-b border-violet-100 p-4 w-screen items-center text-center">
        <h1 className="font-bold text-2xl text-gray-700">Lịch trình bữa ăn</h1>
      </nav>
      <main className="flex flex-col items-center justify-center">
        <div className="flex w-full justify-center">
          <div className="">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
              }}
              events={allEvents}
              nowIndicator={true}
              editable={false}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => {
                addEvent(data);
              }}
              eventClick={(data) => {
                // handleDeleteModal(data);
                setCurrentClickEvent(data);
                handleUpdateModal(data);
                setCurrent(true);
              }}
            />
          </div>
          <div className="flex flex-col relative">
            <div
              id="draggable-el"
              className=" ml-8 border-2 p-2 rounded-md mt-16 bg-violet-50 flex justify-center items-center flex-col"
            >
              <h1 className="font-bold text-md text-center">Drag Event</h1>
              <button
                className="border-[1px] border-solid border-violet-100 rounded-md px-2 py-1 bg-violet-600 my-4 text-violet-100"
                onClick={() => setShowDragEvent(true)}
              >
                Create Event
              </button>
              {events.map((event, index) => (
                <div
                  className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-violet-300 text-white"
                  title={event.title}
                  key={event.id}
                >
                  {event.title}
                </div>
              ))}
            </div>

            {showDragEvent && (
              <div className="absolute bottom-48 left-4 right-0 top-12 flex w-[336px] justify-center items-center flex-col bg-violet-200">
                <header className="my-2 text-violet-700">New Event</header>
                <main className="flex flex-col">
                  <input
                    className="border-none my-2 outline-none px-2 py-1 rounded-sm"
                    value={dragEvent}
                    onChange={(e) => {
                      e.preventDefault();
                      setDragEvent(e.target.value);
                    }}
                    placeholder="Event"
                  />
                </main>
                <button
                  className="my-4 bg-violet-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-violet-400"
                  onClick={(e) => {
                    handleCreateDragEvent();
                    setShowDragEvent(false);
                  }}
                >
                  Add Event
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-red-400"
                  onClick={() => setShowDragEvent(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <Transition.Root show={showUpdateModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setShowUpdateModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"></div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Update Event
                        </Dialog.Title>
                        <form action="submit" onSubmit={handleSubmitUpdate}>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="title"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                              value={currentClickEvent?.event?._def.title}
                              onChange={(e) => {
                                setCurrentClickEvent({
                                  ...currentClickEvent,
                                  event: {
                                    ...currentClickEvent.event,
                                    _def: {
                                      ...currentClickEvent.event._def,
                                      title: e.target.value, // Cập nhật giá trị title trong currentClickEvent
                                    },
                                  },
                                });
                              }}
                              placeholder="Title"
                            />
                            <input
                              type="text"
                              name="des"
                              className="block w-full rounded-md border-0 py-1.5 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                              value={
                                currentClickEvent?.event?._def.extendedProps.des
                              }
                              onChange={(e) =>
                                setCurrentClickEvent({
                                  ...currentClickEvent,
                                  event: {
                                    ...currentClickEvent.event,
                                    _def: {
                                      ...currentClickEvent.event._def,
                                      extendedProps: {
                                        ...currentClickEvent.event._def
                                          .extendedProps,
                                        des: e.target.value, // Cập nhật giá trị des trong currentClickEvent
                                      },
                                    },
                                  },
                                })
                              }
                              placeholder="Description"
                            />
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                              onClick={handleUpdate}
                            >
                              Change
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-300 sm:col-start-1 sm:mt-0"
                              onClick={() => setShowDeleteModal(true)}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setShowDeleteModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Delete Event
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this event?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"></div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add Event
                        </Dialog.Title>
                        <form type="none">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="title"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                              value={newEvent.title}
                              onChange={(e) => handleChange(e)}
                              placeholder="Title"
                            />
                            <input
                              type="text"
                              name="des"
                              className="block w-full rounded-md border-0 py-1.5 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                              value={newEvent.des}
                              onChange={(e) => handleChange(e)}
                              placeholder="Description"
                            />
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              // type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                              disabled={newEvent.title === ""}
                              onClick={handleSubmit}
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </div>
  );
}
