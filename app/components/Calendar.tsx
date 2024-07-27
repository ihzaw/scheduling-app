"use client";

import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { EventInput } from "@fullcalendar/core";
import { format } from "date-fns";
import { useState } from "react";
import { CalendarData } from "./CalendarSection";

interface CalendarProps {
  data: CalendarData[]
}

const Calendar = (props: CalendarProps) => {
  const {
    data
  } = props
  
  return (
    <FullCalendar
      plugins={[resourceTimelinePlugin]}
      headerToolbar={{
        left: "",
        center: "title",
        right: "prev,next",
      }}
      initialView="resourceTimelineYear"
      events={data.map((el, index): EventInput => {
        const resourceId = `${el.user.split(" ").join()}_${index}`;
        return {
          id: `${index}`,
          resourceId,
          title: `${format(el.start, 'MMM dd')} - ${format(el.end, 'MMM dd')}`,
          start: new Date(el.start),
          end: new Date(el.end)
        };
      })}
      displayEventTime={false}
      resourceLabelClassNames="flex justify-center items-center h-full text-3xl"
      resourceAreaHeaderContent={
        <>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input type="text" className="grow" placeholder="Search" />
          </label>
        </>
      }
      resources={data.map((el, index) => {
        const resourceId = `${el.user.split(" ").join()}_${index}`;
        return {
          id: resourceId,
          title: el.user,
          eventColor: el.color
        };
      })}
      expandRows
      slotMinWidth={50}
      viewClassNames={"border-2 border-slate-700"}
      height={750}
      slotLabelFormat={[
        { day: "numeric" }
      ]}
    />
  );
};

export default Calendar;
