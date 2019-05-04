export const config = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    spreadsheetId: process.env.REACT_APP_SPREADSHEET_ID
};