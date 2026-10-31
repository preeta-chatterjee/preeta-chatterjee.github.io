import { Link } from "react-router-dom";
import { C } from "../theme";

// Renders a content string, or an array of strings and { text, to } in-site links.
export default function RichText({ value }) {
  if (!Array.isArray(value)) return value;
  return value.map((part, i) => typeof part === "string"
    ? part
    : <Link key={i} to={part.to} style={{ color: C.red, textDecoration: "underline", textUnderlineOffset: "2px" }}>{part.text}</Link>);
}
