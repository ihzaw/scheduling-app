"use client";

import { useState } from "react";
import Calendar from "./Calendar";
import Navbar from "./Navbar";
import ModalAddSchedule, { FormAdd } from "./ModalAddSchedule";

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

  const openModalAdd = () => {
    const modal = document?.getElementById("add_schedule") as HTMLDialogElement;

    if (modal) {
      modal.showModal();
    }
  };

  const handleAddSchedule = (form: FormAdd) => {
    if (form && form.startDate && form.endDate) {
      const payload: CalendarData = {
        user: form.user as string,
        start: form.startDate.split('-').join('/'),
        end: form.endDate.split('-').join('/'),
      }

      setData([
        ...data,
        payload
      ])
    }
  }

  return (
    <>
      <div className="mb-8">
        <Navbar
          titleLabel="Schedule"
          btnLabel="Add Schedule"
          onClickBtn={openModalAdd}
        />
      </div>
      <Calendar data={data} />
      <ModalAddSchedule handleSubmit={handleAddSchedule}/>
    </>
  );
};

export default CalendarSection;
