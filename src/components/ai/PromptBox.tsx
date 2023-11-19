import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import ChatCompletionResponse, {
  ApiResponse,
  Doctor,
  OpeningHours,
  RequestType,
} from "../../utils/constants";
import useFetch from "../../hooks/useFetch";
import { formatTime } from "../../utils/utils";
import { HttpApiRequest } from "../../utils/constants";
import PromptResponseContent from "./PromptResponseContent";
import useDoctorBookAi from "../../hooks/useDoctorBookAi";

function PromptBox() {
  const [viewAiPromptBox, setViewAiPromptBox] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const {
    request: getOpenAiPromptResponse,
    data: promptResponse,
    loading: loadingPromptResponse,
    error: openaiError,
  } = useDoctorBookAi<ChatCompletionResponse>();

  const { request: fetchDoctors, data: doctors }: ApiResponse<Doctor[]> =
    useFetch<Doctor[]>({
      endpoint: "doctor",
      requestType: RequestType.GET,
    });

  useEffect(() => {
    (fetchDoctors as HttpApiRequest)();
  }, []);

  const transformToTrainignData = (doctors: Doctor[]) => {
    return doctors.map(
      (d: Doctor) => `
    ${d.name} is from ${d.address.district} district in ${d.address.line_1} ${
        d.address.line_2
      }.
    ${d.name}'s doctorId is ${d.id}.
    ${d.name} opens his doctor booking between ${d.opening_hours
        .map(
          (h: OpeningHours) =>
            `${formatTime(parseInt(h.start))} to ${formatTime(
              parseInt(h.end)
            )} on ${h.day}`
        )
        .join(" , ")}
    `
    );
  };

  if (!doctors) return null;

  return (
    <div>
      {" "}
      <Dialog
        open={viewAiPromptBox}
        onClose={() => setViewAiPromptBox(false)}
        maxWidth={"lg"}
      >
        <DialogContent>
          <div style={{ padding: "30px" }}>
            <PromptResponseContent
              data={promptResponse}
              error={openaiError}
              loading={loadingPromptResponse}
            />
            <TextField
              disabled={loadingPromptResponse}
              value={prompt}
              sx={{
                m: 1,
                width: "700px",
                margin: 0,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#191357",
                  },
                },
              }}
              placeholder="Enter your message here and then press 'Enter'"
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  getOpenAiPromptResponse(
                    prompt,
                    transformToTrainignData(doctors)
                  );
                }
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Fab
        aria-label="add"
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "rgb(25, 19, 87)",
        }}
        onClick={() => setViewAiPromptBox(true)}
      >
        <SmartToyIcon style={{ color: "white" }} />
      </Fab>
    </div>
  );
}

export default PromptBox;
