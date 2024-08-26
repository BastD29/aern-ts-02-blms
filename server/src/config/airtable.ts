import Airtable from "airtable";
import {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID,
  AIRTABLE_ENDPOINT_URL,
} from "./environments";

Airtable.configure({
  endpointUrl: AIRTABLE_ENDPOINT_URL,
  apiKey: AIRTABLE_API_KEY,
});

const base = Airtable.base(AIRTABLE_BASE_ID);

export { base };
