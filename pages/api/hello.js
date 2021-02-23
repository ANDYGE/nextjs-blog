import { sleep } from "../..//lib/utils";

export default async (req, res) => {
  // await sleep(3);
  console.log("called");
  // setTimeout(() => {
  //   res.status(200).json({ text: "Hello" });
  // }, 3);
  res.status(200).json({ text: "Hello" });
};
