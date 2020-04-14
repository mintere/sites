export type HandlebarsHelpers =
  "staticFilePath" | "mintereFormsHead" | "mintereForm" | "eq"

export const knownHelpers: {
  [k in HandlebarsHelpers]: true;
} = {
  staticFilePath: true,
  mintereFormsHead: true,
  mintereForm: true,
  eq: true
};

export default knownHelpers;
