import { Typography } from "@mui/material";
import ChatCompletionResponse from "../../utils/constants";

interface PromptResponseContentProps {
  data: ChatCompletionResponse | null;
  loading: boolean;
  error: string | null;
}
function PromptResponseContent(props: PromptResponseContentProps) {
  const { data: promptResponse, loading, error } = props;
  const isZeroState = !promptResponse && !loading && !error;
  if (!promptResponse)
    return (
      <div
        style={{
          border: "1px solid rgb(227, 230, 234)",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            height: "150px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          {loading && (
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "25px",
                color: "#131313",
              }}
            >
              Generating response..
            </Typography>
          )}
          {error && (
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "25px",
                color: "#131313",
              }}
            >
              {error}
            </Typography>
          )}
          {isZeroState && (
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "25px",
                color: "#131313",
              }}
            >
              How can I help you today?
            </Typography>
          )}
        </div>
      </div>
    );
  return (
    <div
      style={{
        width: "700px",
        height: "150px",
        marginBottom: "30px",
        border: "1px solid rgb(227, 230, 234)",
        overflow: "scroll",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          lineHeight: "25px",
          fontFamily: "inherit",
          color: "#131313",
          marginBottom: "100px",
        }}
        dangerouslySetInnerHTML={{
          __html: promptResponse.choices[0].message.content.replaceAll(
            "\n",
            "<br/>"
          ),
        }}
      ></div>
    </div>
  );
}

export default PromptResponseContent;
