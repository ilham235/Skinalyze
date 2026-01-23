import dotenv from "dotenv";
import { analyzeSkin } from "./services/openai.service.js";

dotenv.config();

const test = async () => {
  const hasil = await analyzeSkin(
    "Kulit saya kering dan sering mengelupas"
  );
  console.log("HASIL AI:\n", hasil);
};

test();
