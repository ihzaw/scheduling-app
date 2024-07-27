"use client";

import { useState } from "react";
import Calendar from "./Calendar";
import Navbar from "./Navbar";
import ModalAddSchedule from "./ModalAddSchedule";

export interface CalendarData {
  user: string;
  start: string;
  end: string;
  color?: string;
}

interface CalendarSectionProps {
  initialData: CalendarData[];
}

const CalendarSection = (props: CalendarSectionProps) => {
  const { initialData } = props;
  const [data, setData] = useState(initialData);

  const handleClickAdd = () => {
    const modal = document?.getElementById("add_schedule") as HTMLDialogElement;

    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div className="mb-8">
        <Navbar
          titleLabel="Schedule"
          btnLabel="Add Schedule"
          onClickBtn={handleClickAdd}
        />
      </div>
      <Calendar data={data} />
      <ModalAddSchedule />
    </>
  );
};

export default CalendarSection;
