import { ChangeEvent, useEffect, useState } from "react";
import { userOptions } from "../constants";
import Datepicker, {
  DateRangeType,
  DateType,
  DateValueType,
} from "react-tailwindcss-datepicker";

export interface FormAdd {
  user: string | number | readonly string[] | undefined;
  startDate: string | null;
  endDate: string | null;
}

interface ModalProps {
  handleSubmit: (form: FormAdd) => void;
}

type DateRangeKeys = keyof DateValueType;

const ModalAddSchedule = (props: ModalProps) => {
  const { handleSubmit } = props;

  const defaultForm = {
    user: undefined,
    startDate: null,
    endDate: null,
  };
  const [form, setForm] = useState<FormAdd>(defaultForm);

  const handleChangeForm = (
    value: DateValueType | ChangeEvent<HTMLSelectElement>,
    e: HTMLInputElement | null | undefined
  ) => {
    if (value && e) {
      setForm({
        ...form,
        [e.name as DateRangeKeys]: value[e.name as DateRangeKeys],
      });
      return;
    }

    if (value && "target" in value && value.target)
      setForm({
        ...form,
        user: value.target.value,
      });
  };

  const isAnyFormFieldEmpty = () => {
    return Object.values(form).some((value) => !value); // if any of the keys has no value
  };

  const closeModal = () => {
    const modal = document?.getElementById("add_schedule") as HTMLDialogElement;

    if (modal) {
      modal.close();
    }
  }

  const clearModal = () => {
    setForm(defaultForm)
  }

  const handleXButton = () => {
    closeModal()
    clearModal()
  }

  const handleSubmitButton = (form: FormAdd) => {
    handleSubmit(form)
    closeModal()
    clearModal()
  }

  return (
    <>
      <dialog id="add_schedule" className="modal overflow-visible">
        <div className="modal-box gap-8 flex flex-col overflow-visible">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleXButton}>
              ✕
            </button>
          <div>
            <div className="mb-2 font-semibold">User</div>
            <select
              id="user-input"
              className="select select-bordered w-full"
              value={form.user}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeForm(e, undefined)
              }
            >
              <option disabled selected>
                Select User
              </option>
              {userOptions.map((user) => {
                return <option value={user.value}>{user.label}</option>;
              })}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-2 font-semibold">Start</div>
              <div>
                <Datepicker
                  inputName="startDate"
                  useRange={false}
                  asSingle={true}
                  value={{ startDate: form.startDate, endDate: form.startDate }} // this is how the library structures their value because it is mainly a date range library but i'm using it as a single
                  onChange={handleChangeForm}
                  containerClassName="border border-gray-300 rounded"
                  displayFormat="DD MMMM YYYY"
                  maxDate={form.endDate ? new Date(form.endDate) : null}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 font-semibold">End</div>
              <div>
                <Datepicker
                  minDate={form.startDate ? new Date(form.startDate) : null}
                  inputName="endDate"
                  useRange={false}
                  asSingle={true}
                  value={{ startDate: form.endDate, endDate: form.endDate }} // this is how the library structures their value because it is mainly a date range library but i'm using it as a single
                  onChange={handleChangeForm}
                  containerClassName="border border-gray-300 rounded"
                  displayFormat="DD MMMM YYYY"
                />
              </div>
            </div>
          </div>
          <button
            disabled={isAnyFormFieldEmpty()}
            className="btn w-full"
            onClick={() => handleSubmitButton(form)}
          >
            Submit
          </button>
        </div>
      </dialog>
    </>
  );
};

export default ModalAddSchedule;
