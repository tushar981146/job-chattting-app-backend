import  {config} from 'dotenv'
import { connectDB } from '../libs/db.js'
import User from '../models/user.model.js'

config();


const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
    phoneNumber: "1234567890"
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",
    phoneNumber: "1234567890"
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "123456",
    phoneNumber: "1234567890"
  },
  
];

const seedDatabase =  async () => {
    try {
        await connectDB();
        await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

seedDatabase()