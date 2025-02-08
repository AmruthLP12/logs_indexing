import Logs from "@/models/Logs";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return new Response("Missing email or password", { status: 400 });
    }

    const user = await User.findOne({ email: body.email });

    if (!user) {
      Logs.create({
        user_id: user._id,
        log: "User not found",
      });
      return new Response("User not found", { status: 400 });
    }

    if (!user.password) {
      Logs.create({
        user_id: user._id,
        log: "User has no password",
        date: new Date(),
      });
      return new Response("Incorrect password", { status: 400 });
    }

    Logs.create({
      user_id: user._id,
      log: "User logged in",
      date: new Date(),
    });

    return new Response("Logged in", { status: 200 });
  } catch (error) {
    Logs.create({
      log: "Error logging in",
      date: new Date(),
    });
    return new Response("Error logging in", { status: 500 });
  }
}
