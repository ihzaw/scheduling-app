"use server";

import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "/app/data/schedule.json");

import { revalidatePath } from "next/cache";
import { CalendarData } from "./components/CalendarSection";

export default async function getOrSubmit(
  method: "GET" | "SUBMIT",
  newSchedule?: CalendarData
) {
  if (method === "GET") {
    try {
      const data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Failed to read data:", error);
      return { error: "Failed to read data" };
    }
  }

  if (method === "SUBMIT" && newSchedule) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      const schedules = JSON.parse(data);
      schedules.push(newSchedule);

      await fs.writeFile(filePath, JSON.stringify(schedules, null, 2), "utf8");
      
      revalidatePath('/', 'page');
      return schedules;
    } catch (error) {
      console.error("Failed to write data:", error);
      return { error: "Failed to write data" };
    }
  }
}
