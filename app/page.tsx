import CalendarSection from "./components/CalendarSection";
import initialData from './data/schedule.json'
import fs from 'fs/promises';
import path from 'path';

async function getData() {
  const filePath = path.join(process.cwd(), 'app/data/schedule.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
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
