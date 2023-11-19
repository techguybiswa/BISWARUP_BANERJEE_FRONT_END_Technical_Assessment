import { useState } from "react";
import { ApiResponse, HttpPromptRequest } from "../utils/constants";
import dayjs from "dayjs";

const useOpenAi = <T,>(): ApiResponse<T> => {
  const BASE_URL = "https://api.openai.com/v1/chat/completions";
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_SECRET_KEY}`,
  };
  const request: HttpPromptRequest = (
    prompt: string,
    trainingData: string[]
  ) => {
    setData(null);
    setError(null);
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const REQUEST_TIMEOUT = 20 * 1000;
    const retryAfterTimeout = setTimeout(() => {
      controller.abort();
      clearTimeout(retryAfterTimeout);
    }, REQUEST_TIMEOUT);

    fetch(BASE_URL, {
      signal,
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify({
        model: "gpt-3.5-turbo-1106",
        messages: [
          {
            role: "system",
            content: `
            You are a doctor booking assistant. Help the user answering their queries about the doctor and their availability in very short and concise manner. Also when asked about booking an appointment, do generate the booking link. \n
            Steps to generate booking link when needed: 
            1. Check if the date can be extracted from the user prompt. 
            2. If there is date given by the user then the booking link will be an html href element like <a href="${
              location.origin
            }/doctors/DOCTOR_ID/book?mode=view-all&date='the date the user chooses.'">Booking Link</a> 
            3. If there is no date given by the user then the booking link will be an html href element like <a href="${
              location.origin
            }/doctors/DOCTOR_ID/book">Booking Link</a> 
            Make sure that you extract the date (if it is there) from the prompt and format it in YYYY-MM-DD format for date and only then put it in the link. Please note that the current date is ${dayjs().format(
              "YYYY-MM-DD"
            )} \n 
            Important Considerations: 
            1. Always wrap the booking link in a href html element.
            2. Do not ask any questions to the user.
            3. Make sure to keep the answers as brief as possible.
            4. Generate a booking link wrapped in href for every doctor.
            `,
          },
          {
            role: "user",
            content:
              `Here are the details of all the doctors that are available to book: \n ${trainingData}.  ` +
              `\n Main prompt to respopnd to : ${prompt}.`,
          },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError")
          setError("Open AI server unresponsive. Please retry.");
        else setError(`${error.message}`);
        setLoading(false);
        setData(null);
      });
  };

  return { request, data, loading, error };
};

export default useOpenAi;
