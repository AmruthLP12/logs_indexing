import fs from "fs";
import path from "path";
import Logs from "@/models/Logs";
import connectToDatabase from "@/lib/connectDB";

export async function GET(req: Request, res: Response) {
  try {
    await connectToDatabase(); // Ensure the DB connection is established

    const logs = await Logs.find();
    if (!logs.length) {
      return new Response("No logs found", { status: 404 });
    }

    // Define backup directory
    const backupDir = path.join(process.cwd(), "backup");

    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Define backup file path inside the backup folder
    const backupFilePath = path.join(backupDir, `backup-${Date.now()}.json`);

    // Write data to file
    fs.writeFileSync(backupFilePath, JSON.stringify(logs, null, 2));

    return new Response("Backup created", { status: 200 });
  } catch (error) {
    return new Response(`Error creating backup: ${error}`, { status: 500 });
  }
}
