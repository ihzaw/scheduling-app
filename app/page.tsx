import Calendar from "./components/Calendar";
import CalendarSection from "./components/CalendarSection";
import initialData from './data/schedule.json'

async function getData () {
  return initialData
}

export default async function Home() {
  const initialData = await getData()

  return (
    <main className="px-24 pt-12">
      <div className="grid grid-cols-3">
        <div className="col-span-3">
          <CalendarSection initialData={initialData} />
        </div>
      </div>
    </main>
  );
}
