// import React, { useEffect, useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { mySchedules } from "../../services/apis/classesApis";
// import { IoMdMore } from "react-icons/io";

// const localizer = momentLocalizer(moment);

// const BigCalendar = ({ selectedDate }) => {
//   const [events, setEvents] = useState([]);
//   const [menuState, setMenuState] = useState({
//     open: false,
//     anchorEl: null,
//     selectedEvent: null,
//   });

//   const fetchScheduleData = async () => {
//     try {
//       const response = await mySchedules();

//       if (response?.schedule) {
//         const formattedEvents = response.schedule.map((event) => ({
//           id: event._id,
//           title: event.title,
//           start: new Date(event.startTime),
//           end: new Date(event.endTime),
//         }));

//         setEvents(formattedEvents);
//         if (selectedDate) {
//           filterEventsByDate(formattedEvents, selectedDate);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching schedule data:", error);
//     }
//   };

//   const filterEventsByDate = (allEvents, date) => {
//     const startOfDay = moment(date).startOf("day").toDate();
//     const endOfDay = moment(date).endOf("day").toDate();

//     const filtered = allEvents.filter(
//       (event) =>
//         moment(event.start).isSameOrAfter(startOfDay) &&
//         moment(event.start).isSameOrBefore(endOfDay)
//     );

//     setEvents(filtered);
//   };

//   useEffect(() => {
//     fetchScheduleData();
//   }, [selectedDate]);

//   const handleMenuOpen = (event, selectedEvent) => {
//     setMenuState({
//       open: true,
//       anchorEl: event.currentTarget,
//       selectedEvent: selectedEvent,
//     });
//   };

//   const handleMenuClose = () => {
//     setMenuState({
//       open: false,
//       anchorEl: null,
//       selectedEvent: null,
//     });
//   };

//   const handleViewDetails = () => {
//     handleMenuClose();
//   };

//   const handleEditClass = () => {
//     handleMenuClose();
//   };

//   const handleDeleteClass = () => {
//     handleMenuClose();
//   };

//   const EventComponent = ({ event }) => (
//     <>
//       <div className="flex items-center relative">
//         <span>{event.title}</span>
//         <button
//           size="small"
//           onClick={(e) => handleMenuOpen(e, event)}
//           style={{ marginLeft: "auto" }}
//         >
//           <IoMdMore fontSize="small" />
//         </button>
//       </div>
//       {menuState.open && menuState.selectedEvent === event && (
//         <div className="absolute top-[-30px] right-0 py-[10px] max-w-[157px] w-full shadow-[0px_4px_4px_#00000040;]">
//           <div
//             className="text-[14px] font-normal text-black hover:text-white p-[10px] bg-white hover:bg-primary"
//             onClick={handleViewDetails}
//           >
//             View Details
//           </div>
//           <div
//             className="text-[14px] font-normal text-black hover:text-white p-[10px] bg-white hover:bg-primary"
//             onClick={handleEditClass}
//           >
//             Edit Class
//           </div>
//           <div
//             className="text-[14px] font-normal text-black hover:text-white p-[10px] bg-white hover:bg-primary"
//             onClick={handleDeleteClass}
//           >
//             Delete Class
//           </div>
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div className="w-full">
//       <div className="bg-white shadow-lg rounded-lg">
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: "100vh", width: "100%" }}
//           className="md:h-[300px]"
//           views={["month", "week", "day"]}
//           defaultView="month"
//           components={{
//             event: EventComponent,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default BigCalendar;

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { mySchedules } from "../../services/apis/classesApis";
import { IoMdMore } from "react-icons/io";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ selectedDate }) => {
  const [events, setEvents] = useState([]);
  const [menuState, setMenuState] = useState({
    open: false,
    anchorEl: null,
    selectedEvent: null,
  });

  const fetchScheduleData = async () => {
    try {
      const response = await mySchedules();

      if (response?.schedule) {
        const formattedEvents = response.schedule.map((event) => ({
          id: event._id,
          title: event.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
        }));

        setEvents(formattedEvents);
        if (selectedDate) {
          filterEventsByDate(formattedEvents, selectedDate);
        }
      }
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  const filterEventsByDate = (allEvents, date) => {
    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();

    const filtered = allEvents.filter(
      (event) =>
        moment(event.start).isSameOrAfter(startOfDay) &&
        moment(event.start).isSameOrBefore(endOfDay)
    );

    setEvents(filtered);
  };

  useEffect(() => {
    fetchScheduleData();
  }, [selectedDate]);

  const handleMenuOpen = (event, selectedEvent) => {
    setMenuState({
      open: true,
      anchorEl: event.currentTarget,
      selectedEvent: selectedEvent,
    });
  };

  const handleMenuClose = () => {
    setMenuState({
      open: false,
      anchorEl: null,
      selectedEvent: null,
    });
  };

  const handleViewDetails = () => {
    handleMenuClose();
  };

  const handleEditClass = () => {
    handleMenuClose();
  };

  const handleDeleteClass = () => {
    handleMenuClose();
  };

  const EventComponent = ({ event }) => (
    <>
      <div className="flex items-center">
        <span>{event.title}</span>
        <button
          size="small"
          onClick={(e) => handleMenuOpen(e, event)}
          style={{ marginLeft: "auto" }}
        >
          <IoMdMore fontSize="small" />
        </button>
      </div>
      {menuState.open && menuState.selectedEvent === event && (
        <div
          className="absolute top-[-5px] right-0 py-2 max-w-[157px] w-full shadow-lg rounded-md bg-white"
          style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
        >
          <div
            className="text-sm font-normal text-black hover:text-white p-2 bg-white hover:bg-primary cursor-pointer"
            onClick={handleViewDetails}
          >
            View Details
          </div>
          <div
            className="text-sm font-normal text-black hover:text-white p-2 bg-white hover:bg-primary cursor-pointer"
            onClick={handleEditClass}
          >
            Edit Class
          </div>
          <div
            className="text-sm font-normal text-black hover:text-white p-2 bg-white hover:bg-primary cursor-pointer"
            onClick={handleDeleteClass}
          >
            Delete Class
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="w-full">
      <div className="bg-white shadow-lg rounded-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100vh", width: "100%" }}
          className="md:h-[300px]"
          views={["month", "week", "day"]}
          defaultView="month"
          components={{
            event: EventComponent,
          }}
        />
      </div>
    </div>
  );
};

export default BigCalendar;
