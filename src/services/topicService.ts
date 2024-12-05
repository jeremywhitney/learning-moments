import { Topic } from "../types/topics";

export const getAllTopics = async (): Promise<Topic[]> => {
  const res = await fetch(`http://localhost:8088/topics`);
  return await res.json();
};
