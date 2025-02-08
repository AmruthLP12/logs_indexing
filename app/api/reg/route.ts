import connectToDatabase from "@/lib/connectDB";
import Logs from "@/models/Logs";
import User from "@/models/User";



export async function POST(req: Request) {
  try {

    connectToDatabase()

    const body = await req.json();

    if (!body.email || !body.password) {
        
        return new Response("Missing email or password", { status: 400 });
    }

    const user = await User.findOne({ email: body.email });

    if (user) {
        Logs.create({
            user_id: user._id,
            log: "User already exists",
            date: new Date(),
        });
      return new Response("User already exists", { status: 400 });
    }

    await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    Logs.create({
      user_id: user._id,
      log: "User created",
      date: new Date(),
    });
    return new Response("User created", { status: 201 });
  } catch (error) {
    return new Response("Error creating user", { status: 500 });
  }
}
